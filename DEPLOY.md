# Trello Power-Up 部署與設定指南

本專案已設定 GitHub Actions 自動化部署，請依照以下步驟完成安裝。

## 1. 獲取應用程式網址
當您將程式碼推送到 GitHub 的 `main` 分支後，GitHub Actions 會自動建置並部署。
您的應用程式網址通常如下：
`https://<您的 GitHub 帳號>.github.io/trello-checklist-viewer/`

> **注意**：首次部署後，請前往 GitHub Repository 的 `Settings > Pages` 確認 "Build and deployment" 的來源設定為 `gh-pages` 分支。

## 2. 在 Trello 開發者後台設定
請前往 [Trello Power-Up Admin Portal](https://trello.com/power-ups/admin) 並選擇您的 Power-Up。

### 2.1 更新 Connector URL
1. 在左側選單選擇 **"General"** (或基礎設定)。
2. 找到 **"IFrame Connector URL"** 欄位。
3. 填入您的網址（需包含 `/` 結尾）：
   `https://<您的 GitHub 帳號>.github.io/trello-checklist-viewer/`
4. 點擊 **"Save"**。

### 2.2 啟用功能 (Capabilities)
1. 在左側選單選擇 **"Capabilities"**。
2. 勾選 **"Board Buttons"**。
3. 如果出現編輯介面，確認它指向的是正確的網址路徑。
4. 點擊 **"Save"**。

## 3. 在看板中啟用
1. 進入任何一個 Trello 看板。
2. 點擊右上角的 **"Power-Ups"** 按鈕。
3. 找到您的 "Checklist Viewer" 並點擊 **"Add"** (或啟用)。
4. 啟用後，看板右上角應會出現 **"Checklist Viewer"** 按鈕。

---
*本文件由 Conductor 自動產生。*
