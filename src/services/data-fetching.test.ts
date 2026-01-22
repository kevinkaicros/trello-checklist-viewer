import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchAllCardsWithChecklists, updateChecklistItemState, fetchBoardMembers } from './data-fetching';

describe('Data Fetching Service', () => {
  const mockT = {
    cards: vi.fn(),
    set: vi.fn(),
    board: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetchAllCardsWithChecklists retrieves all cards with specific fields', async () => {
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
    
    expect(mockT.cards).toHaveBeenCalledWith('id', 'name', 'checklists', 'labels', 'members');
    expect(result).toEqual(mockCards);
  });

  it('fetchBoardMembers retrieves members from board', async () => {
    const mockMembers = [{ id: 'm1', fullName: 'Member 1', username: 'm1', avatar: 'url', initials: 'M1' }];
    mockT.board.mockResolvedValue({ members: mockMembers });
    
    const result = await fetchBoardMembers(mockT as any);
    expect(mockT.board).toHaveBeenCalledWith('members');
    expect(result).toHaveLength(1);
    expect(result[0].fullName).toBe('Member 1');
  });

  it('updateChecklistItemState log update (placeholder)', async () => {
    // Current implementation only logs, but we verify it doesn't crash
    await updateChecklistItemState(mockT as any, 'card1', 'cl1', 'item1', 'complete');
  });
});
