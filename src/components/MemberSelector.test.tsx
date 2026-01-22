import { render, screen, fireEvent } from '@testing-library/react';
import { MemberSelector } from './MemberSelector';
import { describe, it, expect, vi } from 'vitest';

const mockMembers: TrelloMember[] = [
  { id: '1', fullName: 'Alice Smith', username: 'alice' },
  { id: '2', fullName: 'Bob Jones', username: 'bob' },
];

describe('MemberSelector', () => {
  it('renders select button', () => {
    render(<MemberSelector members={mockMembers} onSelect={vi.fn()} />);
    expect(screen.getByText('Select Member')).toBeInTheDocument();
  });

  it('opens dropdown on click', () => {
    render(<MemberSelector members={mockMembers} onSelect={vi.fn()} />);
    fireEvent.click(screen.getByText('Select Member'));
    expect(screen.getByPlaceholderText('Search members...')).toBeInTheDocument();
  });

  it('filters members', () => {
    render(<MemberSelector members={mockMembers} onSelect={vi.fn()} />);
    fireEvent.click(screen.getByText('Select Member'));
    const input = screen.getByPlaceholderText('Search members...');
    fireEvent.change(input, { target: { value: 'alice' } });
    expect(screen.getByText('Alice Smith (@alice)')).toBeInTheDocument();
    expect(screen.queryByText('Bob Jones (@bob)')).not.toBeInTheDocument();
  });

  it('calls onSelect when member clicked', () => {
    const onSelect = vi.fn();
    render(<MemberSelector members={mockMembers} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Select Member'));
    fireEvent.click(screen.getByText('Alice Smith (@alice)'));
    expect(onSelect).toHaveBeenCalledWith(mockMembers[0]);
  });

  it('displays selected member name', () => {
    render(<MemberSelector members={mockMembers} onSelect={vi.fn()} selectedMember={mockMembers[0]} />);
    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
  });
});
