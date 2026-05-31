# プロジェクト構造 (Project Structure)

## 1. フォルダ構成
```text
/src
  /app           # Next.js App Router (Pages, Layouts, Server Actions)
    /(auth)      # 認証関連のルート
    /dashboard   # メインダッシュボード
    /playlists   # プレイリスト管理画面
    /mapping     # 音響マッピング画面
    /graph       # ナレッジグラフ画面
    /api         # APIルート (Spotify Webhook, etc.)
  /components    # UIコンポーネント
    /ui          # 基本コンポーネント (shadcn/ui)
    /shared      # 複数の画面で使われる共通部品
    /mapping     # マッピング描画専用部品
    /graph       # グラフ描画専用部品
  /lib           # ユーティリティ・外部連携
    /spotify     # Spotify SDK / API クライアント
    /analysis    # 座標計算 (UMAP等)
    /prisma      # データベースクライアントとクエリ
    /utils       # 汎用ヘルパー関数
  /hooks         # カスタムReact Hooks
  /store         # Zustandストア
  /types         # TypeScript型定義 (Zodスキーマ等)
/prisma          # Prisma Schema, Migrations, Seeds
/docs            # 本設計ドキュメント、開発ログ
  /design        # 分割された設計書
/tests           # E2Eテスト (Playwright), Unitテスト
```

## 2. 命名規則・規約
- **ファイル名**: kebab-case (例: `user-profile.tsx`)
- **コンポーネント**: PascalCase (例: `PlaylistCard.tsx`)
- **関数・変数**: camelCase
- **Server Actions**: `actions/` ディレクトリに集約、または各ページディレクトリ内で `.action.ts` として管理。
