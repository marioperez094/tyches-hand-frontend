//External Imports
import { createContext, useContext, useState } from "react";


//Types
export interface PlayerType {
  username: string;
  is_guest: boolean;
  blood_pool: number;
  tutorial_finished: boolean;
  games_played: number;
};

type DeckInfo = {
  count: number;
  description: string;
  effect_description: string;
}

export type DeckBreakdownType = {
  [key:string]: DeckInfo;
};

export type GameStats = {
  games_played: number;
  hands_won: number;
  hands_lost: number;
  current_streak: number;
  longest_win_streak: number;
};

export type SlotType = {
  id: number;
  slot_type: string;
  token: null | {
    id: number;
    name: string;
    rune: string;
    description: string;
  };
};
  
type StatType = {
  deck_breakdown: DeckBreakdownType | {};
  game_stats: GameStats | {};
  slots: SlotType[] | {};
};

interface PlayerContextType {
  player: PlayerType;
  stats: StatType | null;
  setStatSummary: (playerSummary: PlayerType & StatType) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [player, setPlayer] = useState<PlayerType>({
    username: "",
    is_guest: false,
    blood_pool: 5000,
    tutorial_finished: false,
    games_played: 0
  });

  const [stats, setStats] = useState<StatType | null>(null)

  function setStatSummary(playerSummary: PlayerType & StatType) {
    const { deck_breakdown, game_stats, slots, ...player } = playerSummary

    //Deconstructs player summary to save between stats and player
    setStats({
      deck_breakdown: deck_breakdown,
      game_stats: game_stats,
      slots: slots
    });

    setPlayer(player);
  };

  return (
    <PlayerContext.Provider value={{ player, stats, setStatSummary }}>
      {children}
    </PlayerContext.Provider>
  );
}

function usePlayer(): PlayerContextType {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}

export { PlayerProvider, usePlayer };
