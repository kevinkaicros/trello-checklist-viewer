# Specification: 搭建 Trello Power-Up 基础架构与模态窗口原型

## Goal
初始化專案代碼庫，建立基於 Vite + React + TypeScript 的開發環境，並實現與 Trello Power-Up 架構的基礎集成。目標是確保 Power-Up 能在 Trello 看板上正確加載，並能通過按鈕喚起一個基礎的模態窗口。

## Requirements

### 1. Project Initialization
- 使用 **Vite** 初始化 React + TypeScript 專案。
- 配置 **TypeScript** (tsconfig.json) 以符合專案規範。
- 安裝必要的開發依賴 (CSS Modules, Types for Trello if available).
- 確保專案結構清晰 (src/components, src/utils, public/ 等)。

### 2. Trello Power-Up Configuration
- 在 `public/` 目錄下創建 `manifest.json`，定義 Power-Up 的基本信息 (Name, Capabilities).
- 在 `index.html` 中引入 Trello Power-Up Client Library (CDN).
- 實現 `window.TrelloPowerUp.initialize`，並註冊 `board-buttons` 能力。

### 3. Feature: Board Button & Modal
- **Board Button**: 在看板右上角顯示一個按鈕，圖標與文字需符合 Trello 風格。
- **Modal Interaction**: 點擊按鈕後，調用 `t.modal()` 打開一個 iframe 頁面。
- **Modal UI**: 模態窗口內顯示 "Hello Trello Power-Up" 及基礎樣式，驗證 React 組件加載正常。

## Tech Details
- **Build Tool**: Vite
- **Framework**: React 18+
- **Language**: TypeScript
- **Styling**: CSS Modules
- **Trello API**: Power-Up Client Library (v3)
