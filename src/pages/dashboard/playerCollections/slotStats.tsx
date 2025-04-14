//Context
import { useToken } from "../../../context/token"

//Components
import SubHeaders from "../../../components/headers/subHeaders/subHeaders";

const slotDescription = {
  Inscribed: {
    description: "A promise that was never meant to be broken. But such promises often carry little weight.", 
    effect_description: "Tokens brand themselves in this slot, though not as strong their power is consistent."
  },
  Oathbound: {
    description: "Words were spoken and actions taken, but not all actions last forever.",
    effect_description: "Tokens shine bright in this slot, though they may dim their strength will renew."
  }, 
  Offering: {
    description: "At times the best opportunities come with the greatest sacrifices.",
    effect_description: "Tokens burn bright in this slot, but such strength can lead to destruction."
  }
};

export default function SlotStats() {
  const { slots } = useToken();

  return(
    <>
      { slots.map((slot) =>
        <li key={ slot.id } className="w-full flex flex-col justify-between">
          <SubHeaders isHeading={ false }>
            <p className={ `${ slot.slot_type }-text` }>{ slot.slot_type }: { slot.token?.name || "Empty" }</p>
          </SubHeaders>
        </li>
      )}
    </>
  )
};