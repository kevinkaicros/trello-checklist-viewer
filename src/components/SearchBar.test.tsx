import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
  it('renders input field', () => {
    render(<SearchBar onSearch={() => {}} />);
    expect(screen.getByPlaceholderText(/Search username/i)).toBeInTheDocument();
  });

  it('calls onSearch when input changes', () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);
    const input = screen.getByPlaceholderText(/Search username/i);
    
    fireEvent.change(input, { target: { value: '@kai' } });
    expect(onSearch).toHaveBeenCalledWith('@kai');
  });
});
