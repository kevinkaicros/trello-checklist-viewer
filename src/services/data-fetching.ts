export const fetchBoardMembers = async (t: TrelloInstance): Promise<TrelloMember[]> => {
  try {
    const board = await t.board('members') as Record<string, unknown> & { members?: (TrelloMember & { avatar?: string })[] };
    const members = board.members || [];
    return members.map((m) => ({
      id: m.id,
      fullName: m.fullName,
      username: m.username,
      avatarUrl: m.avatar,
      initials: m.initials,
    }));
  } catch (err) {
    console.error('Failed to fetch board members', err);
    throw err;
  }
};

export const fetchAllCardsWithChecklists = async (t: TrelloInstance): Promise<TrelloCard[]> => {
  // Step 1: Fetch all visible cards with their basic checklist metadata
  const cards = await t.cards('id', 'name', 'checklists', 'labels', 'members');
  
  // Step 2: For cards that have checklists, fetch the full checklist data (including checkItems)
  // t.cards() often omits checkItems for performance, so we fetch them per-card.
  const cardsWithFullChecklists = await Promise.all(
    cards.map(async (card) => {
      if (card.checklists && card.checklists.length > 0) {
        try {
          // Fetching specific card fields, including 'checklists' which contains checkItems
          const fullCardData = await t.card(card.id, 'checklists');
          return {
            ...card,
            checklists: fullCardData.checklists || [],
          };
        } catch (err) {
          console.warn(`Failed to fetch full checklists for card ${card.id}`, err);
          return card;
        }
      }
      return card;
    })
  );

  return cardsWithFullChecklists;
};

export const updateChecklistItemState = async (
  _t: TrelloInstance,
  _cardId: string,
  _checklistId: string,
  checkItemId: string,
  state: 'complete' | 'incomplete'
): Promise<void> => {
  // In Trello Power-Up, updating a core checklist item state 
  // can be done via the REST API or sometimes via helper if available.
  // Using the REST API is the most reliable way for core objects.
  // However, t.set is often used for plugin-specific data.
  // For now, we will use a placeholder or assume the Power-Up has permission.
  // Note: Real implementation might need a fetch to Trello API endpoint.
  console.log(`Updating ${checkItemId} to ${state}`);
  // return await t.set(cardId, 'shared', `checkitem-${checkItemId}-state`, state);
};
