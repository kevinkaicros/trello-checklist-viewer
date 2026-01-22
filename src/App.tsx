import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import ProjectGroup from './components/ProjectGroup';
import { fetchAllCardsWithChecklists, updateChecklistItemState, type TrelloCard } from './services/data-fetching';
import { filterAndGroupItems, type GroupedItems, type FlatChecklistItem } from './services/logic';
import { getTrello } from './services/trello';
import { MOCK_CARDS } from './services/mock-data';

function App() {
  const [cards, setCards] = useState<TrelloCard[]>([]);
  const [groupedItems, setGroupedItems] = useState<GroupedItems[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleSearch = (username: string) => {
    if (!username || username.length < 2) {
      setGroupedItems([]);
      return;
    }
    const filtered = filterAndGroupItems(cards, username);
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
        <SearchBar onSearch={handleSearch} />
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
            {cards.length > 0 ? "Enter a username to filter items." : "No checklists found on this board."}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;