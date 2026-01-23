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

  console.log(`[Filter] Filtering for user: ${username} (search: ${searchStr})`);
  console.log(`[Filter] Total cards to process: ${cards.length}`);

  if (cards.length > 0) {
    const firstCard = cards[0];
    console.log('[Filter] Debug First Card:', {
      id: firstCard.id,
      name: firstCard.name,
      members: firstCard.members,
      checklistsCount: firstCard.checklists?.length,
      firstChecklist: firstCard.checklists?.[0]
    });
    if (firstCard.members && firstCard.members.length > 0) {
       console.log('[Filter] First Card Member Username:', firstCard.members[0].username);
       console.log('[Filter] Comparing against searchStr:', searchStr);
    }
  }

  cards.forEach((card) => {
    // Get project name from the first label or the card name itself
    const projectName = card.labels && card.labels.length > 0 ? card.labels[0].name : card.name;

    // const isCardMember = card.members && card.members.some(m => m.username.toLowerCase() === searchStr);
    
    if (card.checklists) {
      card.checklists.forEach((checklist) => {
        // Trello Power-Up client library often returns checklist items in 'checkItems' 
        // but it might be 'items' depending on the API version or field mapping.
        const items = checklist.checkItems || (checklist as unknown as { items: TrelloCheckItem[] }).items;
        
        // Debugging log for checkItems within checklists
        if (!items || items.length === 0) {
           console.log(`[Filter] Checklist ${checklist.id} in Card ${card.id} has no items.`, checklist);
        }

        if (items && Array.isArray(items)) {
          items.forEach((item: TrelloCheckItem) => {
            // Check for direct username match or @username match in item name
            const matchesUsername = item.name.toLowerCase().includes(searchStr);
            
            if (matchesUsername) {
              flatItems.push({
                cardId: card.id,
                cardName: card.name,
                checklistId: checklist.id,
                itemId: item.id,
                name: item.name,
                state: item.state,
                projectName, // temporary field for grouping
              } as FlatChecklistItem & { projectName: string });
            }
          });
        }
      });
    }
  });

  console.log(`[Filter] Found ${flatItems.length} matching items.`);

  // Group by projectName
  const groups: Record<string, FlatChecklistItem[]> = {};
  (flatItems as (FlatChecklistItem & { projectName: string })[]).forEach((item) => {
    const pName = item.projectName;
    if (!groups[pName]) {
      groups[pName] = [];
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { projectName: _projectName, ...rest } = item;
    groups[pName].push(rest);
  });

  // Convert to array and sort
  const result: GroupedItems[] = Object.keys(groups)
    .sort((a, b) => a.localeCompare(b))
    .map((pName) => ({
      projectName: pName,
      items: groups[pName],
    }));

  return result;
};
