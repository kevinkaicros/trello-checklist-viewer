import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initializePowerUp } from './services/trello'

const isModal = new URLSearchParams(window.location.search).get('modal') === 'true';

if (isModal) {
  // We are inside the modal -> Render the App (which calls iframe())
  console.log('Trello Power-Up: Modal detected. Rendering App...');
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
  // We are the connector (hidden iframe) -> Initialize capabilities
  console.log('Trello Power-Up: Connector detected. Initializing capabilities...');
  initializePowerUp();
  // We don't need to render the full App here, but we need a root to avoid errors if any
  // Or just render a minimal placeholder
  createRoot(document.getElementById('root')!).render(
    <div style={{ display: 'none' }}>Trello Connector</div>
  );
}