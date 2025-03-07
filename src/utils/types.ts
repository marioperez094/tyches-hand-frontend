export interface CardType {
  id: number;
  name: string;
  suit: string;
  rank: string;
  description: string;
  effect: string;
  effect_description: string;
  effect_value: string;
};

export interface PlayerType {
  username: string;
  is_guest: boolean;
  blood_pool: number;
  tutorial_finished: boolean;
  deck?: DeckStatsType;
};

export interface DeckStatsType {
  name: string;
  Total: number;
  Standard: number;
  Exhumed: number;
  Charred: number;
  Fleshwoven: number;
  Blessed: number;
  Bloodstained: number;
};