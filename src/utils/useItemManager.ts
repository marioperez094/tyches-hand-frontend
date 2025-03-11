//Types
import { CardType } from "./types";

interface MoveItemsResult {
  updatedSource: any[];
  updatedTarget: any[];
};

export default function useItemManager() {
  function moveItems(
    source: any[], 
    target: any[], 
    items: any[]
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