//External Imports
import { createContext, ReactNode, useContext, useState } from "react";

//Functions
import { getRequest } from "../utils/fetchRequest";
import { useCard } from "./card";

//Types
import { CardType, PlayerType } from "../utils/types";

interface PlayerContextType {
  player: PlayerType | null;
  fetchPlayer: (options?: FetchPlayerOptions) => void;
};

interface FetchPlayerOptions {
  deck_stats?: boolean;
  deck_cards?: boolean;
  collection_cards?: boolean;
  collection_tokens?: boolean;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

function PlayerProvider({ children } : { children: ReactNode }) {
  const { setDeck, setCollectionCards } = useCard();
  const [player, setPlayer] = useState<PlayerType | null>(null);

  console.log("render PlayerProvider")
  console.log("player: ", player)

  function fetchPlayer({
    deck_stats = false,
    deck_cards = false,
    collection_cards = false,
    collection_tokens = false,
  }: FetchPlayerOptions = {}) {
    const queryParams = new URLSearchParams();
    if (deck_stats) queryParams.append("deck_stats", "true");
    if (deck_cards) queryParams.append("deck_cards", "true");
    if (collection_cards) queryParams.append("collection_cards", "true");
    if (collection_tokens) queryParams.append("collection_tokens", "true");

    const url =`/api/players/show?${ queryParams.toString() }`;

    getRequest<{ player: PlayerType & { deck_cards?: CardType[]; collection_cards?: CardType[] } }>(url)
      .then(data => {
        console.log(data);
        const { deck_cards, collection_cards, ...playerStats } = data.player;
        setPlayer(playerStats);
      })
      .catch(error => console.error(error.message));
  };

  return(
    <PlayerContext.Provider value={{ player, fetchPlayer }}>
      { children }
    </PlayerContext.Provider>
  )
};

function usePlayer() {
  return useContext(PlayerContext);
};

export { PlayerProvider, usePlayer };