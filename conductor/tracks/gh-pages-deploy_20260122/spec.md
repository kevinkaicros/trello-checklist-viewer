# Track Specification: Deploy to GitHub Pages & Trello Integration

## 1.0 Overview
此 Track 的目標是將現有的 Trello Power-Up 專案透過 GitHub Actions 自動部署至 GitHub Pages，並完成 Trello Power-Up 的相關設定指引。

## 2.0 Goal
- 建立自動化的 CI/CD 流程，實現「推送到 GitHub 即部署」的體驗。
- 提供一組公開的 HTTPS URL，用於 Trello Power-Up 的 `IFrame Connector URL` 設定。
- **明確定義進入點：** 由於 Trello 的限制，我們將使用 `board-buttons` 作為入口，但該功能會撈取並彙整跨看板的 Checklist 項目。

## 3.0 Functional Requirements
### 3.1 GitHub Actions Workflow
- **自動化部署：** 建立 `.github/workflows/deploy.yml`。
- **流程：** 當代碼推送到 `main` 時，自動安裝依賴、建置 (Build) 並推送到 `gh-pages` 分支。

### 3.2 Vite Configuration
- **Base URL：** 修正 `vite.config.ts` 中的 `base` 屬性，確保在 `https://<user>.github.io/<repo>/` 下能正確載入資源。

### 3.3 Trello Capabilities & Configuration
- **入口宣告：** 目前實作為 `'board-buttons'`。使用者在任何一個看板點擊該按鈕即可開啟跨專案的任務視圖。
- **文件產出：** 產出 `DEPLOY.md` 說明文件，指導使用者：
    1.  如何將 GitHub Pages 的 URL 填入 Trello 開發者後台。
    2.  如何在 Trello 後台啟用 "Capabilities" 中的 **"Board Buttons"**。

## 4.0 Non-Functional Requirements
- **自動化：** 部署過程無需人工介入。
- **安全性：** 網站必須支援 HTTPS。

## 5.0 Acceptance Criteria
- [ ] GitHub Actions 成功執行且網站可透過網址存取。
- [ ] `vite.config.ts` 的 `base` 路徑已根據 Repository 名稱正確設定。
- [ ] 產出包含 Trello 後台設定說明的文件。
- [ ] (驗證) 部署後的網頁能正確執行 `window.TrelloPowerUp.initialize`。

## 6.0 Out of Scope
- 新增非 `board-buttons` 以外的 Trello 入口。
- 修正目前與 Trello API 獲取資料的邏輯錯誤（本 Track 專注於部署與整合設定）。
