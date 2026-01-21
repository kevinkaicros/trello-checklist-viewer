import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import ProjectGroup from './components/ProjectGroup';
import { fetchAllCardsWithChecklists, type TrelloCard } from './services/data-fetching';
import { filterAndGroupItems, type GroupedItems, type FlatChecklistItem } from './services/logic';
import { t } from './services/trello';

function App() {
  const [cards, setCards] = useState<TrelloCard[]>([]);
  const [groupedItems, setGroupedItems] = useState<GroupedItems[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (t) {
          const data = await fetchAllCardsWithChecklists(t);
          setCards(data);
        }
      } catch (err) {
        console.error('Failed to load Trello data', err);
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
    console.log('Toggle item', item);
    // Implementation for status update will be in Phase 4
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