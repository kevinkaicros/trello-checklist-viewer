import type { TrelloCard } from './data-fetching';

export const MOCK_CARDS: TrelloCard[] = [
  {
    id: 'card-1',
    name: '完成專案報告',
    labels: [{ name: 'SGS 專案' }],
    checklists: [
      {
        id: 'cl-1',
        name: '待辦事項',
        checkItems: [
          { id: 'item-1', name: '收集數據 @kai', state: 'incomplete' },
          { id: 'item-2', name: '撰寫草稿 @user1', state: 'complete' },
        ],
      },
    ],
  },
  {
    id: 'card-2',
    name: '網站效能優化',
    labels: [{ name: '技術研發' }],
    checklists: [
      {
        id: 'cl-2',
        name: '工作項目',
        checkItems: [
          { id: 'item-3', name: '優化圖片大小 @kai', state: 'incomplete' },
          { id: 'item-4', name: '重構 CSS', state: 'incomplete' },
        ],
      },
    ],
  },
  {
    id: 'card-3',
    name: '市場調研',
    labels: [],
    checklists: [
      {
        id: 'cl-3',
        name: 'Checklist',
        checkItems: [
          { id: 'item-5', name: '分析競品 @kai', state: 'incomplete' },
        ],
      },
    ],
  },
];
