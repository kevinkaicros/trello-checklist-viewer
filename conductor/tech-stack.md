# Tech Stack: Trello Checklist Viewer

## 1.0 開發語言與環境
- **語言：** TypeScript (嚴格型別模式)
- **環境：** Node.js 18+

## 2.0 前端框架與工具
- **框架：** React (使用 Functional Components 與 Hooks)
- **建置工具：** Vite (開發與生產環境打包)
- **UI 組件庫：** 遵循 Trello Power-Up 設計系統 (或使用基本 CSS 模擬原生外觀)

## 3.0 核心 API 與整合
- **Trello API：** Trello Power-Up Client Library (透過 iframe 與 Trello 通訊)
- **參考架構：** 邏輯層級參考 `trello-enhanced-checklists` 的資料處理模式

## 4.0 測試與品質
- **測試框架：** Vitest (用於 TypeScript 單元測試)
- **代碼規範：** ESLint + Prettier
