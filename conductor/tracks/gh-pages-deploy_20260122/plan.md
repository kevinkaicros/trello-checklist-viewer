# Implementation Plan - Deploy to GitHub Pages & Trello Integration

## Phase 1: Deployment Configuration [checkpoint: 7d01b95]
此階段專注於調整專案設定與建立自動化流程。

- [x] Task: Configure Vite for GitHub Pages base path 804b497
    - [ ] 讀取 `package.json` 確認 repository 名稱
    - [ ] 修改 `vite.config.ts` 中的 `base` 屬性為 `/<repo-name>/`
- [x] Task: Create GitHub Actions deployment workflow 0b7b221
    - [ ] 建立 `.github/workflows/deploy.yml`
    - [ ] 定義建置與部署至 `gh-pages` 分支的步驟
- [x] Task: Conductor - User Manual Verification 'Phase 1: Deployment Configuration' (Protocol in workflow.md) 7d01b95

## Phase 2: Deployment & Documentation
此階段完成實際部署並產出整合說明文件。

- [ ] Task: Execute initial deployment and verify URL
    - [ ] 推送程式碼至 GitHub 觸發 Actions
    - [ ] 驗證 GitHub Pages 是否成功顯示 Vite 預設頁面或 App 內容
- [x] Task: Create Trello Integration Guide (DEPLOY.md) df9f0f4
    - [ ] 撰寫如何獲取 GitHub Pages URL 的說明
    - [ ] 撰寫如何在 Trello 開發者後台更新 Connector URL 與開啟 Board Buttons 權限的指引
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Deployment & Documentation' (Protocol in workflow.md)
