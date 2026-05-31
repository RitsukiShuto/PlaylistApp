# 技術アーキテクチャ (Technical Architecture)

## 1. 技術スタック
### 1.1 フロントエンド / バックエンド
- **フレームワーク**: Next.js (App Router)
- **言語**: TypeScript
- **認証**: NextAuth.js (Spotify Provider)
- **状態管理**: Zustand (クライアントサイド)
- **スタイリング**: Tailwind CSS + shadcn/ui

### 1.2 データベース / ORM
- **データベース**: PostgreSQL
- **ORM**: Prisma
- **データ構造**: リレーショナルモデルでグラフ構造（Nodes/Edges）を表現

### 1.3 解析・可視化
- **次元圧縮**: `umap-js` または `tsne-js`
- **グラフ描画**: `react-force-graph`
- **マッピング描画**: D3.js または Canvasベースのカスタム実装

## 2. データモデル (主要エンティティ)
- **User**: ユーザー情報、Spotifyアクセストークン
- **Track**: 楽曲メタデータ、音響的特徴量 (Audio Features)
- **Playlist**: プレイリスト情報、楽曲との紐付け
- **Tag**: ユーザーが作成したラベル
- **Edge**: 楽曲、プレイリスト、タグ間の繋がり（ナレッジグラフの辺）

## 3. インフラ
- **デプロイ**: Vercel
- **DBホスティング**: Supabase または Neon (Serverless Postgres)
