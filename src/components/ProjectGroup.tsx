import React from 'react';
import type { GroupedItems, FlatChecklistItem } from '../services/logic';
import ChecklistItem from './ChecklistItem';

interface ProjectGroupProps {
  group: GroupedItems;
  onToggle: (item: FlatChecklistItem) => void;
}

const ProjectGroup: React.FC<ProjectGroupProps> = ({ group, onToggle }) => {
  return (
    <div className="project-group">
      <h3 className="project-header">{group.projectName}</h3>
      <div className="items-list">
        {group.items.map((item) => (
          <ChecklistItem
            key={item.itemId}
            item={item}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectGroup;
