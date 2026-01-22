import { renderHook, waitFor } from '@testing-library/react';
import { useBoardMembers, useMemberChecklists } from './useTrelloData';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as trelloService from '../services/trello';
import * as dataFetching from '../services/data-fetching';

vi.mock('../services/trello');
vi.mock('../services/data-fetching');

describe('useTrelloData hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('useBoardMembers fetches members', async () => {
    // Force non-dev path if possible
    // @ts-ignore
    const originalDev = import.meta.env.DEV;
    // @ts-ignore
    import.meta.env.DEV = false;
    
    try {
      const mockMembers = [{ id: '1', fullName: 'Test', username: 'test' }];
      vi.mocked(trelloService.getTrello).mockReturnValue({});
      vi.mocked(dataFetching.fetchBoardMembers).mockResolvedValue(mockMembers);

      const { result } = renderHook(() => useBoardMembers());

      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(result.current.members).toEqual(mockMembers);
    } finally {
      // @ts-ignore
      import.meta.env.DEV = originalDev;
    }
  });

  it('useMemberChecklists fetches cards when username provided', async () => {
    // @ts-ignore
    const originalDev = import.meta.env.DEV;
    // @ts-ignore
    import.meta.env.DEV = false;

    try {
      const mockCards = [{ id: 'c1', name: 'Card 1', checklists: [], labels: [], members: [] }];
      vi.mocked(trelloService.getTrello).mockReturnValue({});
      vi.mocked(dataFetching.fetchAllCardsWithChecklists).mockResolvedValue(mockCards);

      const { result, rerender } = renderHook(({ username }) => useMemberChecklists(username), {
        initialProps: { username: null as string | null }
      });

      expect(result.current.cards).toHaveLength(0);

      rerender({ username: 'kai' });

      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(result.current.cards).toEqual(mockCards);
    } finally {
      // @ts-ignore
      import.meta.env.DEV = originalDev;
    }
  });
});
