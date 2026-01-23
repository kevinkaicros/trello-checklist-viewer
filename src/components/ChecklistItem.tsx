import React from 'react';
import type { FlatChecklistItem } from '../services/logic';

interface ChecklistItemProps {
  item: FlatChecklistItem;
  onToggle: (item: FlatChecklistItem) => void;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({ item, onToggle }) => {
  return (
    <div className="checklist-item">
      <input
        type="checkbox"
        checked={item.state === 'complete'}
        onChange={() => onToggle(item)}
      />
      <div className="item-details">
        <span className="item-name">{item.name}</span>
      </div>
    </div>
  );
};

export default ChecklistItem;
