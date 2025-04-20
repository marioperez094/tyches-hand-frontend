//External Imports
import { useEffect, useState, MouseEvent } from "react";

//Components
import TokenStack from "./tokenStack";
import ItemContainer from "../deckEditor/itemContainer";
import EditorButtons from "../../../components/menuComponents/editorButtons/editorButtons";
import TokenSlots from "../../../components/gameAssets/tokenSlots/tokenSlots1";

//Context
import { useToken } from "../../../context/token";

//Functions
import { useSelectItem } from "../../../utils/useSelectItem";
import { putRequest } from "../../../utils/fetchRequest";

export default function TokenEditor() {
  const { collectionTokens, handleMoveTokens, clearSlots, sortTokensByEffect } = useToken();
  const { selectedItem, source, setSelectedItem, setSource, handleItemTap } = useSelectItem();
  const [message, setMessage] = useState<string | null>(null);

  function handleSlotTap(target: string | number) {
    if (!selectedItem || target === source) return;

    handleMoveTokens(selectedItem, target);
    setSelectedItem(null);
    setSource(null);
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    };
  }, [message]);

  function submitSlots(e: MouseEvent<HTMLButtonElement>) {
    if (e) e.preventDefault();

    const convertToTokenID = slots
      .map(slot => ({ id: slot.id, token_id: slot.token?.id }));

    const payload = { slots: [...convertToTokenID] };

    putRequest<{ success: true }>("/api/v1/slots/update_tokens", payload)
      .then(data => {
        if (data.success) return setMessage("Token Slots Saved!");
      })
      .catch(error => setMessage(error.message));
  };

  return(
    <>
      <EditorButtons 
        message={ message }
        buttons={[
          { name: "Save Slots", action: submitSlots },
          { name: "Sort Tokens", action: sortTokensByEffect },
          { name: "Clear Slots", action: clearSlots }
        ]}
      />
      <section className="mx-auto mt-3 sm:mt-5 lg:mt-10" id="token-editor">
        <ItemContainer
          title={ `Collections ${ collectionTokens.length }` }
        >
          <TokenStack
            selectedToken={ selectedItem }
            handleTokenTap={ (token) => handleItemTap(token, "Collection") }
            handleSlotTap={ () => handleSlotTap("Collection") }
            tokens={ collectionTokens }
          />
        </ItemContainer>
        <TokenSlots
          selectedToken={ selectedItem }
          handleTokenTap={ (token, source) => handleItemTap(token, source) }
          handleSlotTap={ (target) => handleSlotTap(target) }
          slots={ slots }
        />
      </section>
    </>
  )
};

const slots = [{
  id: 1,
  slot_type: "Inscribed",
  token: {
    id: 1,
    name: 'Red Tearstone Token',
    rune: 'O',
    effect_type: "damage", 

  }
}, {
  id: 2,
  slot_type: "Oathbound",
  token: {
    id: 1,
    name: 'Eye of Tyche',
    rune: 'P',
    effect_type: "Utility", 
    
  }
}, {
  id: 3,
  slot_type: "Oathbound", 
}, {
  id: 4,
  slot_type: "Offering"
}, {
  id: 5,
  slot_type: "Offering"
}, {
  id: 6,
  slot_type: "Offering"
}]