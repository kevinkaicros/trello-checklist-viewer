import React from 'react';
import type { FlatChecklistItem } from '../services/logic';

interface ChecklistItemProps {
  item: FlatChecklistItem;
  onToggle: (item: FlatChecklistItem) => void;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({ item, onToggle }) => {
  const handleRowClick = () => {
    onToggle(item);
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="checklist-item" onClick={handleRowClick}>
      <input
        type="checkbox"
        checked={item.state === 'complete'}
        onChange={() => onToggle(item)}
        onClick={handleCheckboxClick}
      />
      <div className="item-details">
        <span className="item-name">{item.name}</span>
      </div>
    </div>
  );
};

export default ChecklistItem;
