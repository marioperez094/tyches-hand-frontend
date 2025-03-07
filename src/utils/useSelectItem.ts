import { useState } from "react";

interface UseSelectItem<T> {
  selectedItem: T | null;
  setSelectedItem: (item: T | null) => void;
  source: string | null;
  setSource: (source: string | null) => void;
  handleItemTap: (item: T, source: string) => void;
}

export function useSelectItem<T>(): UseSelectItem<T> {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [source, setSource] = useState<string | null>(null);

  function handleItemTap(item: T, source: string): void {
    if ((selectedItem as any)?.id === (item as any)?.id) {
      setSelectedItem(null);
      setSource(null);
    } else {
      setSelectedItem(item);
      setSource(source);
    }
  }

  return { selectedItem, setSelectedItem, source, setSource, handleItemTap };
}
