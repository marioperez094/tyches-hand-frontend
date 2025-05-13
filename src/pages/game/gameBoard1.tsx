//External Imports
import { useEffect } from "react";

//Components
import GameButtons from "./gameButtons";
import useIntroManager from "@utils/useIntroManager";
import Table from "@components/gameAssets/table/table";
import Daimon from "@components/gameAssets/daimon/daimon";
import DialogueBox from "@components/gameAssets/dialogue/dialogueBox";
import WagerBottle from "@components/gameAssets/wagerBottle/wagerBottle";

//Context
import { DaimonType, useGame } from "@context/game";
import { useAnimationManager } from "@context/animation";

//Types
import { PlayerType } from "@utils/types";
import HealthStatus from "../../components/gameAssets/healthBar/healthStatus";

export default function GameBoard({
  player,
  daimon
} : {
  player: PlayerType;
  daimon: DaimonType;
}) {
  const {
    wager,
    gameState,
    showAssets,
  } = useGame();
  const { dialogue } = daimon;
  const { runIntro } = useIntroManager();
  const { animationState } = useAnimationManager();

  return(
    <div className={ `w-screen h-screen relative flex justify-center items-center ${ animationState.player }` }>
      <div id="game-board">
        <div
          className="flex justify-center daimon-health-status transition-opacity"
          style={{ opacity: showAssets.health ? "1" : "0" }}
        >
          <HealthStatus
            name={ daimon.name }
            health={ daimon.blood_pool }
            maxHealth={ daimon.max_blood_pool }
            isPlayer={ false }
          />
        </div>
        <div 
          className="relative w-full flex justify-center daimon-eye transition-opacity"
          style={{ opacity: showAssets.eye ? "1" : "0" }}
        >
          <Daimon
            animation={ animationState.daimon }
            effectType={ daimon.effect_type }
            tychesWrath={ daimon?.tyches_wrath }
          />
        </div>
        <div
          className="flex w-full justify-center table transition-opacity"
          style={{ opacity: showAssets.table ? "1": "0" }} 
        >
          <Table
            discardHand={ animationState.cards }
          />
        </div>
        <section className="grid grid-cols-2 player-section">
          <div
            className="flex justify-center player-health-status transition-opacity"
            style={{ opacity: showAssets.health ? "1" : "0" }}
          >
            <HealthStatus
              name={ player.username }
              health={ player.blood_pool }
              maxHealth={ player.max_blood_pool }
              isPlayer={ true }
            />
          </div>
          { currentLineIndex > -1 &&
            <div 
              className="absolute dialogue-container transition-opacity"
              style={{ opacity: currentLineIndex > -1 ? "1" : "0" }}
            >
              <DialogueBox
                dialogueLine={ daimon.dialogue[currentLineIndex]}
              />
            </div>
          }
        </section>
        <div 
          className="absolute top-1/2 right-2 md:right-20"
          style={{ opacity: showAssets.health ? "1" : "0" }}
        >
          <WagerBottle
            wager={ wager }
          />
        </div>
        <GameButtons
          handleNextIndex={ handleLineIndex }
        />
      </div>
    </div>
  )
};

/*

function GameButtons({ 
  handleNextIndex 
} : { 
  handleNextIndex: () => void;
}) {
  const { showAssets, setAssetVisibility, currentLineIndex } = useGame(); 
  
  if (currentLineIndex > -1) return(
    <div className="w-full flex justify-center single-game-buttons">
      <WoodenButton
        action={ () => handleNextIndex() }
      >
        Next
      </WoodenButton>
    </div>
  )

  if (showAssets.wager) return(
    <div className="w-full flex justify-center single-game-buttons">
      <WoodenButton
        action={ () => {
          setAssetVisibility("wager", false);
          setAssetVisibility("hit", true);
          setAssetVisibility("stand", true);
          setAssetVisibility("double_down", true);
          setAssetVisibility("surrender", true);
        } }
      >
        Wager
      </WoodenButton>
    </div>
  );

  return(
    <div className="grid grid-cols-4 w-full">
      <div>
        { showAssets.hit &&
          <WoodenButton
            action={ () => console.log("hi") }
          >
            Hit
          </WoodenButton>
        }
      </div>
      <div>
        { showAssets.stand &&
          <WoodenButton
            action={ () => console.log("hi") }
          >
            Stand
          </WoodenButton>
        }
      </div>
      <div>
        { showAssets.double_down &&
          <WoodenButton
            action={ () => console.log("hi") }
          >
            <span className="hidden sm:inline">
              Double Down
            </span>
            <span className="sm:hidden">
              2x
            </span>
          </WoodenButton>
        }
      </div>
      <div>
        { showAssets.surrender &&
          <WoodenButton
            action={ () => console.log("hi") }
          >
            <span className="hidden sm:inline">
              Surrender
            </span>
            <span className="sm:hidden">
              Surr
            </span>
          </WoodenButton>
        }
      </div>
    </div>
  )
}*/