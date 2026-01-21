# Initial Concept
新增一個 Trello Power-Up，功能是依據選擇的用戶，撈出所有的 checklist，篩選 checklist 內容含有文字 @username 的 checklist，再依照 Project 分類呈現，並且可以勾選連動更新原生的 checklist。

# Product Definition

## Core Purpose
開發一個專屬的 Trello Power-Up，旨在為專案主管提供跨看板的清單匯總視圖。透過篩選特定用戶（@username）的任務，並將其按標籤（Labels）定義的「專案」進行分類，實現高效的任務監控與雙向狀態更新。

## Target Users
- **專案主管 (Project Leads)**：需要同時監控多個成員在不同專案中的任務進度，並能快速過濾出分配給特定人的工作項。

## Key Features
- **用戶篩選機制**：支持選擇特定 Trello 用戶，自動檢索所有相關清單。
- **內容過濾**：僅顯示包含 `@username` 標籤的清單項，確保精確定位分配任務。
- **專案化分類展示**：將不同卡片中的任務，依據卡片所屬的「標籤 (Label)」作為專案維度進行分組呈現。
- **雙向同步勾选**：在 Power-Up 介面中完成勾選操作後，即時同步回傳並更新 Trello 原生的清單狀態。

## User Experience (UX)
- **模態窗口 (Modal Overlay)**：使用大面積的彈窗介面，為複雜的分類列表提供清晰的佈局與操作空間。
- **專注操作流程**：用戶可以在一個集中視圖內處理所有待辦事項，無需在不同看板或卡片間頻繁切換。