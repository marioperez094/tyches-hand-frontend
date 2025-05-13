import { useState } from "react";

export default function useDialogue(lines, onComplete) {
  const [index, setIndex] = useState(0);

  function advance() {
    if (index < lines.length - 1) {
      setIndex(i => i + 1);
    } else {
      onComplete?.();
    }
  };

  return {
    currentLine: lines[index],
    index,
    advance,
    isDone: index >= lines.length -1
  };
};