interface TrelloPowerUp {
  initialize: (capabilities: Record<string, (t: TrelloInstance) => unknown>) => void;
  iframe: (options?: Record<string, unknown>) => TrelloInstance;
}

interface TrelloInstance {
  board: (...fields: string[]) => Promise<Record<string, unknown>>; // Result structure varies by field
  cards: (...fields: string[]) => Promise<TrelloCard[]>;
  modal: (options: Record<string, unknown>) => Promise<void>;
  get: (scope: string, visibility: string, key: string) => Promise<unknown>;
  set: (scope: string, visibility: string, key: string, value: unknown) => Promise<void>;
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
  members: TrelloMember[];
}
