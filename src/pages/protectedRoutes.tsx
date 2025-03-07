//External Imports
import { Outlet } from "react-router";

//Context
import { CardProvider } from "../context/card";
import { PlayerProvider } from "../context/player";

export default function ProtectedRoutes({ 
  isAuthenticated 
} : {
  isAuthenticated: boolean;
}) {
  console.log("render ProtectedRoutes")

  return isAuthenticated ? (
    <CardProvider>
      <PlayerProvider>
        <Outlet />
      </PlayerProvider>
    </CardProvider>
  ) : null;
}