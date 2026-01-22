import { useState, useEffect } from 'react';
import { getTrello } from '../services/trello';
import { fetchBoardMembers, fetchAllCardsWithChecklists } from '../services/data-fetching';
import { MOCK_CARDS, MOCK_MEMBERS } from '../services/mock-data';

export const useBoardMembers = () => {
  const [members, setMembers] = useState<TrelloMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadMembers = async () => {
      if (import.meta.env.DEV) {
        setMembers(MOCK_MEMBERS);
        setLoading(false);
        return;
      }

      const t = getTrello();
      if (!t) {
        setMembers(MOCK_MEMBERS); // Fallback to mock if no Trello instance
        setLoading(false);
        return;
      }
      try {
        const data = await fetchBoardMembers(t);
        setMembers(data);
      } catch (err) {
        console.warn('Failed to fetch members, using mock.', err);
        setMembers(MOCK_MEMBERS);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    loadMembers();
  }, []);

  return { members, loading, error };
};

export const useMemberChecklists = (memberUsername: string | null) => {
  const [cards, setCards] = useState<TrelloCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!memberUsername) {
      setCards([]);
      return;
    }

    const loadChecklists = async () => {
      setLoading(true);
      if (import.meta.env.DEV) {
        setCards(MOCK_CARDS);
        setLoading(false);
        return;
      }

      const t = getTrello();
      if (!t) {
        setCards(MOCK_CARDS); // Fallback to mock
        setLoading(false);
        return;
      }
      try {
        const data = await fetchAllCardsWithChecklists(t);
        setCards(data);
      } catch (err) {
        console.warn('Failed to fetch cards, using mock.', err);
        setCards(MOCK_CARDS);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    loadChecklists();
  }, [memberUsername]);

  return { cards, loading, error, setCards };
};
