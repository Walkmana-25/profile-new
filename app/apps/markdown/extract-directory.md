---
title: "ZIP Flattener"
description: "ZIPファイルのディレクトリ構造を平坦化するブラウザベースのユーティリティ。NotebookLMへのファイル追加を容易にするために作成しました。"
image: "/no-image.webp"
pinned: false
tags:
  - "TypeScript"
  - "React"
  - "Vite"
links:
  - label: "GitHub"
    url: "https://github.com/Walkmana-25/extract_directory"
  - label: "App"
    url: "https://extractor.lapis-dev.work/"
---

# ZIP Flattener (extract_directory)

ZIPファイルのディレクトリ構造を平坦化（フラット化）し、ネストされたファイルを管理しやすくするためのブラウザベースのユーティリティです。

NotebookLMなどのLLMツールに、ディレクトリ構造を保ったまま大量のファイルをアップロードするのは手間がかかるため、ファイル名をディレクトリ名を含んだ形式（例：`folder-subfolder-file.txt`）に変更して一つの階層にまとめることで、一括追加を容易にすることを目的に作成しました。

## Features

- 💻 **完全クライアントサイド処理**: ファイルはサーバーにアップロードされず、ブラウザ内ですべて完結するため、プライバシーと速度が確保されます。
- 🛠️ **カスタマイズ可能な区切り文字**: ディレクトリ名を結合する際の文字（デフォルトは `-`）を自由に変更可能。
- 📑 **エンコーディング対応**: 日本語のファイル名（Shift-JISなど）にも対応。
- 🔍 **スマートフィルタリング**: macOSのシステムファイル（`__MACOSX`, `.DS_Store`）や隠しファイルをオプションで除外可能。
- 👀 **ライブプレビュー**: 処理後のファイル名をダウンロード前に確認可能。
- 🚀 **大容量ファイル対応**: Web Workersとストリーミングを使用して、大きなアーカイブも効率的に処理。
