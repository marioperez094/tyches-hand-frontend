import { useEffect } from "react";
import { AnimationProvider } from "../../context/animation";
import { DialogueProvider, useDialogue } from "../../context/dialogue";
import { GameProvider } from "../../context/game";
import { postRequest } from "../../utils/fetchRequest";
import { useLoading } from "../../context/loading";
import useRoundInitialize from "../../utils/useRoundInitialize";

export default function GamePage() {
  return(
    <GameProvider>
      <AnimationProvider>
        <DialogueProvider>
          <GamePageInner />
        </DialogueProvider>
      </AnimationProvider>
    </GameProvider>
  )
};

function GamePageInner() {
  const { stopLoading } = useLoading();
  const { setRound } = useRoundInitialize();
  const { dialogue } = useDialogue();

  useEffect(() => {
    fetchGameInfo();
  }, [])

  async function fetchGameInfo() {
    try {
      const data = await postRequest("/api/v1/games");
      setRound(data);
    } catch (error) {
      console.error(`Fetch Game Error: ${ error.message }`)
    } finally {
      stopLoading();
    }
  };
  
  return(
    <div className="text-white">{ JSON.stringify(dialogue) }</div>
  )
};