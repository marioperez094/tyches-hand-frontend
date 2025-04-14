//Context
import { usePlayer } from "@context/player";

//Components
import GuestMessage from "./guestMessage";
import SubHeaders from "@components/headers/subHeaders/subHeaders";
import DeckStats from "./deckStats";

export default function PlayerCollections() {
  const { player, stats } = usePlayer();
  const { username, blood_pool, is_guest } = player;
  const { deck_breakdown, game_stats, slots } = stats;

  return(
    <>
      { is_guest && <GuestMessage /> }

      <div className="mx-auto my-3">
        <div className="mx-5 my-5">
          <div className="w-3/4 player-stat-username border-b-4">
            <h2 className="text-xl text-white font-bold ps-5">
              { username }
            </h2>
          </div>
        </div>
      </div>
      <div className="flex w-full lg:grid lg:grid-cols-3 lg:gap-4 py-2 overflow-x-auto snap-x snap-mandatory">
        <PlayerStatSection>
          <CollectionDetails name="Game" >
          </CollectionDetails>
        </PlayerStatSection>
      </div>
    </>
  )
};

function PlayerStatSection({ children }: { children: React.ReactNode }) {
  return <section className="w-full flex lg:block flex-col flex-shrink-0 snap-center player-info-container">{ children }</section>
};

function CollectionDetails({ 
  name, 
  children 
} : {
  name: string;
  children: React.ReactNode;
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