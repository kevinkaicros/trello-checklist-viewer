export const fetchBoardMembers = async (t: any): Promise<TrelloMember[]> => {
  try {
    const board = await t.board('members');
    const members = board.members || [];
    return members.map((m: any) => ({
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

export const fetchAllCardsWithChecklists = async (t: any): Promise<TrelloCard[]> => {
  // Request cards with checklists and labels
  return await t.cards('id', 'name', 'checklists', 'labels');
};

export const updateChecklistItemState = async (
  _t: any,
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
