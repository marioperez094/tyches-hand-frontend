//Components
import Token from "../token/token";
import HoverText from "../../headers/hoverText/hoverText";

//Types
import { SlotType, TokenType } from "../../../utils/types";

//Stylesheets
import "./tokenSlots.scss";

export default function TokenSlots({
  slots, 
  selectedToken,
  handleTokenTap,
  handleSlotTap
}: {
  slots: SlotType[];
  selectedToken?: TokenType | null;
  handleTokenTap?: (token: TokenType) => void;
  handleSlotTap: (target: string | number | null) => void;
}) {
  const groupedSlots = slots.reduce((acc, slot) => {
    acc[slot.slot_type] = acc[slot.slot_type] || [];
    acc[slot.slot_type].push(slot);
    return acc;
  }, {});

  return(
    <div 
      className="sticky bottom-0 flex justify-center items-center overflow-x-auto overflow-y-visible pl-50 sm:pl-0"
      id="slot-container"
    >
      { Object.entries(groupedSlots).map(([type, slotList]) => (
        <SlotGroup
          key={ type }
          title={ type }
          selectedToken={ selectedToken }
          clickToken={ (token, type) => handleTokenTap(token, type) }
          handleSlotTap={ (target) => handleSlotTap(target) }
          slots={ slotList }
        />
      ))}
    </div>
  )
};

function SlotGroup({
  title,
  selectedToken = null,
  handleSlotTap = null,
  clickToken,
  slots
} : {
  title?: string;
  selectedToken?: TokenType | null;
  handleSlotTap?: (target: string | number | null) => void | null;
  clickToken: (token: TokenType) => void;
  slots: SlotType[];
}) {
  return(
    <div className="slot-group">
      { title &&
        <div className="w-full flex justify-center">
          <h3 className="slot-title text-center">
            { title }
          </h3>
        </div>
      }

      <div className="flex justify-center">
        { slots.map((slot) => {
          const { id, token } = slot;

          return(
            <div 
              key={ id }
              className="flex justify-center items-center slot"
              onClick={ () => handleSlotTap(id) }
            >
              <TokenSocket 
                token={ token }
                slot={ slot }
                selectedToken={ selectedToken } 
                clickToken={ clickToken }
              />
            </div>
          )
        })}
      </div>
    </div>
  )
};

function TokenSocket({ token, slot, selectedToken, clickToken } : { token: TokenType, slot: SlotType, seletedToken: TokenType, clickToken: (token: TokenType) => void; }) {
  if (!token) return <div className="socket" />

  const { id } = token;
  const isSelected = selectedToken?.id === id;

  return(
    <div
      key={ id }
      className={ `${ isSelected ? "selected-token": "" }` }
      onClick={ () => clickToken(token, slot.id) }
    >
      <Token token={ token } />
    </div>
  )

};