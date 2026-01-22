# Track Specification: Member Selection & Real API Integration

## 1.0 概述 (Overview)
本 Track 旨在提升 Trello Checklist Viewer 的實用性與準確性。我們將把原本手動輸入 `@username` 的方式改為「成員挑選器」，並將原本的 Mock Data 替換為真實的 Trello API 串接，實現在真實環境中搜尋與顯示待辦清單 (Checklists)。

## 2.0 功能需求 (Functional Requirements)

### 2.1 原生化成員挑選器 (Native-style Member Selector)
- **介面設計：** 參考 Trello 原生設計，實作一個包含搜尋功能與成員列表的下拉選單。
- **資料來源：** 透過 Trello API 獲取當前看板的所有成員資訊（頭像、全名、使用者名稱）。
- **互動邏輯：** 使用者點選成員後，系統自動觸發 Checklist 搜尋。

### 2.2 Trello API 實作 (API Integration)
- **實作測試：** 直接實作 API 呼叫邏輯，獲取真實的 Checklist 資料。
- **載入策略：** 採用「按需求載入 (Lazy Loading)」。
    - 預設不載入所有資料。
    - 當選定特定成員後，才發送請求獲取該成員相關的 Checklist 條目。
- **資料過濾：** 搜尋所有包含特定成員標記 (@username) 或分配給該成員的待辦事項。

### 2.3 資料模型更新
- 根據真實 API 回傳的結構，更新 `src/types/trello.d.ts` 與相關的 TypeScript 介面，確保型別安全。

## 3.0 非功能需求 (Non-Functional Requirements)
- **效能：** 確保 API 請求不會導致介面長時間卡頓，應提供載入中狀態 (Loading state)。
- **安全性：** 遵守 Trello Power-Up 安全規範，正確處理 API Token 與權限。

## 4.0 驗收標準 (Acceptance Criteria)
1. 使用者可以透過下拉選單（參考原生風格）選擇看板成員。
2. 系統能成功從 Trello API 獲取 Checklist 資料，而非使用 Mock Data。
3. 選取成員後，頁面能正確顯示該成員在當前看板（或 Trello 指定範圍）的所有待辦項目。
4. 勾選/取消勾選狀態能成功同步回 Trello 原始卡片。

## 5.0 排除範圍 (Out of Scope)
- 跨多個看板的全局搜尋（本階段先鎖定在當前看板的 API 驗證與實作）。
