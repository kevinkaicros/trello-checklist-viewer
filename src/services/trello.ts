import iconDark from '../assets/viewer-icon-dark.svg';
import iconLight from '../assets/viewer-icon-light.svg';

export const initializePowerUp = () => {
  console.log('Trello Power-Up: Attempting initialization...');
  if (!window.TrelloPowerUp) {
    console.error('Trello Power-Up: window.TrelloPowerUp is undefined!');
    return;
  }

  console.log('Trello Power-Up: window.TrelloPowerUp found. Initializing...');
  window.TrelloPowerUp.initialize({
    'board-buttons': function () {
      console.log('Trello Power-Up: board-buttons requested');
      return [{
        icon: {
          dark: iconDark,
          light: iconLight,
        },
        text: '清單 Viewer',
        callback: function (t: TrelloInstance) {
          console.log('Trello Power-Up: Button clicked');
          // Append ?modal=true to differentiate context
          const url = new URL(window.location.href);
          url.searchParams.set('modal', 'true');
          
          return t.modal({
            title: 'Checklist Viewer',
            url: url.toString(),
            fullscreen: true,
          });
        },
      }];
    },
  });
  console.log('Trello Power-Up: Initialization called.');
};

let tInstance: TrelloInstance | null = null;

export const getTrello = (): TrelloInstance | null => {
  if (tInstance) return tInstance;
  if (window.TrelloPowerUp) {
    // Only call iframe() if we haven't successfully initialized as a connector?
    // Or just call it lazily.
    // NOTE: If this is the connector iframe, calling iframe() MIGHT confuse Trello if done too early.
    // But since this is lazy, it happens in useEffect.
    try {
        tInstance = window.TrelloPowerUp.iframe();
    } catch (e) {
        console.warn("Failed to initialize Trello iframe (this might be the connector iframe):", e);
    }
    return tInstance;
  }
  return null;
};
