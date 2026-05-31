# プレイリスト管理アプリ フェーズ1：基盤構築 実装プラン

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Next.jsプロジェクトを初期化し、DB接続（Prisma）およびSpotify認証（NextAuth.js）を統合して、開発の基盤を完成させる。

**Architecture:** Next.js (App Router) を中心とし、Prismaを介してPostgreSQLに接続。認証はNextAuth.jsのSpotifyプロバイダーを使用する。

**Tech Stack:** Next.js, TypeScript, Tailwind CSS, shadcn/ui, Prisma, PostgreSQL, NextAuth.js.

---

### Task 1: プロジェクト初期化と基本構成

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts`, `src/app/layout.tsx`, `src/app/page.tsx`
- Modify: `.gitignore`

- [ ] **Step 1: Next.js プロジェクトの初期化**
Run: `npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*"`
(既存のdocs等を保持するため、インタラクティブに実行するか手動で構成を整える)

- [ ] **Step 2: shadcn/ui のセットアップ**
Run: `npx shadcn-ui@latest init` (デフォルト設定で進行)

- [ ] **Step 3: 基本的なフォルダ構造の作成**
Run: `mkdir -p src/components/ui src/lib/spotify src/lib/db src/store src/types`

- [ ] **Step 4: Commit**
```bash
git add .
git commit -m "chore: initial next.js setup with shadcn/ui"
```

---

### Task 2: Prisma と PostgreSQL のセットアップ

**Files:**
- Create: `prisma/schema.prisma`, `.env`
- Modify: `src/lib/db/prisma.ts`

- [ ] **Step 1: Prisma のインストールと初期化**
Run: `npm install @prisma/client && npm install -D prisma`
Run: `npx prisma init`

- [ ] **Step 2: 初期スキーマの定義 (User, Track, Playlist, Tag, Edge)**
`prisma/schema.prisma` に設計ドキュメントの内容を反映。

- [ ] **Step 3: Prisma クライアントのシングルトン実装**
`src/lib/db/prisma.ts` を作成し、開発中に接続数が増えすぎないように設定。

- [ ] **Step 4: 初回マイグレーションの実行**
Run: `npx prisma migrate dev --name init`

- [ ] **Step 5: Commit**
```bash
git add prisma/ src/lib/db/
git commit -m "feat: setup prisma and initial database schema"
```

---

### Task 3: NextAuth.js (Spotify) 認証の統合

**Files:**
- Create: `src/app/api/auth/[...nextauth]/route.ts`, `src/lib/auth.ts`, `src/components/auth/login-button.tsx`
- Modify: `src/app/layout.tsx` (SessionProviderのラップ)

- [ ] **Step 1: NextAuth.js のインストール**
Run: `npm install next-auth`

- [ ] **Step 2: Spotify プロバイダーの設定**
`src/lib/auth.ts` を作成し、Spotifyの `clientId` と `clientSecret` を設定。
(スコープ: `user-read-email`, `playlist-read-private`, `playlist-modify-public`, `playlist-modify-private`, `user-library-read`)

- [ ] **Step 3: Auth ハンドラーの作成**
`src/app/api/auth/[...nextauth]/route.ts` で `GET`, `POST` をエクスポート。

- [ ] **Step 4: ログインボタンコンポーネントの作成**
`src/components/auth/login-button.tsx` を作成。

- [ ] **Step 5: 動作確認**
開発サーバーを起動し、Spotifyログインが正常に完了し、セッションが取得できることを確認。

- [ ] **Step 6: Commit**
```bash
git add src/app/api/auth/ src/lib/auth.ts src/components/auth/
git commit -m "feat: integrate spotify authentication with nextauth.js"
```
