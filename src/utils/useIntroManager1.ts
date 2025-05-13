//External Imports
import { useCallback, useMemo } from "react";

//Context
import { useGame } from "@context/game";
import { usePlayer } from "@context/player";
import { useAnimationManager } from "@context/animation";

export default function useIntroManager() {
  const { 
    player
  } = usePlayer();

  const {
    gameState,
    setButtons,
    setGameState,
    currentLineIndex,
    setAssetVisibility,
  } = useGame();
  const {
    setAnimation
  } = useAnimationManager();

  function runIntro() {
    if (gameState !== "INTRODUCTION") return;

    if (!player.tutorial_finished) return tutorialIntro();
  };

  const tutorialIntro = useCallback(() => {
    if (currentLineIndex === 1) {
      setAssetVisibility("eye", true);
      setAnimation("daimon", "open-lid");
    }

    if (currentLineIndex === 2) setAssetVisibility("table", true);
    if (currentLineIndex < 0) {
      setGameState("WAGER");
    }
  }, [currentLineIndex]);

  return { runIntro };
};

/*export default function useIntroManager() {
  const { player } = usePlayer();
  const { 
    daimon,
    gameState,
    setGameState,
    currentLineIndex,
    setCurrentLineIndex,
    setAssetVisibility
  } = useGame();

  const runIntro()
  const { setAnimation } = useAnimationManager();
  
  const maxIndex = useMemo(() => daimon.dialogue ? daimon.dialogue.length - 1 : 0, [daimon.dialogue]);

  function handleNextLine(skipDialogue?: number) {
    if (!daimon.dialogue || currentLineIndex === -1) return;

    const nextIndex = skipDialogue !== undefined ? skipDialogue : currentLineIndex + 1;
    if (nextIndex > maxIndex) return endIntro();
    setCurrentLineIndex(nextIndex);
    
    if (gameState !== "INTRODUCTION") return;
    runIntro(nextIndex);
  }

  function runIntro(index: number) {
    if (!player.tutorial_finished) return runTutorial(index);
  };

  function runTutorial(index: number) {
    if (index === 1) {
      setAssetVisibility("eye", true)
      setAnimation("daimon", "open-lid") 
    };
    if (index === 2) setAssetVisibility("table", true);
    if (index > maxIndex) endIntro();
  };

  function endIntro() {
    setCurrentLineIndex(-2);
    
    if (gameState !== "INTRODUCTION") return;
    
    setAssetVisibility("eye", true);
    setAssetVisibility("table", true);
    setAssetVisibility("wager", true);
    setGameState("PLAYING");
  }

  return { handleNextLine }
};*/