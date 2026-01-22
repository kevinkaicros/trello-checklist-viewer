import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock Hooks
vi.mock('./hooks/useTrelloData', () => ({
  useBoardMembers: vi.fn().mockReturnValue({ members: [], loading: false }),
  useMemberChecklists: vi.fn().mockReturnValue({ cards: [], loading: false, setCards: vi.fn() }),
}));

vi.mock('./services/trello', () => ({
  getTrello: vi.fn(),
}));

describe('App Integration', () => {
  it('renders member selector', () => {
    render(<App />);
    expect(screen.getByText('Select Member')).toBeInTheDocument();
  });
});