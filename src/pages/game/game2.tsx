//External Imports
import { useEffect } from "react";

//Context
import { useLoading } from "@context/loading";
import { DaimonType, useGame } from "@context/game";
import { PlayerType, usePlayer } from "@context/player";

//Components
import GameBoard from "./gameBoard";

//Functions
import { postRequest } from "@utils/fetchRequest";

//Styles
import "./game.scss";

interface RoundType {
  status: string,
};

interface GameType {
  player: PlayerType | null,
  daimon: DaimonType | null,
  round: RoundType,
}

export default function Game() {
  const {
    daimon,
    setDaimon, 
  } = useGame();
  const { player, setPlayer } = usePlayer();
  const { stopLoading, showLoading } = useLoading();

  useEffect(() => {
    fetchGameInfo();
  }, []);

  async function fetchGameInfo() {
    try {
      const data = await postRequest<GameType>("/api/v1/games");
      const { player, daimon } = data;
      console.log(data);
    } catch (error) {
      console.error(`Fetch Game Error: ${ error.message }`);
    } finally {
      stopLoading();
    }
  };

  if (showLoading || !player || !daimon) return null;
  
  return(
    <GameBoard
      player={ player }
      daimon={ daimon }
    />
  )
};