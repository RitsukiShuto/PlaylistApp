# AGENTS.md

## Project Overview
Spotify等の音楽配信サービスと連携し、楽曲の音響的特徴のマッピングやナレッジグラフの生成を行うプレイリスト管理アプリです。
- **Tech Stack**: Next.js (App Router), TypeScript, Prisma (PostgreSQL), NextAuth.js (Spotify), umap-js, react-force-graph.

## Setup & Development Commands
- **Install Dependencies**: `npm install`
- **Database Migration**: `npx prisma migrate dev`
- **Start Development Server**: `npm run dev`
- **Build**: `npm run build`

## Multi-Agent Orchestration
本プロジェクトは複数の専門エージェントが連携して開発を行うように設計されています。
詳細は以下のディレクトリを参照してください：
- **Agent Definitions**: `docs/agents/`
  - `pm.md`: プロジェクト管理・意思決定
  - `tech_lead.md`: 技術アーキテクチャ・設計監督
  - `spotify_engineer.md`: API・認証連携
  - `data_engineer.md`: データ解析・グラフ論理
  - `ui_engineer.md`: フロントエンド・可視化
  - `qa.md`: 品質保証・テスト
  - `sre.md`: 運用・パフォーマンス
  - `management.md`: 構成管理・ドキュメント
- **Workflow Loop**: `docs/workflow.md`

### Agent Persona & Constraints
全てのエージェントは `docs/agents/` に定義された人格（Persona）と制約事項（Constraints）を厳守する必要があります。特に：
- **PM以外のエージェント**は勝手に仕様を変更してはならない。
- **エンジニア**は `docs/agents/` に定義された I/O スキーマに従って成果物を受け渡す。
- **エントロピーの増大**（規約違反やドキュメントの乖離）は `management` エージェントによって厳しくチェックされる。

## Development Workflow
1. **Planning**: PMがタスクを発行。
2. **Design**: Tech Leadが設計図（affected files, schemas）を作成。
3. **Implementation**: 各エンジニアがTDDで実装。
4. **Validation**: QAが検証し、問題があれば差し戻し。
5. **Deployment**: SREがデプロイ。

## Testing Instructions
- **Unit Tests**: `npm test`
- **E2E Tests**: `npx playwright test`
- テストは `tests/` ディレクトリに配置し、実装と同時にテストを書く（TDD）ことを推奨する。

## Code Style & Guidelines
- **Naming**: kebab-case (files), PascalCase (components), camelCase (functions).
- **Structure**: `src/app`, `src/components`, `src/lib`, `src/store` の構造に従う。
- 詳細は `docs/design/04_project_structure.md` を参照。
