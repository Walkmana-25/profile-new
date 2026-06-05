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
  "https://www.ipa.go.jp/jinzai/mitou/it/2025/seika.html",
  "https://www.ipa.go.jp/jinzai/mitou/it/2025/rcu1hd000000czdf-att/seikagaiyou-tk-1.pdf",
  "https://www.ipa.go.jp/jinzai/mitou/it/2025/rcu1hd000000czdf-att/seikashosai-tk-1.pdf",
  "https://www.ipa.go.jp/jinzai/mitou/it/2025/supercreator.html",
  "https://www.ipa.go.jp/jinzai/mitou/koubo/career/2025/2025-supercreator-16.html",
  "https://www.ipa.go.jp/jinzai/mitou/it/2025/rcu1hd000000czdf-att/hyouka-tk-1.pdf",
];

const OUTPUT_PATH = new URL("../app/about/media-data.json", import.meta.url);

const TIMEOUT_MS = 10_000;

// 手動設定のdefaultDescription。スクレイピング時にも保持される。
const defaultDescriptions = {
  "https://www.ipa.go.jp/jinzai/mitou/it/2025/rcu1hd000000czdf-att/seikagaiyou-tk-1.pdf":
    "2025年度IPA未踏IT人材発掘・育成事業におけるFloorp OSプロジェクトの成果概要をまとめた資料です。開発した機能や達成した目標などを確認できます。",
  "https://www.ipa.go.jp/jinzai/mitou/it/2025/rcu1hd000000czdf-att/seikashosai-tk-1.pdf":
    "2025年度IPA未踏IT人材発掘・育成事業におけるFloorp OSプロジェクトの成果詳細報告書です。技術的な実装詳細、開発プロセス、今後の展望などを網羅しています。",
  "https://www.ipa.go.jp/jinzai/mitou/it/2025/rcu1hd000000czdf-att/hyouka-tk-1.pdf":
    "2025年度IPA未踏IT人材発掘・育成事業におけるプロジェクトマネージャー（PM）からの評価報告書です。プロジェクトの成果や技術的な貢献に対するPMの評価を確認できます。",
};

// スクレイピング失敗時のフォールバックデータ
const fallbackData = {
  "https://www.toyo.ac.jp/contents/gakuhou/281/": {
    title: "東洋大学学報281",
    description:
      "東洋大学の学報第281号。PDF形式で提供されており、大学の研究活動や教育に関する情報を含んでいます。",
    ogImage: null,
  },
  "https://www.iniad.org/blog/2025/06/10/post-3268/": {
    title:
      "【学生】浅野凌輔さん・髙橋侑大さんが IPA による「2025 年度 未踏 IT 人材発掘・育成事業」に採択されました",
    description:
      "本学部の学生である浅野凌輔さん・髙橋侑大さんと電気通信大学の鮎澤颯人さんの提案プロジェクト「OS と Web ブラウザを統合したローカル LLM 支援型オペレーティングプラットフォームの開発」が、2025 年度の「未踏 IT 人材発掘・育成事業」に採択されました。 この事業は、IPA（独立行政法人情報処理推進機構）が毎年、25 歳以下の優秀な若手 IT 人材を発掘・育成するために実施している制度です。2025 年度は 227 件の応募があり、採択されたのは 21 件でした。 浅野さん・髙橋さんらが提案したのは「Floorp OS（フロープオーエス）」というソフトウェアの開発です。これは、普段使...",
    ogImage: "https://static-files.iniad.org/sites/1/2024/02/banner_award.jpeg",
  },
  "https://www.ipa.go.jp/jinzai/mitou/it/2025/rcu1hd000000czdf-att/seikagaiyou-tk-1.pdf":
    {
      title: "2025年度IPA未踏 IT 人材発掘・育成事業 プロジェクト成果 概要",
      description: "",
      ogImage: null,
    },
  "https://www.ipa.go.jp/jinzai/mitou/it/2025/rcu1hd000000czdf-att/seikashosai-tk-1.pdf":
    {
      title: "2025年度IPA未踏 IT 人材発掘・育成事業 プロジェクト成果 詳細",
      description: "",
      ogImage: null,
    },
  "https://www.ipa.go.jp/jinzai/mitou/it/2025/rcu1hd000000czdf-att/hyouka-tk-1.pdf":
    {
      title: "2025年度IPA未踏 IT 人材発掘・育成事業 PM評価",
      description: "",
      ogImage: null,
    },
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
    console.warn(
      `  ✗ Failed to fetch ${url}: ${err instanceof Error ? err.message : String(err)}`,
    );
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

  // タイトルが取得失敗、またはフォールバックデータがある場合は適用
  // 今回は特定URLのディスクリプションを上書きしたいため、常にフォールバックを優先する
  console.log(`  ↻ Using fallback data for ${item.url}`);
  return {
    ...item,
    title: fallback.title ?? item.title,
    description: fallback.description ?? item.description,
    ogImage: fallback.ogImage ?? item.ogImage,
    ...(defaultDescriptions[item.url] && {
      defaultDescription: defaultDescriptions[item.url],
    }),
  };
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
      // defaultDescriptionがある場合は付与
      if (defaultDescriptions[url]) {
        itemWithFallback.defaultDescription = defaultDescriptions[url];
      }
      items.push(itemWithFallback);
    }
  } catch (err) {
    console.error(
      `  ✗ Error during scraping: ${err instanceof Error ? err.message : String(err)}`,
    );
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

  console.log(`\nDone! Wrote ${items.length} items to ${outputPath}`);
}

main().catch((err) => {
  console.error(
    `  ✗ Fatal error: ${err instanceof Error ? err.message : String(err)}`,
  );
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
