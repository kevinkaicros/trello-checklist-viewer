import { useState } from 'react';
import './App.css';
import { MemberSelector } from './components/MemberSelector';
import ProjectGroup from './components/ProjectGroup';
import { updateChecklistItemState } from './services/data-fetching';
import { filterAndGroupItems, type FlatChecklistItem } from './services/logic';
import { getTrello } from './services/trello';
import { useBoardMembers, useMemberChecklists } from './hooks/useTrelloData';

function App() {
  const [selectedMember, setSelectedMember] = useState<TrelloMember | null>(null);
  
  const { members, error: membersError } = useBoardMembers();
  const { cards, loading: cardsLoading, error: cardsError, setCards } = useMemberChecklists(selectedMember?.username || null);

  const groupedItems = selectedMember 
    ? filterAndGroupItems(cards, selectedMember.username) 
    : [];

  const handleSelectMember = (member: TrelloMember) => {
    setSelectedMember(member);
  };

  const handleToggle = async (item: FlatChecklistItem) => {
    const newState = item.state === 'complete' ? 'incomplete' : 'complete';
    
    // Optimistic UI update
    setCards(prevCards => prevCards.map(card => {
      if (card.id !== item.cardId) return card;
      return {
        ...card,
        checklists: card.checklists.map(cl => {
          if (cl.id !== item.checklistId) return cl;
          return {
            ...cl,
            checkItems: cl.checkItems.map(ci => {
              if (ci.id !== item.itemId) return ci;
              return { ...ci, state: newState };
            })
          };
        })
      };
    }));

    if (import.meta.env.DEV) {
      console.log(`[DEV] Mock update item ${item.itemId} to ${newState}`);
      return;
    }

    const t = getTrello();
    if (!t) return;

    try {
      await updateChecklistItemState(t, item.cardId, item.checklistId, item.itemId, newState);
    } catch (err) {
      console.error('Failed to update item state', err);
    }
  };

  if (membersError) {
    return <div className="app-container status-message">Error loading members: {membersError.message}</div>;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <MemberSelector 
          members={members}
          onSelect={handleSelectMember}
          selectedMember={selectedMember}
        />
      </header>

      <main className="app-content">
        {cardsLoading ? (
          <div className="status-message">Loading Trello data...</div>
        ) : cardsError ? (
          <div className="status-message">Error loading cards: {cardsError.message}</div>
        ) : groupedItems.length > 0 ? (
          groupedItems.map((group) => (
            <ProjectGroup
              key={group.projectName}
              group={group}
              onToggle={handleToggle}
            />
          ))
        ) : (
          <div className="status-message">
            {selectedMember ? "No checklists found for this member." : "Select a member to filter items."}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
