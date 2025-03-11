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
import SlotStats from "./slotStats";

export default function PlayerCollections() {
  const { player } = usePlayer();
  const { username, blood_pool, is_guest, deck, total_tokens } = player as PlayerType;
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
      <div className="flex w-full lg:grid lg:grid-cols-3 lg:gap-4 py-2 overflow-x-auto snap-x snap-mandatory">
        <PlayerStatSection>
          <CollectionDetails name={ name }>
            <DeckStats cardStats={ deck } />
          </CollectionDetails>
        </PlayerStatSection>
        <PlayerStatSection>
          <CollectionDetails name={ `Tokens: ${ total_tokens }` }>
            <SlotStats />
          </CollectionDetails>
        </PlayerStatSection>
      </div>
    </>
  )
};

function PlayerStatSection({ children }: { children: ReactNode }) {
  return <section className="w-full flex lg:block flex-col flex-shrink-0 snap-center player-info-container">{ children }</section>
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
      <ul className="grid grid-cols-1">
        { children }
      </ul>
    </>

  )
};