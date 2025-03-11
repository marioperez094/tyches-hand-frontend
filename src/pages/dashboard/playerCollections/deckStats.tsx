//External Imports
import { useMemo } from "react";

//Components
import SubHeaders from "../../../components/headers/subHeaders/subHeaders";
import HoverText from "../../../components/headers/hoverText/hoverText";
import { DeckStatsType } from "../../../utils/types";

interface DeckStatsProps {
  cardStats: DeckStatsType | {};
}

export default function DeckStats({ cardStats }: DeckStatsProps) {
  console.log('card stats: ', cardStats)
  const revealedDecks = useMemo(() => {
    return Object.entries(cardStats)
      .filter(([deckType, info]) => info > 0 || info.count > 0 )
      .map(([deckType, info]) => ({
        name: deckType,
        info,
      }))
  }, [cardStats]);

  console.log("render DeckStats");

  //Ensure correct calculation of missing decks
  const missingDecks = Math.max(0, Object.keys(cardStats).length - 1 - revealedDecks.length);

  return (
    <>
      { /* Only shows revealed decks */ }
      { revealedDecks.map((stat) => (
        <DeckType key={ stat.name } stat={ stat } />
      ))}

      { /* Renders missing decks as question marks */ }
      { [...Array(missingDecks)].map((_, index) => (
        <RedactedDeck key={ index } />
      ))}
    </>
  );
}

interface DeckTypeProps {
  name: string;
  info: DeckStatsProps;
}

//DeckType Component
function DeckType({ stat }: { stat: DeckTypeProps}) {
  const { name, info } = stat;
  const { count, description, effect_description } = info;
  console.log("render deckType");
  return (
    <li className="w-full flex flex-col justify-between deck-type-container">
      <SubHeaders isHeading={ false }>
        <HoverText 
          description={ description || "" } 
          effectDescription={ [ effect_description ] }
          isFlipped={ name === "Total" }
        >
          <p className={ `${ name }-text`}>{ name }: { count || info }</p>
        </HoverText>
      </SubHeaders>
    </li>
  );
}

//RedactedDeck Component (No Props)
function RedactedDeck() {
  console.log("render redactedDeck");

  return (
    <li className="relative overflow-hidden redacted">
      <SubHeaders isHeading={ false }>
        <div className="flex justify-center items-center h-full redacted-animation">
          {[...Array(4)].map((_, index) => (
            <div key={ index } className="question-mark">?</div>
          ))}
        </div>
      </SubHeaders>
    </li>
  );
}
