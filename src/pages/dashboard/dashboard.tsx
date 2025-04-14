//External Imports
import { ReactNode, useEffect } from "react"
import { Outlet } from "react-router";

//Context
import { useLoading } from "@context/loading";
import { PlayerType, usePlayer } from "@context/player";

//Components
import DashboardLayout from "./dashboardLayout";

//Functions
import { deleteRequest, getRequest } from "../../utils/fetchRequest";

//Stylesheets
import "./dashboard.scss";


const links: {
  [link: string]: { 
  name: string,
  component: ReactNode
}} = {
  "/game": {
    name: "Play",
    component: null
  },
  "/dashboard":{
    name: "Stats",
    component: (<div>Player Stats</div>)
  },
  "/dashboard/edit-deck": {
    name: "Deck",
    component: (<div>Edit Deck</div>)
  },
  "/dashboard/edit-tokens": {
    name: "Tokens",
    component: (<div>Edit Tokens</div>)
  }
};

export default function Dashboard({ 
  setIsAuthenticated 
} : { 
  setIsAuthenticated: (value: boolean) => void;
}) {
  const { player, setStatSummary } = usePlayer();
  const { stopLoading, showLoading } = useLoading();

  useEffect(() => {
    fetchPlayerInfo();
  }, []);

  async function fetchPlayerInfo() {
    await getRequest<{ player: PlayerType }>("/api/v1/players/player_summary")
      .then(data => {
        setStatSummary(data.player);
      })
      .catch(error => {
        console.error(`Fetch Player Error: ${ error.message }`)
      })
    stopLoading();
  };

  function logout() {
    deleteRequest<{ success: boolean }>("/api/v1/players/logout")
      .then(data => {
        if (!data.success) return;
        setIsAuthenticated(false);
        localStorage.removeItem("jwt");
      })
      .catch(error => console.error(error.message));
  };

  if (showLoading) return null;
  
  return player ? (
    <div id="dashboard">
      <DashboardLayout
        logout={ logout }
        links={ links }
      >
        <Outlet />
      </DashboardLayout>
    </div>
  ) : null;
};