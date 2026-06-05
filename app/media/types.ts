/** Media Section の各カードデータ */
export interface MediaItem {
  /** リンク先URL */
  url: string;
  /** ページタイトル */
  title: string;
  /** ページの説明（スクレイピング結果） */
  description: string;
  /** 手動設定の説明。descriptionが空の場合のフォールバックとして使用 */
  defaultDescription?: string;
  /** OG画像のURL（nullの場合はフォールバック画像を使用） */
  ogImage: string | null;
}

/** スクレイピング結果のJSONファイル形式 */
export interface MediaData {
  items: MediaItem[];
  scrapedAt: string;
}
