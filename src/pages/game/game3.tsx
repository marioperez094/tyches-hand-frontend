import { useEffect } from "react";
import { postRequest } from "../../utils/fetchRequest";
import useRoundInitialize from "../../utils/useRoundInitialize";
import { useLoading } from "../../context/loading";
import useDialogue from "../../utils/useDialogue";

export default function Game() {
  const { setRound } = useRoundInitialize();
  const { setDialogue } = useDialogue(onComplete); 
  const { stopLoading } = useLoading();

  useEffect(() => {
    fetchGameInfo();
  }, []);

  async function fetchGameInfo() {
    try {
      const data = await postRequest("/api/v1/games");
      setRound(data);
      setDialogue(data.daimon.dialogue);
    } catch (error) {
      console.error(`Fetch game error: ${ error.message }`)
    } finally {
      stopLoading();
    }
  };

  

  return(
    <div>{ JSON.stringify(dialogue) }</div>
  )
};

/*function GameBoard() {
  
  return(
    <div>{ JSON.stringify(dialogue) }</div>
  )
};*/