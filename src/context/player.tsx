//External Imports
import { createContext, ReactNode, useContext, useState } from "react";

//Context
import { useCard } from "./card";
import { useToken } from "./token";

//Functions
import { getRequest } from "../utils/fetchRequest";

//Types
import { CardType, PlayerType, SlotType, TokenType } from "../utils/types";

interface PlayerContextType {
  player: PlayerType | null;
  fetchPlayer: (options?: FetchPlayerOptions) => void;
}

interface FetchPlayerOptions {
  deck_stats?: boolean;
  deck_cards?: boolean;
  collection_cards?: boolean;
  collection_tokens?: boolean;
  slots?: boolean;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

function PlayerProvider({ children }: { children: ReactNode }) {
  const { setDeck, setCollectionCards } = useCard();
  const { setSlots, setCollectionTokens } = useToken();
  const [player, setPlayer] = useState<PlayerType | null>(null);

  console.log("render PlayerProvider");
  console.log("player:", player);

  function fetchPlayer({
    deck_stats = false,
    deck_cards = false,
    collection_cards = false,
    collection_tokens = false,
    slots = false,
  }: FetchPlayerOptions = {}): void {
    const queryParams = new URLSearchParams();
    if (deck_stats) queryParams.append("deck_stats", "true");
    if (deck_cards) queryParams.append("deck_cards", "true");
    if (collection_cards) queryParams.append("collection_cards", "true");
    if (collection_tokens) queryParams.append("collection_tokens", "true");
    if (slots) queryParams.append("slots", "true");

    const url = `/api/v1/players/show?${queryParams.toString()}`;

    getRequest<{ player: PlayerType & { deck_cards?: CardType[]; collection_cards?: CardType[]; slots?: SlotType[], collection_tokens?: TokenType[] } }>(url)
      .then((data) => {
        console.log(data);
        const { deck_cards, collection_cards, slots, collection_tokens, ...playerStats } = data.player;
        setPlayer(playerStats);
        if (deck_cards) setDeck(deck_cards);
        if (collection_cards) setCollectionCards(collection_cards);
        if (slots) setSlots(slots);
        if (collection_tokens) setCollectionTokens(collection_tokens);
      })
      .catch((error) => console.error(error.message));
  }

  return (
    <PlayerContext.Provider value={{ player, fetchPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
}

function usePlayer(): PlayerContextType {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}

export { PlayerProvider, usePlayer };
