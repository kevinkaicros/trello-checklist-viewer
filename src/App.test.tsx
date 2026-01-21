import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock Trello Service
vi.mock('./services/trello', () => ({
  initializePowerUp: vi.fn(),
  t: {
    cards: vi.fn().mockResolvedValue([]),
  },
}));

describe('App Integration', () => {
  it('renders search bar', () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/Search username/i)).toBeInTheDocument();
  });
});