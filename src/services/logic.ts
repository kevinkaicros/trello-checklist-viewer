import type { TrelloCard } from './data-fetching';

export interface GroupedItems {
  projectName: string;
  items: FlatChecklistItem[];
}

export interface FlatChecklistItem {
  cardId: string;
  cardName: string;
  checklistId: string;
  itemId: string;
  name: string;
  state: string;
}

export const filterAndGroupItems = (cards: TrelloCard[], username: string): GroupedItems[] => {
  const flatItems: FlatChecklistItem[] = [];
  const searchStr = username.toLowerCase();

  cards.forEach((card) => {
    // Get project name from the first label or "No Project"
    const projectName = card.labels && card.labels.length > 0 ? card.labels[0].name : 'No Project';

    if (card.checklists) {
      card.checklists.forEach((checklist) => {
        if (checklist.checkItems) {
          checklist.checkItems.forEach((item) => {
            if (item.name.toLowerCase().includes(searchStr)) {
              flatItems.push({
                cardId: card.id,
                cardName: card.name,
                checklistId: checklist.id,
                itemId: item.id,
                name: item.name,
                state: item.state,
                projectName, // temporary field for grouping
              } as any);
            }
          });
        }
      });
    }
  });

  // Group by projectName
  const groups: Record<string, FlatChecklistItem[]> = {};
  flatItems.forEach((item: any) => {
    const pName = item.projectName;
    if (!groups[pName]) {
      groups[pName] = [];
    }
    const { projectName, ...rest } = item;
    groups[pName].push(rest);
  });

  // Convert to array and sort
  const result: GroupedItems[] = Object.keys(groups)
    .sort((a, b) => {
      if (a === 'No Project') return 1;
      if (b === 'No Project') return -1;
      return a.localeCompare(b);
    })
    .map((pName) => ({
      projectName: pName,
      items: groups[pName],
    }));

  return result;
};
