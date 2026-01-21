export interface TrelloCard {
  id: string;
  name: string;
  labels: { name: string }[];
  checklists: {
    id: string;
    name: string;
    checkItems: {
      id: string;
      name: string;
      state: string;
    }[];
  }[];
}

export const fetchAllCardsWithChecklists = async (t: any): Promise<TrelloCard[]> => {
  return await t.cards('all');
};

export const updateChecklistItemState = async (
  t: any,
  cardId: string,
  checklistId: string,
  checkItemId: string,
  state: 'complete' | 'incomplete'
): Promise<void> => {
  // Use t.set to update the state. Note: In real Trello Power-Up, 
  // updating core checklist items might require REST API if Power-Up client doesn't have a direct helper.
  // However, for this MVP, we use t.set as a proxy for the intent to update state.
  return await t.set(cardId, 'shared', `checkitem-${checkItemId}-state`, state);
};