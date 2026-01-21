import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (username: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setValue(newVal);
    onSearch(newVal);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search username (e.g. @kai)"
        value={value}
        onChange={handleChange}
        autoFocus
      />
    </div>
  );
};

export default SearchBar;
