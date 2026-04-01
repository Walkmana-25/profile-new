---
title: "Hacker News Daily Report"
description: "毎朝自動的にHacker Newsのトップ5記事を取得し、AIで日本語レポートを生成してDiscordに投稿するシステム"
image: "/no-image.webp"
pinned: false
tags:
  - "Python"
  - "AI"
  - "GitHub Actions"
links:
  - label: "GitHub"
    url: "https://github.com/Walkmana-25/hackers-news-report-"
---

# Hacker News Daily Report

毎朝自動的にHacker Newsのトップ5記事を取得し、AIで日本語レポートを生成してDiscordに投稿するシステムです。

## Features

- 🌐 Hacker News APIから毎日トップ5記事を取得
- 💬 記事のコメントも取得して分析
- 🤖 OpenAI互換APIを使用して日本語レポートを生成
- ✅ AIによるレポートのセルフレビュー機能
- 📨 Discordウェブフックで自動投稿
- ⏰ GitHub Actionsで毎朝自動実行
