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
  // In a real Trello Power-Up, t.cards('all') retrieves cards on the current board.
  // We assume the Power-Up is configured to include checklists and labels if possible,
  // or we might need additional t.get calls per card.
  return await t.cards('all');
};
