import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchAllCardsWithChecklists, updateChecklistItemState, fetchBoardMembers } from './data-fetching';

describe('Data Fetching Service', () => {
  const mockT = {
    cards: vi.fn(),
    set: vi.fn(),
    board: vi.fn(),
    getRestApi: vi.fn().mockReturnValue({
      isAuthorized: vi.fn().mockResolvedValue(false), // Default to false to fallback to t.cards() for existing tests
      getToken: vi.fn(),
      authorize: vi.fn(),
    }),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetchAllCardsWithChecklists retrieves all cards with specific fields (fallback)', async () => {
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
    
    // Force authorization to fail to trigger fallback
    const mockRestApi = mockT.getRestApi();
    mockRestApi.authorize.mockRejectedValue(new Error('Auth failed'));

    const result = await fetchAllCardsWithChecklists(mockT as unknown as TrelloInstance);
    
    expect(mockT.cards).toHaveBeenCalledWith('id', 'name', 'checklists', 'labels', 'members');
    expect(result).toEqual(mockCards);
  });

  it('fetchBoardMembers retrieves members from board', async () => {
    const mockMembers = [{ id: 'm1', fullName: 'Member 1', username: 'm1', avatar: 'url', initials: 'M1' }];
    mockT.board.mockResolvedValue({ members: mockMembers });
    
    const result = await fetchBoardMembers(mockT as unknown as TrelloInstance);
    expect(mockT.board).toHaveBeenCalledWith('members');
    expect(result).toHaveLength(1);
    expect(result[0].fullName).toBe('Member 1');
  });

  it('updateChecklistItemState calls REST API with correct parameters', async () => {
    const mockRestApi = {
      isAuthorized: vi.fn().mockResolvedValue(true),
      getToken: vi.fn().mockResolvedValue('mockToken'),
    };
    const mockTWithRest = {
      ...mockT,
      getRestApi: vi.fn().mockReturnValue(mockRestApi),
    };

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    });

    await updateChecklistItemState(
      mockTWithRest as unknown as TrelloInstance,
      'card1',
      'cl1',
      'item1',
      'complete'
    );

    expect(mockTWithRest.getRestApi).toHaveBeenCalled();
    expect(mockRestApi.isAuthorized).toHaveBeenCalled();
    expect(mockRestApi.getToken).toHaveBeenCalled();
    
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('https://api.trello.com/1/cards/card1/checklist/cl1/checkItem/item1'),
      expect.objectContaining({
        method: 'PUT',
      })
    );
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('state=complete'),
      expect.anything()
    );
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('token=mockToken'),
      expect.anything()
    );
  });
});
