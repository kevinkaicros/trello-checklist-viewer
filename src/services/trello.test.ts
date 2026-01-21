import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { initializePowerUp } from './trello';

describe('Trello Service', () => {
  beforeEach(() => {
    window.TrelloPowerUp = {
      initialize: vi.fn(),
      iframe: vi.fn(),
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('initializePowerUp calls TrelloPowerUp.initialize', () => {
    initializePowerUp();
    expect(window.TrelloPowerUp.initialize).toHaveBeenCalled();
  });
});
