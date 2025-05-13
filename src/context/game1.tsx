//External Imports
import { createContext, useContext, useState } from "react";

//Types
import { CardType } from "@utils/types";

export enum GameState {
  Introduction = "INTRODUCTION",
  Dialogue = "DIALOGUE",
  Idle = "IDLE",
  Wager = "WAGER",
  Playing = "PLAYING",
  Ending = "ENDING",
  Intermission = "INTERMISSION",
};

export interface DaimonType {
  name: string,
  rune: string,
  blood_pool: number,
  max_blood_pool: number,
  intro: string[],
  dialogue?: string[],
  effect_type: string,
  tyches_wrath: boolean;
};

interface GameContextType {
  gameState: GameState;
  setGameState: (gameState: GameState) => void;
  daimon: DaimonType | null;
  setDaimon: (daimon: DaimonType) => void;
  setDaimonHealth: (blood_pool: number) => void;
  setDaimonDialogue: (dialogue: string[]) => void;
  wager: number;
  setWager: (wager: number) => void;
  showAssets: AnimationType;
  setAssetVisibility: (key: string, bool: boolean) => void;
  daimonHand: CardType[] | [];
  setDaimonHand: (card: CardType) => void;
  playerHand: CardType[] | [];
  setPlayerHand: (card: CardType) => void;
  buttonPhaseMap: Record<string, string[]>;
};

interface AnimationType {
  eye: boolean;
  table: boolean;
  health: boolean;
  gameButtons: string[];
}

const defaultAnimationState: AnimationType = {
  eye: false,
  table: false,
  health: false,
  gameButtons: ["next"]
};

const GameContext = createContext<GameContextType | undefined>(undefined);

function GameProvider({ children } : { children: React.ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(GameState.Introduction);
  
  const [daimon, setDaimon] = useState<DaimonType | null>(null);
  const [wager, setWager] = useState<number>(0);

  const [daimonHand, setDaimonHand] = useState<CardType[] | []>([]);
  const [playerHand, setPlayerHand] = useState<CardType[] | []>([]);

  const [showAssets, setShowAssets] = useState<AnimationType>(defaultAnimationState);

  function setAssetVisibility(key: string, bool: boolean) {
    setShowAssets(prev => ({ ...prev, [key]: bool}));
  };

  function setDaimonHealth(blood_pool: number) {
    setDaimon(daimon => {
      if (!daimon) return daimon;

      return {
        ...daimon,
        blood_pool
      }
    });
  };

  function setDaimonDialogue(dialogue: string[]) {
    setDaimon(daimon => {
      if (!daimon) return daimon;

      return {
        ...daimon,
        dialogue
      }
    });
  };

  const buttonPhaseMap: Record<string, string[]> = {
    INTRODUCTION: ["next"],
    DIALOGUE: ["next"],
    WAGER: ["wager"],
    IDLE: [],
    PLAY: showAssets.gameButtons
  }
  
  return(
    <GameContext.Provider value={{
      gameState,
      setGameState,
      daimon,
      setDaimon,
      setDaimonHealth,
      setDaimonDialogue,
      wager,
      setWager,
      showAssets,
      setAssetVisibility,
      daimonHand,
      setDaimonHand,
      playerHand,
      setPlayerHand,
      buttonPhaseMap,
    }}>
      { children }
    </GameContext.Provider>
  )
};

function useGame(): GameContextType {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a PlayerProvider");
  }
  return context;
};

export { GameProvider, useGame };