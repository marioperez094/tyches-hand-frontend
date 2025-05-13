//External Imports
import { createContext, useContext, useState } from "react";

//Types
import { CardType } from "@utils/types";

const GameContext = createContext(undefined);

function GameProvider({ children } : { children: React.ReactNode }) {
  const [phase, setPhase] = useState("intro");
  const [daimon, setDaimon] = useState(null);

  return(
    <GameContext.Provider value={{
      phase,
      setPhase,
      daimon,
      setDaimon,
    }}>
      { children }
    </GameContext.Provider>
  )
};

function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

export { GameProvider, useGame };