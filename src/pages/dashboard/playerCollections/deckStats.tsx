//External Imports
import { useMemo } from "react";

//Context;
import { DeckBreakdownType } from "../../../context/player";

export default function DeckStats({ deckBreakdown } : DeckBreakdownType) {
  const revealedDecks = useMemo(() => {
    return Object.entries(deckBreakdown)
      .filter(([_, info]) => info > 0 || info.count > 0)
  }, [deckBreakdown])
};