import React, { useState } from 'react';
import './MemberSelector.css';

interface MemberSelectorProps {
  members: TrelloMember[];
  onSelect: (member: TrelloMember) => void;
  selectedMember?: TrelloMember | null;
}

export const MemberSelector: React.FC<MemberSelectorProps> = ({ members, onSelect, selectedMember }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMembers = members.filter(member =>
    member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="member-selector">
      <button onClick={() => setIsOpen(!isOpen)}>
        {selectedMember ? selectedMember.fullName : 'Select Member'}
      </button>
      {isOpen && (
        <div className="dropdown">
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul>
            {filteredMembers.map(member => (
              <li key={member.id} onClick={() => { onSelect(member); setIsOpen(false); }}>
                {member.fullName} (@{member.username})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
