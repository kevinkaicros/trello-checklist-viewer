import React from 'react';
import type { FlatChecklistItem } from '../services/logic';

interface ChecklistItemProps {
  item: FlatChecklistItem;
  onToggle: (item: FlatChecklistItem) => void;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({ item, onToggle }) => {
  return (
    <label className="checklist-item">
      <input
        type="checkbox"
        checked={item.state === 'complete'}
        onChange={() => onToggle(item)}
      />
      <div className="item-details">
        <span className="item-name">{item.name}</span>
        <span className="card-name">{item.cardName}</span>
      </div>
    </label>
  );
};

export default ChecklistItem;
