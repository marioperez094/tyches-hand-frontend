//External Imports
import { Navigate, Outlet } from "react-router";

//Context
import { GameProvider } from "@context/game";
import { CardProvider } from "@context/card";
import { TokenProvider } from "@context/token";
import { PlayerProvider } from "@context/player";
import { AnimationProvider } from "../context/animation";


export default function ProtectedRoutes({
  isAuthenticated,
} : { 
  isAuthenticated: boolean;
}) {

  return isAuthenticated ? (
    <CardProvider>
      <TokenProvider>
        <PlayerProvider>
          <Outlet />
        </PlayerProvider>
      </TokenProvider>
    </CardProvider>
  ) : <Navigate to="/" replace />
};