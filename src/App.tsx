//External Imports
import { lazy, useState } from "react";
import { Routes, Route, Navigate } from "react-router";

//Context
import { useLoading } from "@context/loading";

//Components
import Game from "@pages/game/game";
import ProtectedRoutes from "@pages/protectedRoutes";
import LandingPage from "@pages/landingPage/landingPage";
import LoadingScreen from "@components/gameAssets/loadingScreen/loadingScreen";
import TokenEditor from "./pages/dashboard/tokenEditor/tokenEditor";

const Dashboard = lazy(() => import("@pages/dashboard/dashboard"));
const PlayerCollections = lazy(() => import("@pages/dashboard/playerCollections/playerCollections"));

export default function App() {
  const { showLoading } = useLoading();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return(
    <>
      {/* Global Loading Screen */}
      { showLoading && <LoadingScreen /> }
      
      <Routes>
        {/* Inauthenticated Route */}
        <Route path="/"
          element={ 
            <LandingPage 
              isAuthenticated={ isAuthenticated }
              setIsAuthenticated={ setIsAuthenticated }
            /> }
        />

        {/* Protected Routes */}
        <Route 
          element={ <ProtectedRoutes isAuthenticated={ isAuthenticated } /> 
        }>
          <Route path="/dashboard" element={ <Dashboard setIsAuthenticated={ setIsAuthenticated } /> } >
            <Route index element={ <PlayerCollections /> } />
            <Route path="edit-tokens" element={ <TokenEditor /> } />
          </Route>
          <Route path="/game" element={ <Game /> } />
        </Route>
         
        {/* Fallback Route */}
        <Route path="*" element={ <Navigate to="/" replace /> } />
      </Routes>
    </>
  )
};