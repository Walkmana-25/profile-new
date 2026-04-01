import * as cheerio from "cheerio";
import { writeFileSync, mkdirSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const TARGET_URLS = [
  "https://www.toyo.ac.jp/interview/02903.html",
  "https://www.toyo.ac.jp/contents/gakuhou/281/",
  "https://www.iniad.org/blog/2025/06/10/post-3268/",
  "https://www.ipa.go.jp/jinzai/mitou/it/2025/gaiyou-tk-1.html",
];

const OUTPUT_PATH = new URL(
  "../app/about/media-data.json",
  import.meta.url,
);

const TIMEOUT_MS = 10_000;

// スクレイピング失敗時のフォールバックデータ
const fallbackData = {
  'https://www.toyo.ac.jp/contents/gakuhou/281/': {
    title: '東洋大学学報281',
    description: '東洋大学の学報第281号。PDF形式で提供されており、大学の研究活動や教育に関する情報を含んでいます。',
    ogImage: null
  }
};

async function scrapeUrl(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; MediaScraper/1.0; +https://github.com/Walkmana-25)",
      },
    });

    if (!res.ok) {
      console.warn(`  ⚠ HTTP ${res.status} for ${url}`);
      return { url, title: "タイトル取得失敗", description: "", ogImage: null };
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    const title =
      $('meta[property="og:title"]').attr("content")?.trim() ||
      $("title").text().trim() ||
      "タイトル取得失敗";

    const description =
      $('meta[property="og:description"]').attr("content")?.trim() ||
      $('meta[name="description"]').attr("content")?.trim() ||
      "";

    let ogImage =
      $('meta[property="og:image"]').attr("content")?.trim() || null;

    // 相対URLを絶対URLに変換
    if (ogImage && !ogImage.startsWith("http")) {
      try {
        ogImage = new URL(ogImage, url).href;
      } catch {
        ogImage = null;
      }
    }

    console.log(`  ✓ ${title}`);
    return { url, title, description, ogImage };
  } catch (err) {
    console.warn(`  ✗ Failed to fetch ${url}: ${err instanceof Error ? err.message : String(err)}`);
    return { url, title: "タイトル取得失敗", description: "", ogImage: null };
  } finally {
    clearTimeout(timeout);
  }
}

// スクレイピング結果にフォールバックデータを適用
function applyFallbackData(item) {
  const fallback = fallbackData[item.url];
  if (!fallback) {
    return item;
  }

  // タイトルが取得失敗の場合のみフォールバックを適用
  if (item.title === "タイトル取得失敗") {
    console.log(`  ↻ Using fallback data for ${item.url}`);
    return {
      ...item,
      title: fallback.title,
      description: fallback.description,
      ogImage: fallback.ogImage,
    };
  }

  return item;
}

async function main() {
  console.log("Scraping media data...");

  let items = [];
  try {
    for (const url of TARGET_URLS) {
      console.log(`  → ${url}`);
      const item = await scrapeUrl(url);
      // フォールバックデータを適用
      const itemWithFallback = applyFallbackData(item);
      items.push(itemWithFallback);
    }
  } catch (err) {
    console.error(`  ✗ Error during scraping: ${err instanceof Error ? err.message : String(err)}`);
    console.log(`  → Using empty data as fallback`);
    items = [];
  }

  const data = {
    items,
    scrapedAt: new Date().toISOString(),
  };

  const outputPath = fileURLToPath(OUTPUT_PATH);
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, JSON.stringify(data, null, 2) + "\n", "utf-8");

  console.log(
    `\nDone! Wrote ${items.length} items to ${outputPath}`,
  );
}

main().catch((err) => {
  console.error(`  ✗ Fatal error: ${err instanceof Error ? err.message : String(err)}`);
  console.log(`  → Writing empty data as fallback`);
  
  const data = {
    items: [],
    scrapedAt: new Date().toISOString(),
  };
  
  const outputPath = fileURLToPath(OUTPUT_PATH);
  try {
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, JSON.stringify(data, null, 2) + "\n", "utf-8");
    console.log(`  → Wrote empty data to ${outputPath}`);
  } catch (writeErr) {
    console.error(`  ✗ Failed to write fallback data: ${writeErr.message}`);
    process.exit(1);
  }
});
