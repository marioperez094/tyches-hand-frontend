//External Imports
import { ReactNode } from "react"

export default function Dashboard({ logout } : { logout: Function }) {
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
      name: "Edit Deck",
      component: (<div>Edit Deck</div>)
    },
    "/dashboard/edit-tokens": {
      name: "Edit Tokens",
      component: (<div>Edit Tokens</div>)
    }
  };
  
  return (
    <div>Hi</div>
  )
};