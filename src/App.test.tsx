import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';
import { useBoardMembers } from './hooks/useTrelloData';

// Mock Hooks
vi.mock('./hooks/useTrelloData', () => ({
  useBoardMembers: vi.fn().mockReturnValue({ members: [], loading: false, error: null }),
  useMemberChecklists: vi.fn().mockReturnValue({ cards: [], loading: false, error: null, setCards: vi.fn() }),
}));

vi.mock('./services/trello', () => ({
  getTrello: vi.fn(),
}));

describe('App Integration', () => {
  it('renders member selector', () => {
    render(<App />);
    expect(screen.getByText('Select Member')).toBeInTheDocument();
  });

  it('renders error message when members fail to load', () => {
    vi.mocked(useBoardMembers).mockReturnValue({ members: [], loading: false, error: new Error('Failed to fetch') });
    render(<App />);
    expect(screen.getByText(/Error loading members: Failed to fetch/)).toBeInTheDocument();
  });
});