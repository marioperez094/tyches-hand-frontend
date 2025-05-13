//External Imports
import { createContext, useContext, useState } from "react";

const DialogueContext = createContext(undefined);

function DialogueProvider({ children } : { children: React.ReactNode }) {
  const [dialogue, setDialogue] = useState(null);
  const [index, setIndex] = useState(0);


  return(
    <DialogueContext.Provider value={{
      dialogue,
      setDialogue,
      index,
      setIndex
    }}>
      { children }
    </DialogueContext.Provider>
  )
};

function useDialogue() {
  const context = useContext(DialogueContext);
  if (!context) {
    throw new Error("useDialoge must be used within a DialogueProvider");
  }
  return context;
};

export { DialogueProvider, useDialogue }