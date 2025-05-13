//External Imports
import { useRef } from "react";

//Context
import { useGame } from "@context/game";
import useHandManager from "@utils/useHandManager";

//Components
import WoodenButton from "@components/menuComponents/buttons/woodeButtons/woodenButtons";

//Functions
import { postRequest } from "@utils/fetchRequest";

export default function GameButtons({
  handleNextIndex
} : {
  handleNextIndex: () => void;
}) {
  const { gameState, buttonPhaseMap } = useGame();
  const { parseGameData } = useHandManager();
  const phasedButtons = buttonPhaseMap[gameState];
  const isPosting = useRef(false);

  async function postPlayerActions(link: string) {
    console.log(isPosting)
    if (isPosting.current) return;
    isPosting.current = true;
    
    try {
      const data = await postRequest(link)
      parseGameData(data);
    } catch (error) {
      console.error(`Fetch hand error: ${ error.message }`)
    } finally {
      isPosting.current = false;
    }
  };

  const buttonConfig: Record<string, {
    action: () => void;
    label: string;
    shortLabel: string;
  }> = {
    "next": {
      action: () => handleNextIndex(),
      label: "Next",
      shortLabel: "Next",
    },
    "wager": {
      action: () => postPlayerActions("/api/v1/hands"),
      label: "Wager",
      shortLabel: "Wager",
    },
    "hit": {
      action: () => console.log("hit"),
      label: "Hit",
      shortLabel: "Hit",
    },
    "stand": {
      action: () => console.log("stand"),
      label: "Stand",
      shortLabel: "Stand",
    },
    "double_down": {
      action: () => console.log("double down"),
      label: "Double Down",
      shortLabel: "2x",
    },
    "surrender": {
      action: () => console.log("surrender"),
      label: "Surrender",
      shortLabel: "Surr.",
    }
  }

  return(
    <div className={ `w-full grid grid-cols-${ phasedButtons.length } game-buttons-container` }>
      { phasedButtons.map((key) => {
        const config = buttonConfig[key];

        return(  
          <WoodenButton
            key={ key }
            action={ config.action }
          >
            <span className="hidden sm:inline">
              { config.label }
            </span>
            <span className="sm:hidden">
              { config.shortLabel }
            </span>
          </WoodenButton>
        )
      })}
    </div>
  )
}