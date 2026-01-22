export const initializePowerUp = () => {
  console.log('Trello Power-Up: Attempting initialization...');
  if (!window.TrelloPowerUp) {
    console.error('Trello Power-Up: window.TrelloPowerUp is undefined!');
    return;
  }

  console.log('Trello Power-Up: window.TrelloPowerUp found. Initializing...');
  window.TrelloPowerUp.initialize({
    'board-buttons': function (_t: any) {
      console.log('Trello Power-Up: board-buttons requested');
      return [{
        icon: {
          dark: './vite.svg',
          light: './vite.svg',
        },
        text: 'Checklist Viewer',
        callback: function (t: any) {
          console.log('Trello Power-Up: Button clicked');
          return t.modal({
            title: 'Checklist Viewer',
            url: window.location.href,
            fullscreen: true,
          });
        },
      }];
    },
  });
  console.log('Trello Power-Up: Initialization called.');
};

export const t = window.TrelloPowerUp ? window.TrelloPowerUp.iframe() : null;
