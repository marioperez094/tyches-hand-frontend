//External Imports
import { ReactNode } from "react";

//Context
import { usePlayer } from "../../../context/player";

//Components
import GuestMessage from "./guestMessage";
import DeckStats from "./deckStats";
import SubHeaders from "../../../components/headers/subHeaders/subHeaders";
import { HealthBarWithName } from "../../../components/gameAssets/healthBar/healthBar";

//Types
import { DeckStatsType, PlayerType } from "../../../utils/types";

export default function PlayerCollections() {
  const { player } = usePlayer();
  const { username, blood_pool, is_guest, deck } = player as PlayerType;
  const { name } = deck as DeckStatsType;

  return(
    <>
      { is_guest && <GuestMessage /> }
      <div className="mx-auto my-3">
        <HealthBarWithName
          name={ username }
          health={ blood_pool }
          isPlayer
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 py-2">
        <PlayerStatSection>
          <CollectionDetails name={ name }>
            <DeckStats cardStats={ deck } />
          </CollectionDetails>
        </PlayerStatSection>
      </div>
    </>
  )
};

function PlayerStatSection({ children }: { children: ReactNode }) {
  return <section className="mx-auto w-full player-info-container">{ children }</section>
};

function CollectionDetails({ 
  name, 
  children 
} : {
  name: string;
  children: ReactNode;
}) {
  return(
    <>
      <SubHeaders isHeading>{ name }</SubHeaders>
      <ul className="grid grid-cols-2 md:block">
        { children }
      </ul>
    </>

  )
};