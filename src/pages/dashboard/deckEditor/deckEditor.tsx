//External Imports
import { useState, useEffect, useMemo, MouseEvent } from "react";

//Context 
import { usePlayer } from "../../../context/player";
import { useCard } from "../../../context/card";

//Components
import StandardButton from "../../../components/menuComponents/buttons/standardButton";
import Notification from "../../../components/headers/notification/notification";
import CardStack from "./cardStack";
import DeckNamer from "./deckNamer";
import ItemContainer from "./itemContainer";
import FilterInputs from "./filterInputs";

//Functions 
import { putRequest } from "../../../utils/fetchRequest";
import { filterGivenCards } from "../../../utils/utils";
import { useSelectItem } from "../../../utils/useSelectItem";
import EditorButtons from "../../../components/menuComponents/editorButtons/editorButtons";

export default function DeckEditor() {
  console.log("render deckEditor")

  const { player } = usePlayer();
  const { deck, collectionCards, handleMoveCards, sortCardsByRank, clearDeck, fillDeck } = useCard();
  const { selectedItem, setSelectedItem, source, setSource, handleItemTap } = useSelectItem();
  const [message, setMessage] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    "High cards": true,
    "Low cards": true,
    Exhumed: true,
    Charred: true,
    Fleshwoven: true,
    Blessed: true,
    Bloodstained: true,
    Standard: true,
  });

  console.log(message)
    
  const filteredCollectionCards = useMemo(() => filterGivenCards(collectionCards, filters), [collectionCards, filters]);

  function showMessage(message: string) {
    setMessage(message);
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  function filterCards(e: MouseEvent<HTMLInputElement>) {
    const { name } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  //Sepearte function to prevent cloning of cards
  function clearDeckandSelectedItem() {
    setSelectedItem(null);
    clearDeck();
  }

  function handleDeckTap(target: string) {
    if (!selectedItem || target === source) return;
    const isMovingToCollection = target === "Collection";

    handleMoveCards([selectedItem], isMovingToCollection); //Check if isMovingToCollection
    setSelectedItem(null);
    setSource(null);
  };

  function submitDeck(e: MouseEvent<HTMLButtonElement>) {
    if (e) e.preventDefault();

    const payload = { deck: { cards: deck }};

    putRequest<{ success: boolean }>("/api/v1/decks/update_cards", payload)
      .then(data => {
        console.log(data)
        if (data.success) return showMessage("Deck Saved!");
      })
      .catch(error => setMessage(error.message));
  }

  return (
    <>
      { /* Deck editing buttons */ }
      <EditorButtons
        message={ message }
        buttons={[
          { name: "Save Deck", action: submitDeck },
          { name: "Sort Decks", action: sortCardsByRank },
          { name: "Clear Deck", action: clearDeckandSelectedItem },
          { name: "Fill Deck", action: () => fillDeck(filteredCollectionCards) }
        ]}
      />

      <section className="mx-auto my-3 sm:my-5 lg:my-10" id="deck-editor">
        <DeckNamer name={ player.deck.name } />
        <ItemContainer
          title={ `Collection ${ filteredCollectionCards.length } / ${ collectionCards.length }` }
        >
          <FilterInputs filters={ filters } deckStats={ player.deck } filterCards={ filterCards } />
          <CardStack
            cards={ filteredCollectionCards } 
            selectedCard={ selectedItem }
            handleDeckTap={ () => handleDeckTap("Collection") }
            handleCardTap={ (card) => handleItemTap(card, "Collection") }
          />
        </ItemContainer>
        <ItemContainer
          title={ `Deck ${ deck.length } / 52` }
          redText={ deck.length !== 52 }
          hoverText={{
            description: "The hand of Tyche demands balance. Your deck must consist of precisely 52 cards - no more, no less. To defy this rule is to defy Tyche and such insolence would lead to unimaginable consequences."
          }}
        >
          <CardStack
            cards={ deck } 
            selectedCard={ selectedItem }
            handleDeckTap={ () => handleDeckTap("Deck") }
            handleCardTap={ (card) => handleItemTap(card, "Deck") }
          />
        </ItemContainer>
      </section>
    </>
  )
};