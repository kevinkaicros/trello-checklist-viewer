export const initializePowerUp = () => {
  if (window.TrelloPowerUp) {
    window.TrelloPowerUp.initialize({
      'board-buttons': function (_t: any) {
        return [{
          icon: {
            dark: '/vite.svg',
            light: '/vite.svg',
          },
          text: 'Checklist Viewer',
          callback: function (t: any) {
            return t.modal({
              title: 'Checklist Viewer',
              url: window.location.href,
              fullscreen: true,
            });
          },
        }];
      },
    });
  }
};

export const t = window.TrelloPowerUp ? window.TrelloPowerUp.iframe() : null;
