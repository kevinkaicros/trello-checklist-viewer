# Product Guidelines

## Visual & Interaction Style
- **原生 Trello 審美 (Native Trello Aesthetic)**：介面設計必須嚴格遵循 Trello 官方設計系統。使用 Trello Power-Up Client Library 提供的標準樣式、字體與色彩，確保用戶在使用本 Power-Up 時能獲得與 Trello 原生環境無縫銜接的體驗。
- **一致的組件使用**：優先使用 Trello UI 組件（如按鈕、複選框、下拉菜單等），保持與主看板操作邏輯的一致性。

## Tone & Voice
- **專業且簡潔 (Professional & Concise)**：所有提示文字、標籤與說明應直接且專注於操作效率。避免冗長的解釋，確保專案主管能一眼看清關鍵數據。
- **明確的狀態傳達**：對於同步狀態、過濾結果等關鍵信息，使用清晰、中性的術语進行描述。

## User Experience (UX) Principles
- **即時反饋 (Instant Feedback)**：
    - 當用戶勾選或取消清單項時，介面應立即反映變更。
    - 同步至 Trello 後端時，應提供非侵入式的視覺提示（如微小的加載動畫或成功勾選標記），讓用戶確認操作已生效。
- **數據一致性 (Data Integrity)**：
    - 採取「單一事實來源」原則，確保 Power-Up 介面中的數據與 Trello 原生卡片內容時刻保持高度一致。
    - 處理並發更新時需有明確的邏輯，避免用戶在多端操作時產生數據衝突。
- **加載性能優化 (Loading Performance)**：
    - 針對跨看板抓取數據的場景，需實施分頁加載或按需加載策略。
    - 在數據載入期間，使用骨架屏 (Skeleton screens) 或加載占位符，減少用戶的等待焦慮感，確保流程流暢。