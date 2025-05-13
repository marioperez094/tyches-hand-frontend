//Context
import { useGame } from "@context/game";

//Components
import Card from "@components/gameAssets/card/card";
import WoodenPanel from "@components/gameAssets/panels/woodenPanel";

//Types
import { CardType } from "@utils/types";

//Styles
import "./table.scss";
import { useAnimationManager } from "../../../context/animation";

export default function Table({ discardHand }: { discardHand: string }) {
  const { daimonHand, playerHand } = useGame();

  return(
    <div className="table-container">
      <div className="relative table-surface flex flex-col justify-center items-center">
        <PerspectiveCards 
          cards={ daimonHand }
          owner={ "daimon" }
        />
        <PerspectiveCards
          cards={ playerHand }
          owner={ "player" }
        />
      </div>
      <div className="table-edge">
        <WoodenPanel>
          <WoodenPanel>
          </WoodenPanel>
        </WoodenPanel>
      </div>
    </div>
  )
};

function PerspectiveCards({ 
  cards,
  owner 
} : { 
  cards: CardType,
  owner: string
}) {
  const { animationState } = useAnimationManager();
  return(
    <div className={ `flex justify-center ${ owner }-cards-stack` }>
      { cards.length > 0 &&
        cards.map((card, index) => (
          <div className={ `overlap-cards ${ animationState.cards }` }>
            <div 
              className="perspective-card"
              key={ index + 10 } 
            >
              <Card
                card={ card }
                isFlipped={ card.isFlipped }
              />
            </div>
          </div>
        ))
      }
    </div>
  )
}