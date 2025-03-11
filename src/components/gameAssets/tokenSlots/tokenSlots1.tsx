//Types
import { SlotType, TokenType } from "../../../utils/types";
import HoverText from "../../headers/hoverText/hoverText";
import Token from "../token/token";

//Stylesheets
import "./tokenSlots.scss";

export default function TokenSlots({ slots, selectedToken, handleTokenTap, handleSlotTap }: { slots: SlotType[]; selectedToken?: TokenType; handleTokenTap }) {
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
  }
  
  const groupedSlots = slots.reduce((acc, slot) => {
    acc[slot.slot_type] = acc[slot.slot_type] || [];
    acc[slot.slot_type].push(slot);
    return acc;
  }, {});

  return(
    <div className="sticky bottom-0 flex flex-nowrap justify-center items-center overflow-x-auto pl-50 sm:pl-0" id="slot-container">
      {Object.entries(groupedSlots).map(([type, slotList]) => (
        <SlotGroup
          key={type}
          title={ type }
          selectedToken={ selectedToken }
          clickToken={ (token, type) => handleTokenTap(token, type) }
          handleSlotTap={ (target) => handleSlotTap(target) }
          description={ slotDescription[type].description }
          effect_description={ slotDescription[type].effect_description }
          slots={ slotList }
        />
      ))}
    </div>
  )
};

function SlotGroup({ title, selectedToken = null, handleSlotTap, clickToken, description, effect_description, slots }: { title?: string; description: string; effect_description: string; slots: SlotType[]}) {
  return(
    <div 
      className="slot-group"
    >
      { title &&
        <div className="w-full flex justify-center">
          <HoverText
            name={ title }
            description={ description }
            effectDescription={ [effect_description] }
          >
            <h3 className="slot-title text-center">
              { title }
            </h3>
          </HoverText>
        </div>
      }
      <div className="flex justify-center">
        { slots.map((slot) => {
          const { id, slot_type, token } = slot;

          if (!token) { 
            return(
              <div 
                key={ id } 
                className="flex justify-center items-center slot"
                onClick={ () => handleSlotTap(slot.id) }
              >
                <div className="socket" />
              </div>
            )
          } 

          
          const { name, description } = token;
          const isSelected = selectedToken?.id === token.id
          const slotTypeToEffect = `${ slot_type.toLowerCase() }_effect`; //Used to select appropriate token effect description
          const effectDescription = token[slotTypeToEffect];
          
          return(
            <div  
              key={ id }
              className={ `flex justify-center items-center slot ${ isSelected ? "selected-token" : ""}` }
              onClick={ () => clickToken(token, slot.id)}
            >
              <HoverText name={ name } description={ description } effectDescription={ [effectDescription] }>
                <Token token={ token } /> 
              </HoverText>
            </div>
          )
        })}
      </div>
    </div>
  )
};