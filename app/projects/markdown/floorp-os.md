---
title: "Floorp OS"
startDate: "2025-06-25"
description: "FirefoxベースのWebブラウザ「Floorp」を中核として構築される、Web環境とローカルOS環境を統合したローカルLLM支援型オペレーティングプラットフォーム"
pinned: true
image: "/img/Floorp_Logo_OS_C_Light_Transparent.png"
imageDark: "/img/Floorp_Logo_OS_C_Dark.png"
tags:
  - "Floorp"
  - "Browser"
  - "LLM"
  - "OS"
links:
  - label: "Floorp"
    url: "https://ja.floorp.app/"
  - label: "Floorp OS"
    url: "https://ja.floorp.app/floorp-os"
  - label: "GitHub (Floorp OS Automator Backend)"
    url: "https://github.com/Floorp-Projects/Floorp-OS-Automator-Backend"
  - label: "GitHub (Sapphillon)"
    url: "https://github.com/Sapphillon/Sapphillon"
  - label: "IPA未踏IT人材発掘・育成事業2025"
    url: "https://www.ipa.go.jp/jinzai/mitou/it/2025/gaiyou-tk-1.html"
---

FirefoxベースのWebブラウザ「Floorp」を中核として構築される、Web環境とローカルOS環境を統合したローカルLLM支援型オペレーティングプラットフォーム。

![Floorp OS Logo](/img/Floorp_Logo_OS_C_Light_Transparent.png)

## 特徴

- **Web↔ローカルの統合**: Webアプリとローカルアプリの境界をなくし、1つの流れとして横断的に操作できる
- **自然言語操作**: 自然言語の指示から、ローカルファイル操作とWebサイト操作を自動実行
- **ローカルLLM**: ユーザーPC上でローカルLLMを実行し、機密データを外部サーバに送信不要
- **ワークフロー先行型**: 実行時に逐次判断するのではなく、まず実行手順を明示的なワークフローとして生成し、内容を事前に確認したうえで順次実行

## 技術的なポイント

ワークフロー実行基盤（Sapphillon）、プラグインランタイム、サンドボックス環境、Floorpブラウザとの統合UIから構成。プラグインシステムによりブラウザ制御・ファイルシステム・検索・OCR・ローカルLLM連携などを提供し、権限ベースの細かいアクセス制御でセキュリティを確保。

IPA未踏IT人材発掘・育成事業2025に採択。
