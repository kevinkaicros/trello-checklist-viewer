import { useState, useEffect } from 'react';
import './App.css';
import { MemberSelector } from './components/MemberSelector';
import ProjectGroup from './components/ProjectGroup';
import { fetchAllCardsWithChecklists, updateChecklistItemState, type TrelloCard } from './services/data-fetching';
import { filterAndGroupItems, type GroupedItems, type FlatChecklistItem } from './services/logic';
import { getTrello } from './services/trello';
import { MOCK_CARDS, MOCK_MEMBERS } from './services/mock-data';

function App() {
  const [cards, setCards] = useState<TrelloCard[]>([]);
  const [groupedItems, setGroupedItems] = useState<GroupedItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<TrelloMember | null>(null);

  useEffect(() => {
    const loadData = async () => {
      // In development mode, force mock data to avoid Trello client timeout issues
      if (import.meta.env.DEV) {
        console.log('Development mode detected, using mock data.');
        setCards(MOCK_CARDS);
        setLoading(false);
        return;
      }

      try {
        const t = getTrello();
        if (t) {
          try {
            const data = await fetchAllCardsWithChecklists(t);
            setCards(data);
          } catch (apiErr) {
            console.warn('Trello API call failed, using mock data.', apiErr);
            setCards(MOCK_CARDS);
          }
        } else {
          console.log('No Trello instance detected, using mock data.');
          setCards(MOCK_CARDS);
        }
      } catch (err) {
        console.error('Unexpected error loading data', err);
        setCards(MOCK_CARDS);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSelectMember = (member: TrelloMember) => {
    setSelectedMember(member);
    const filtered = filterAndGroupItems(cards, member.username);
    setGroupedItems(filtered);
  };

  const handleToggle = async (item: FlatChecklistItem) => {
    const newState = item.state === 'complete' ? 'incomplete' : 'complete';
    
    // Optimistic UI update
    setGroupedItems(prev => prev.map(group => ({
      ...group,
      items: group.items.map(i => 
        i.itemId === item.itemId ? { ...i, state: newState } : i
      )
    })));

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
      // Rollback on error
      setGroupedItems(prev => prev.map(group => ({
        ...group,
        items: group.items.map(i => 
          i.itemId === item.itemId ? { ...i, state: item.state } : i
        )
      })));
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Checklist Viewer</h1>
        <MemberSelector 
          members={MOCK_MEMBERS}
          onSelect={handleSelectMember}
          selectedMember={selectedMember}
        />
      </header>

      <main className="app-content">
        {loading ? (
          <div className="status-message">Loading Trello data...</div>
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
