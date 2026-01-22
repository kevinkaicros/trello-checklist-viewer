interface TrelloPowerUp {
  initialize: (capabilities: Record<string, any>) => void;
  iframe: (options?: any) => any;
}

interface Window {
  TrelloPowerUp: TrelloPowerUp;
}

interface TrelloMember {
  id: string;
  fullName: string;
  username: string;
  avatarUrl?: string; // Trello API usually provides 'avatarHash', we might need to construct URL or it might be provided. Keeping it flexible for now.
  initials?: string;
}

// Placeholder for other Trello entities we might need later
interface TrelloCard {
  id: string;
  name: string;
  // ...
}