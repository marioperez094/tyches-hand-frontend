//External Imports
import { Outlet } from "react-router";

//Context
import { CardProvider } from "../context/card";
import { PlayerProvider } from "../context/player";
import { TokenProvider } from "../context/token";

export default function ProtectedRoutes({ 
  isAuthenticated 
} : {
  isAuthenticated: boolean;
}) {
  console.log("render ProtectedRoutes")

  return isAuthenticated ? (
    <CardProvider>
      <TokenProvider>
        <PlayerProvider>
          <Outlet />
        </PlayerProvider>
      </TokenProvider>
    </CardProvider>
  ) : null;
}