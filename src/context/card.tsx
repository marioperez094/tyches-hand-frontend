// External Imports
import { createContext, ReactNode, useContext, useState } from "react";

// Functions
import useItemManager from "../utils/useItemManager";

// Types
import { CardType } from "../utils/types";

interface CardContextType {
  deck: CardType[];
  collectionCards: CardType[];
  handleMoveCards: (items: CardType[], isMovingToCollections: boolean) => void;
  sortCardsByRank: () => void;
  clearDeck: () => void;
  fillDeck: (filteredCollectionCards: CardType[]) => void;
  setDeck: React.Dispatch<React.SetStateAction<CardType[]>>;
  setCollectionCards: React.Dispatch<React.SetStateAction<CardType[]>>;
}

//Ensure TypeScript enforces `CardProvider` usage
const CardContext = createContext<CardContextType | null>(null);

function CardProvider({ children }: { children: ReactNode }) {
  const [deck, setDeck] = useState<CardType[]>([]);
  const [collectionCards, setCollectionCards] = useState<CardType[]>([]);

  console.log("render cardContext");
  console.log("deck:", deck.length);
  console.log("collectionCards:", collectionCards.length);

  const { moveItems, clearLoadout } = useItemManager();

  function handleMoveCards(items: CardType[], isMovingToCollections: boolean): void {
    const [source, target, setSource, setTarget] = isMovingToCollections
      ? [deck, collectionCards, setDeck, setCollectionCards]
      : [collectionCards, deck, setCollectionCards, setDeck];

    //Updates array after cards are moved
    const { updatedSource, updatedTarget } = moveItems(source, target, items);
    setSource(updatedSource);
    setTarget(updatedTarget);
  }

  function sortCardsByRank(): void {
    const rankOrder: Record<string, number> = {
      Jack: 11,
      Queen: 12,
      King: 13,
      Ace: 15,
    };

    function sortedCards(cards: CardType[]): CardType[] {
      return cards.slice().sort((a, b) => {
        const rankA = rankOrder[a.rank] || parseInt(a.rank);
        const rankB = rankOrder[b.rank] || parseInt(b.rank);
        return rankA - rankB;
      });
    }

    setDeck(sortedCards(deck));
    setCollectionCards(sortedCards(collectionCards));
  }

  function clearDeck(): void {
    const { updatedSource, updatedTarget } = clearLoadout(deck, collectionCards);
    setDeck(updatedSource);
    setCollectionCards(updatedTarget);
  }

  function fillDeck(filteredCollectionCards: CardType[]): void {
    const missingCards: number = 52 - deck.length;
    const fillingCards: CardType[] = filteredCollectionCards.slice(0, missingCards);
    handleMoveCards(fillingCards, false);
  }

  return(
    <CardContext.Provider
      value={{
        deck,
        collectionCards,
        handleMoveCards,
        sortCardsByRank,
        clearDeck,
        fillDeck,
        setDeck,
        setCollectionCards,
      }}
    >
      { children }
    </CardContext.Provider>
  )
};

function useCard(): CardContextType {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useCard must be used within a CardProvider");
  }
  return context;
}

export { CardProvider, useCard };
