import { useDialogue } from "../context/dialogue";
import { useGame } from "../context/game";
import { usePlayer } from "../context/player"

export default function useRoundInitialize() {
  const { setPlayer } = usePlayer();
  const { setDaimon, setPhase } = useGame();
  const { dialogue, setDialogue, index, setIndex } = useDialogue();

  function setRound(data) {
    const { player, daimon } = data;

    setPlayer(player);
    setDaimon(daimon);
    setDialogue(daimon.dialogue);
  };

  function advanceIntro() {
    const maxIndex = dialogue.length - 1;

    if (index < maxIndex) {
      setIndex(i => i + 1);
    } else {
      setPhase("wager");
    }

  }

  function onComplete() {
    console.log("Congratulations");
  }

  return { setRound, advanceIntro() }
};