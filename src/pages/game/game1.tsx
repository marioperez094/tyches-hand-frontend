//External Imports
import { useCallback, useEffect, useRef, useState } from "react";

//Components
import Table from "@components/gameAssets/table/table";
import Daimon from "@components/gameAssets/daimon/daimon";
import DialogueBox from "@components/gameAssets/dialogue/dialogueBox";
import HealthStatus from "@components/gameAssets/healthBar/healthStatus";
import WoodenButton from "@components/menuComponents/buttons/woodeButtons/woodenButtons";

//Context
import { useGame } from "@context/game";
import { useLoading } from "@context/loading";
import { usePlayer, PlayerType } from "@context/player";

//Functions
import { postRequest } from "@utils/fetchRequest";

//Stylesheets
import "./game.scss";

import gameBoard from "../../assets/ChatGPT Image Apr 13, 2025, 09_38_44 PM.png";
import gameBoard1 from "../../assets/ChatGPT Image Apr 13, 2025, 09_41_38 PM.png";
import gameBoard2 from "../../assets/ChatGPT Image Apr 13, 2025, 09_49_44 PM.png";
import gameBoard3 from "../../assets/e77c4fbe-132d-44d1-b79f-8cd0dd24ea64.png";
import useIntroManager from "../../utils/useIntroManager";
import { useAnimationManager } from "../../context/animation";
import WagerBottle from "../../components/gameAssets/wagerBottle/wagerBottle";
import { putRequest } from "../../utils/fetchRequest";
import Card from "../../components/gameAssets/card/card";

interface DaimonType {
  name: string,
  rune: string,
  blood_pool: number,
  max_blood_pool: number,
  intro: string[],
  effect_type: string,
};

interface RoundType {
  status: string,
};

interface GameType {
  player: PlayerType,
  daimon: DaimonType,
  round: RoundType,
}

export default function Game() {
  const { player, setPlayer } = usePlayer();
  const { daimon, setDaimon } = useGame();
  const { stopLoading, showLoading } = useLoading();

  useEffect(() => {
    fetchGameInfo();
  }, [])

  async function fetchGameInfo() {
    try {
      const data = await postRequest<GameType>("/api/v1/games");
      const { player, daimon } = data;
      console.log(data)

      setPlayer(player);
      setDaimon(daimon);
    } catch(error) {
      console.error(`Fetch Game Error: ${ error.message }`);
    } finally {
      stopLoading();
    }
  };

  if (showLoading || !player) return null;
  
  return(
    <div className="w-screen h-screen">
      <div className="flex w-screen justify-center w-screen h-screen z-10">
        <GameBoard
          player={ player }
          daimon={ daimon }
        />
      </div>
    </div>
  )
};

function GameBoard({
  player,
  daimon,
} : {
  player: PlayerType;
  daimon: DaimonType;
}) {
  const { 
    currentLineIndex,
    showAssets,
    wager
  } = useGame();
  const { 
    setHand, 
    setPlayerHits, 
    setPlayerStands, 
    setPlayerSurrenders, 
    setPlayerDoublesDown 
  } = useHandManager();
  const { handleNextLine } = useIntroManager();
  const { animationState } = useAnimationManager();

  function playerWager() {
    postRequest("/api/v1/hands")
      .then(data => console.log(data))
      .catch(error => console.error(error.message));
  };

  function playerHits() {
    putRequest("/api/v1/hands/player_hits")
      .then(data => setPlayerHits(data))
      .catch(error => console.error(error.message));
  };

  function playerStands() {
    putRequest("/api/v1/hands/player_stands")
      .then(data => setPlayerStands(data))
      .catch(error => console.error(error.message));
  };

  function playerSurrenders() {
    putRequest("/api/v1/hands/player_surrenders")
      .then(data => setPlayerSurrenders(data))
      .catch(error => console.error(error.message));
  };

  function playerDoublesDown() {
    putRequest("/api/v1/hands/player_doubles_down")
      .then(data => setPlayerDoublesDown(data))
      .catch(error => console.error(error.message));
  };

  useEffect(() => {
    if (!daimon.dialogue) return;

    const readingTime = daimon.dialogue ? daimon.dialogue[currentLineIndex]?.length * 85 + 1500 : null;
    console.log("upper readingTime:" + readingTime, daimon.dialogue[currentLineIndex]?.length)
    const timeout = setTimeout(() => {
      handleNextLine();
    }, readingTime);

    return () => clearTimeout(timeout);
  }, [currentLineIndex]);

  return(
    <div className={`w-screen h-screen flex justify-center ${ animationState.player }`}>
      <div id="game-board">
      <div 
        className="flex justify-center daimon-health-status transition-opacity"
        style={{ opacity: showAssets.health ? "1": "0" }}
      >
        <HealthStatus
          name={ daimon.name }
          health={ daimon.blood_pool }
          maxHealth={ daimon.max_blood_pool}
          isPlayer={ false }
        />
      </div>
      <div 
        className="absolute top-1/2 right-2 md:right-20"
        style={{ opacity: showAssets.health ? "1" : "0" }}
      >
        <WagerBottle
          wager={ wager }
        />
      </div>
      <div 
        className="relative flex justify-center col-start-2 daimon-eye transition-opacity"
        style={{ opacity: showAssets.eye ? "1" : "0" }}
      >
        <Daimon
          animation={ animationState.daimon }
          effectType={ daimon.effect_type === "none" ? "healing" : daimon.effect_type }
          tychesWrath={ daimon?.tychesWrath }
        />
      </div>
      <div 
        className="dialogue-container transition-opacity"
        style={{ opacity: currentLineIndex > -1 ? "1": "0" }}
      >
        <DialogueBox 
          dialogueLine={ daimon.dialogue[currentLineIndex] }
        />
      </div>
      <div 
        className="flex justify-center w-full table transition-opacity"
        style={{ opacity: showAssets.table ? "1" : "0" }}
      >
        <Table
          discardHand={ animationState.cards } 
        />
      </div>
      <div className="player-menu">
        <div
          className="px-3 flex justify-center player-health-status transition-opacity"
          style={{ opacity: showAssets.health ? "1": "0" }}
        >
          <HealthStatus
            name={ player.username }
            health={ player.blood_pool }
            maxHealth={ player.max_blood_pool}
            isPlayer={ player }
          />
        </div>
        { currentLineIndex < 0 && 
          <GameButtons
            playerWager={ playerWager }
            playerHits={ playerHits }
            playerStands={ playerStands }
            playerSurrenders={ playerSurrenders }
            playerDoublesDown= { playerDoublesDown } 
          /> 
        }
      </div>
      { currentLineIndex > -1 &&
        <div 
          className="absolute top-10 right-10 button-container z-2 transition-opacity"
        >
          <WoodenButton
            action={ () => handleNextLine(6) }
          >
            Skip
          </WoodenButton>
        </div>
      }
      </div>
    </div>
  )
};

function GameButtons({ 
  playerWager,
  playerHits,
  playerStands,
  playerSurrenders,
  playerDoublesDown,
}: { 
  playerWager: () => void;
  playerHits: () => void;
  playerStands:  () => void;
  playerSurrenders: () => void;
  playerDoublesDown: () => void;
}) {
  const { showAssets } = useGame(); 
  if (showAssets.wager) return(
    <div className="wager w-full flex justify-center">
      <WoodenButton
        action={ () => playerWager() }
      >
        Wager
      </WoodenButton>
    </div>
  )

  return(
    <div className="grid grid-cols-4 gap-4 w-full">
      <div>
        { showAssets.hit &&
          <WoodenButton
            action={ () => playerHits() }
          >
            Hit
          </WoodenButton>
        }
      </div>
      <div>
        { showAssets.stand &&
          <WoodenButton
            action={ () => playerStands() }
          >
            Stand
          </WoodenButton>
        }
      </div>
      <div>
        { showAssets.double_down &&
          <WoodenButton
            action={ () => playerDoublesDown() }
          >
            Double Down
          </WoodenButton>
        }
      </div>
      <div>
        { showAssets.surrender &&
          <WoodenButton
            action={ () => playerSurrenders() }
          >
            Surrender
          </WoodenButton>
        }
      </div>
    </div>
  )
};


export type ActionKey = 'hit' | 'stand' | 'surrender' | 'double_down' | 'wager';

function useHandManager() {
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      console.log("unmounted")
      mounted.current = false;
    };
  }, []);

  const { player, setPlayerHealth } = usePlayer();
  const { 
    daimon, 
    setDaimon, 
    setDaimonHealth, 
    setDaimonDialogue,
    setWager, 
    setPlayerHand, 
    setDaimonHand, 
    showAssets, 
    setAssetVisibility,
    setCurrentLineIndex 
  } = useGame();
  const { setAnimation } = useAnimationManager();

  //Delay future actions
  const safeDelay = useCallback(async (ms: number) => {
    await new Promise(res => setTimeout(res, ms));
    if (!mounted.current) throw new Error('Component unmounted');
  }, []);

  //Set game buttons
  const setButtons = useCallback((visible: ActionKey[]) => {
    const all: ActionKey[] = ['hit', 'stand', 'surrender', 'double_down', 'wager'];
    all.forEach(key => setAssetVisibility(key, visible.includes(key)));
  }, [setAssetVisibility]);

  async function endPhase(
    statuses: {},
    actions?: ActionKey[]
  ) {
    const gameOver = await healthSetup(statuses);
    if (gameOver) return true;
    if (actions) setButtons(actions);
    return false;
  }

  async function endMatch() {
    try {
      console.log("Match ended")
    } catch (error) {
      console.error("Error ending match:", error); 
    }
  };

  async function setHand(handSetup: {}) {
    console.log(handSetup);
    const { 
      wager_dialogue,
      wagered_health_statuses,
      hand_dialogue,
      player_cards, 
      daimon_cards,
      available_actions,
      health_statuses, 
      tyches_wrath,
      tyches_wrath_dialogue
    } = handSetup;
    setPlayerHand([]);
    setDaimonHand([]);
    setButtons([]);

    if (!showAssets.health) {
      setAssetVisibility("health", true);
      await safeDelay(750);
    };

    if (await endPhase(wagered_health_statuses)) return;

    if (wager_dialogue) {
      setDaimonDialogue(wager_dialogue);
      setCurrentLineIndex(0);
      await safeDelay(10000);
    };

    if (tyches_wrath) {
      if (tyches_wrath_dialogue) {
        setDaimonDialogue(tyches_wrath_dialogue);
        setCurrentLineIndex(0);
      }

      setDaimon(prev => ({ ...prev, tychesWrath: true }));
      await safeDelay(2000);
    };

    await dealCards(player_cards, setPlayerHand, 1000);
    const daimonCards = daimon_cards.length > 1 ? daimon_cards : [...daimon_cards, emptyCard] 
    await dealCards(daimonCards, setDaimonHand, 500);

    if (hand_dialogue) {
      setDaimonDialogue(hand_dialogue);
      setCurrentLineIndex(0);
    };
    
    console.log("unmounted here?")

    if (health_statuses) {
      await endPhase(health_statuses, ["wager"]);
      return
    } else {
      setButtons(available_actions);
    }
    
  };

  async function setPlayerHits(playerHits: {}) {
    const { 
      player_card,
      available_actions
    } = playerHits;
    setButtons([]);
    await dealCards([player_card], setPlayerHand, 1000);
    setButtons(available_actions);

    console.log(playerHits);
  };

  async function setPlayerStands(playerStands: {}) {
    const {
      daimon_cards,
      health_statuses
    } = playerStands;
    setButtons([]);

    await flipDaimonCards(daimon_cards)
    await endPhase(health_statuses, ["wager"]);
  };

  async function setPlayerSurrenders(playerSurrenders: {}) {
    const {
      health_statuses
    } = playerSurrenders;
    
    setButtons([]);

    await endPhase(health_statuses, ["wager"]);

    console.log(playerSurrenders);
  };

  async function setPlayerDoublesDown(playerDoublesDown: {}) {
    const {
      wagered_health_statuses,
      player_card,
      daimon_cards, 
      health_statuses
    } = playerDoublesDown;
    
    setButtons([]);

    await healthSetup(wagered_health_statuses);
    await dealCards([player_card], setPlayerHand, 1000);
    await flipDaimonCards(daimon_cards)
    await endPhase(health_statuses, ["wager"]);

    console.log(playerDoublesDown)
  }

  async function healthSetup(healthStatuses: {}) {
    const { player_health, daimon_health, blood_wager } = healthStatuses;

    
    if (player_health > player.blood_pool) setAnimation('player','glow-gold');
    else if (player_health < player.blood_pool) setAnimation('player','glow-red');

    if (daimon_health > daimon.blood_pool) setAnimation('daimon','apply-healing');
    else if (daimon_health < daimon.blood_pool) setAnimation('daimon','apply-damage');

    setPlayerHealth(player_health);
    setDaimonHealth(daimon_health);
    setWager(blood_wager);

    await safeDelay(2000);

    //Ends game if health is zero
    if (player_health <= 0 || daimon_health <= 0) {
      await endMatch();
      return true;
    };

    return false;
  };

  async function flipDaimonCards(daimon_cards: {}) {
    const slicedDaimonCards = daimon_cards.slice(1);
    setDaimonHand(prev => [prev[0], daimon_cards[0]]);
    
    await safeDelay(700);
    await dealCards(slicedDaimonCards, setDaimonHand, 700);
  };

  async function dealCards(cards, setHand, delayTime) {
    for (const card of cards) {
      setAnimation("cards", "slide-cards");
      setHand(prev => [...prev, card]);
      await safeDelay(delayTime);
    };
  };

  return { setHand, setPlayerHits, setPlayerStands, setPlayerSurrenders, setPlayerDoublesDown }
};

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

/*
  useEffect(() => {
    postRequest("api/v1/games")
      .then(data => {
        setGameAttributes(data)
      })
  }, []);

  function setGameAttributes(data) {
    const { player } = data
    setPlayer(player);
  };
  
  if (player) return(
    <div className="relative w-screen h-screen">
      <DaimonDialouge 
        dialogue={ daimon.intro } 
        setGameState
      />
    </div>
  );

  return(
    <HealthStatus
      name="The Addiction"
      health={ 5000 }
      isPlayer={ false }
    />
  );

  return (
    <div className="relative w-screen h-screen">
      <img
        src={ gameBoard }
        className="absolute top-0 left-0 w-screen h-screen object-cover z-0"
        alt="background"
      />
      <div className="md:grid md:grid-cols-3 relative z-10" id="game-board">
        <div className="md:mt-15 flex justify-center md:order-2 daimon-health-status">
          <HealthStatus
            name="The Draw"
            health={ 5000 }
            isPlayer={ false }
          />
        </div>
        <div className="md:mt-15 flex justify-center col-start-2 md:order-1 daimon-eye">
          <Daimon
            animation="idle"
            effectType="utility"
            rune="O"
          />
        </div>
      </div>
    </div>

  )
};

export function DaimonDialouge({
  dialogue
} : {
  dialogue: string[];
}) {
  const [lineIndex, setLineIdex] = useState(0);

  function increaseLineIndex() {
    setLineIdex(prevState => { 
      const maxLine = dialogue.length;
      return prevState === maxLine - 1 ? -1 : prevState + 1
    })
  };

  console.log(lineIndex)

  if (lineIndex !== -1) return(
    <DialogueBox 
      dialogueLine={ dialogue[lineIndex] }
      increaseLineIndex={ increaseLineIndex }
    />
  )
};*/