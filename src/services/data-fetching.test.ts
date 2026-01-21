import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchAllCardsWithChecklists } from './data-fetching';

describe('Data Fetching Service', () => {
  const mockT = {
    cards: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetchAllCardsWithChecklists retrieves all cards with checklists and labels', async () => {
    const mockCards = [
      {
        id: 'card1',
        name: 'Card 1',
        labels: [{ name: 'Project A' }],
        checklists: [
          {
            id: 'cl1',
            name: 'Checklist 1',
            checkItems: [{ id: 'item1', name: 'Task @kai', state: 'incomplete' }],
          },
        ],
      },
    ];
    mockT.cards.mockResolvedValue(mockCards);

    const result = await fetchAllCardsWithChecklists(mockT as any);
    
    expect(mockT.cards).toHaveBeenCalledWith('all');
    expect(result).toEqual(mockCards);
  });
});
