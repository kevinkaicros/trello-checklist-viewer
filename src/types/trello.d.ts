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
  avatarUrl?: string;
  initials?: string;
}

interface TrelloCheckItem {
  id: string;
  name: string;
  state: string;
}

interface TrelloChecklist {
  id: string;
  name: string;
  checkItems: TrelloCheckItem[];
}

interface TrelloCard {
  id: string;
  name: string;
  labels: { name: string }[];
  checklists: TrelloChecklist[];
}
