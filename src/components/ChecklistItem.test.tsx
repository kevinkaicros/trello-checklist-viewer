import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ChecklistItem from './ChecklistItem';

describe('ChecklistItem Component', () => {
  const mockItem = {
    itemId: 'i1',
    name: 'Test Task',
    state: 'incomplete',
    cardName: 'Card A',
  };

  it('renders item name and card name', () => {
    render(<ChecklistItem item={mockItem as any} onToggle={() => {}} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText(/Card A/i)).toBeInTheDocument();
  });

  it('calls onToggle when checkbox is clicked', () => {
    const onToggle = vi.fn();
    render(<ChecklistItem item={mockItem as any} onToggle={onToggle} />);
    const checkbox = screen.getByRole('checkbox');
    
    fireEvent.click(checkbox);
    expect(onToggle).toHaveBeenCalled();
  });
});
