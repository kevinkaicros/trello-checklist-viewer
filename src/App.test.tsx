import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock Trello Service
vi.mock('./services/trello', () => ({
  getTrello: vi.fn(), // Mock getTrello instead of initializePowerUp/t directly if that's what App uses
}));

describe('App Integration', () => {
  it('renders member selector', () => {
    render(<App />);
    expect(screen.getByText('Select Member')).toBeInTheDocument();
  });
});
