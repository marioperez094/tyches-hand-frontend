//External Imports
import { useCallback, useEffect, useRef } from "react";

//Context
import { useGame } from "@context/game";
import { usePlayer } from "@context/player";
import { useAnimationManager } from "@context/animation";

export default function useHandManager() {
  const mounted = useRef(true);
  const { player, setPlayerHealth } = usePlayer();
  const { setAnimation } = useAnimationManager();
  const { 
    daimon, 
    gameState,
    setWager, 
    showAssets, 
    setButtons,
    setGameState,
    setPlayerHand,
    setDaimonHand,
    setDaimonHealth,
    currentLineIndex,
    setDaimonDialogue,
    setAssetVisibility,
    setCurrentLineIndex,
  } = useGame();
  const currentLineIndexRef = useRef(0);
  const emptyCard = {
    description: "",
    effect: "",
    effect_description: "",
    effect_values: {},
    effects: null,
    id: 0,
    name: "",
    rank: "",
    suit: "",
    isFlipped: true,
  }
  
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    }
  }, []);

  useEffect(() => {
    currentLineIndexRef.current = currentLineIndex;
  }, [currentLineIndex]);

  async function safeDelay(ms: number) {
    await new Promise(res => setTimeout(res, ms));
    if (!mounted.current) throw new Error("Component unmounted");
  };

  async function dealCards(cards, setHand, delayTime) {
    setGameState("IDLE");

    for (const card of cards) {
      setAnimation("cards", "slide-cards");
      setHand(prev => [...prev, card]);
      await safeDelay(delayTime);
    };
  };

  async function handleHealth(data: any) {
    const { player_health, daimon_health, blood_wager } = data;
    setGameState("IDLE");

    if (!showAssets.health) {
      setAssetVisibility("health", true);
      await safeDelay(750);
    };
    
    if (player_health !== undefined && player_health !== player.blood_pool) {
      const animation = player_health > player.blood_pool ? "glow-gold" : "glow-red";
      setAnimation("player", animation);
      setPlayerHealth(player_health);
    }
  
    if (daimon_health !== undefined && daimon_health !== daimon.blood_pool) {
      const animation = daimon_health > daimon.blood_pool ? "apply-healing" : "apply-damage";
      setAnimation("daimon", animation);
      setDaimonHealth(daimon_health);
    }
  
    if (blood_wager !== undefined) {
      setWager(blood_wager);
    }
  
    await safeDelay(2000);
  };

  async function handlePlayerCards(data: any): Promise<void> {
    const { player_cards } = data;
    if (!player_cards) return;

    await dealCards(player_cards, setPlayerHand, 500);
  };
  
  async function handleDaimonCards(data: any): Promise<void> {
    const { daimon_cards } = data;
    if (!daimon_cards) return;
    
    const daimonCards = daimon_cards.length > 1 ? daimon_cards : [...daimon_cards, emptyCard]
    await dealCards(daimonCards, setDaimonHand, 300);
  };

  async function handleDialogue(data: any) {
    const { dialogue } = data;
    if (!dialogue) return;

    setDaimonDialogue(dialogue);
    setCurrentLineIndex(0);
    setGameState("DIALOGUE")
  }
 
  async function parseGameData(data: any) {
    if (!data) return;

    for (const handler of gameDataHandlers) {
      await handler(data);
    };
  };
  
  const gameDataHandlers: ((data: any) => Promise<void>)[] = [
    handleHealth,
    handlePlayerCards,
    handleDaimonCards,
    handleDialogue,
    //handleDialogue,
    //handleAvailableActions,
  ];

  /*
    const {
      dialogue,
      blood_wager, 
      player_health,
      daimon_health,
      player_cards
    } = raw;
    const { wager_dialogue, hand_dialogue, end_dialogue } = dialogue;

    console.log(raw)

    setButtons([]);

    if (!showAssets.health) {
      setAssetVisibility("health", true);
      await safeDelay(750);
    };

    await healthSetup({ player_health, daimon_health, blood_wager });

    if (wager_dialogue !== undefined) await dialogueSetup(wager_dialogue);

    if (player_cards) await dealCards(player_cards, setPlayerHand, 1000)
  };*/

  return { parseGameData };
};