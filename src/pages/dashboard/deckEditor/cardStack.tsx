// External Imports
import { useMemo } from "react";

// Components
import Card from "../../../components/gameAssets/card/card";
import HoverText from "../../../components/headers/hoverText/hoverText";

// Types
import { CardType } from "../../../utils/types";

interface CardStackProps {
  cards: CardType[];
  selectedCard: CardType | null;
  handleCardTap: (card: CardType) => void;
  handleDeckTap: () => void;
}

export default function CardStack({
  cards,
  selectedCard,
  handleCardTap,
  handleDeckTap,
}: CardStackProps) {
  //Memoized card elements
  const cardElements = useMemo(
    () =>
      cards.map((card, index) => {
        const isSelected = selectedCard?.id === card.id;

        return (
          <div
            className={ `overlap-cards ${ isSelected ? "selected-card" : "" }` }
            key={ card.id }
            onClick={ () => handleCardTap(card) }
            style={{ animationDelay: `${ index * 0.05 }s` }}
          >
            <HoverText name={ card.name } description={ card.description } effectDescription={[ card.effect_description ]}>
              <Card card={ card } />
            </HoverText>
          </div>
        );
      }),
    [cards, selectedCard, handleCardTap]
  );

  return (
    <div
      className="w-full flex items-center justify-start overflow-x-scroll card-stack"
      onClick={ handleDeckTap }
    >
      { cardElements }
    </div>
  );
}
