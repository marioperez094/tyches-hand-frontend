//Types
import { CardType } from "./types";

interface MoveItemsResult {
  updatedSource: CardType[];
  updatedTarget: CardType[];
};

export default function useItemManager() {
  function moveItems(
    source: CardType[], 
    target: CardType[], 
    items: CardType[]
  ): MoveItemsResult {
    console.log(items)
    const updatedSource = source.filter((item) => !items.some((i) => i.id === item.id));
    const updatedTarget = [...items, ...target]

    return { updatedSource, updatedTarget };
  };

  function clearLoadout(
    playerLoadout: CardType[], 
    playerCollection: CardType[]
  ): MoveItemsResult {
    return { updatedSource: [], updatedTarget: [...playerLoadout, ...playerCollection] };
  };

  return { moveItems, clearLoadout };
};