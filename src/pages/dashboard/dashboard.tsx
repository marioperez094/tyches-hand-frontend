//External Imports
import { ReactNode, useEffect } from "react"

//Context
import { usePlayer } from "../../context/player";
import { useLoading } from "../../context/loading";
import DashboardLayout from "./dashboardLayout";
import { Outlet } from "react-router";

//Stylesheets
import "./dashboard.scss";

export default function Dashboard({ logout } : { logout: () => void }) {
  const { player, fetchPlayer } = usePlayer();
  const { stopLoading, showLoading } = useLoading();

  console.log("render Dashboard")

  const links: {
    [key: string]: { 
    name: string,
    component: ReactNode
  }} = {
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

  useEffect(() => {
    fetchPlayerInfo();
  }, []);

  async function fetchPlayerInfo() {
    await fetchPlayer({ deck_stats: true, deck_cards: true, collection_cards: true, collection_tokens: true, slots: true });

    stopLoading();
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