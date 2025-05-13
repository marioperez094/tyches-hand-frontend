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

export interface TokenType {
  id: number;
  name: string;
  rune: string;
  description: string;
  effect_type: string;
  inscribed_effect: string;
  oathbound_effect: string;
  offering_effect: string;
  lore_token: string;
  
}

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
  Standard: DeckStatType;
  Exhumed: DeckStatType;
  Charred: DeckStatType;
  Fleshwoven: DeckStatType;
  Blessed: DeckStatType;
  Bloodstained: DeckStatType;
};

export interface DeckStatType {
  count: number;
  description: string;
  effect_description: string;
};

export interface SlotType {
  id: number;
  slot_type: string;
  token: TokenType;
}