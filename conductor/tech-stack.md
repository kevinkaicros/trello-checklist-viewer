# Tech Stack

## Frontend Framework & Tooling
- **React (TypeScript)**: 作為核心前端框架，利用其組件化架構來構建複雜的清單過濾與分類介面。使用 TypeScript 確保代碼的類型安全與可維護性。
- **Vite**: 作為構建工具與本地開發服務器，提供極速的熱更新 (HMR) 與優化的打包效能。

## State Management
- **React Context API**: 用於管理應用層級的狀態，如當前選擇的用戶、過濾後的清單數據以及與 Trello API 的同步狀態。

## Trello Integration
- **Trello Power-Up Client Library**: 官方提供的客戶端庫，用於與 Trello 看板進行交互、開啟模态窗口以及讀寫清單數據。

## CSS & UI Components
- **CSS Modules**: 用於組件級別的樣式管理，避免樣式衝突，並嚴格遵循 Trello 的設計規範。