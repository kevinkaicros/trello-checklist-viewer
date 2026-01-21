interface TrelloPowerUp {
  initialize: (capabilities: Record<string, any>) => void;
  iframe: (options?: any) => any;
}

interface Window {
  TrelloPowerUp: TrelloPowerUp;
}
