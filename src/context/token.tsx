//External Imports
import { createContext, ReactNode, useContext, useState } from "react";

//Types
import { SlotType, TokenType } from "../utils/types";
import useItemManager from "../utils/useItemManager";

interface TokenContextType {
  slots: SlotType[];
  collectionTokens: TokenType[];
  handleMoveTokens: (items: TokenType[], isMovingToCollections: boolean) => void;
  setSlots: React.Dispatch<React.SetStateAction<SlotType[]>>;
  setCollectionTokens: React.Dispatch<React.SetStateAction<TokenType[]>>;
  clearSlots: () => void;
  sortTokensByEffect: () => void;
}

const TokenContext = createContext<TokenContextType | null>(null);

function TokenProvider({ children } : { children: ReactNode }) {
  const [slots, setSlots] = useState<SlotType[]>([]);
  const [collectionTokens, setCollectionTokens] = useState<TokenType[]>([]);

  console.log("render TokenContext");
  console.log("collectionTokens: ", collectionTokens.length);
  console.log("slots: ", slots)

  function handleMoveTokens(item: TokenType, target: string | number): void {
    const targetSlot = typeof target === "number" ? slots.find(slot => slot.id === target) : null;
    const currentSlot = slots.find(slot => slot.token?.id === item.id);

    setSlots(prevSlots =>
      prevSlots.map(slot => {
        //If moving from one slot to another
        if (currentSlot && slot.id === currentSlot.id) {
          return { ...slot, token: null }; // Remove from previous slot
        }
        if (targetSlot && slot.id === targetSlot.id) {
          return { ...slot, token: item }; // Add to new slot
        }
        return slot;
      })
    );

    if (target === "Collection") {
      //Moving from slot to collection
      if (currentSlot) {
        setCollectionTokens(prevCollection => [...prevCollection, item]);
      }
    } 
    else if (targetSlot) {
      //Moving from collection to a slot
      setCollectionTokens(prevCollection => prevCollection.filter(token => token.id !== item.id));
    };
  };

  function sortTokensByEffect(): void {
    setCollectionTokens(prevState =>
      [...prevState].sort((a, b) => a.effect_type.localeCompare(b.effect_type))
    );
  };

  function clearSlots(): void {
    const tokens = slots
      .filter(slot => slot.token)
      .map(slot => slot.token);

    setSlots(prevSlots =>
      prevSlots.map(slot => ({ ...slot, token: null }))
    );

    setCollectionTokens(prevCollection => [...prevCollection, ...tokens]);
  };
  

  return(
    <TokenContext.Provider
      value={{
        slots,
        collectionTokens,
        setSlots,
        setCollectionTokens,
        sortTokensByEffect,
        clearSlots,
        handleMoveTokens,
      }}
    >
      { children }
    </TokenContext.Provider>
  )
};

function useToken(): TokenContextType {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};

export { TokenProvider, useToken }
