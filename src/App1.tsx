// External Imports
import { lazy, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router";

// Context
import { useLoading } from "./context/loading";

// Components
import LandingPage from "@pages/landingPage/landingPage";
import ProtectedRoutes from "@pages/protectedRoutes";
import PlayerCollections from "@pages/dashboard/playerCollections/playerCollections";
import LoadingScreen from "@components/gameAssets/loadingScreen/loadingScreen";

const Dashboard = lazy(() => import("@pages/dashboard/dashboard"))
const DeckEditor = lazy(() => import("@pages/dashboard/deckEditor/deckEditor"))
const TokenEditor = lazy(() => import("@pages/dashboard/tokenEditor/tokenEditor"))

// Functions
import { deleteRequest, getRequest } from "./utils/fetchRequest";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { showLoading, startLoading } = useLoading();
  const navigate = useNavigate();

  //Function to check authentication
  function checkAuthentication(): () => void {
    let timeoutId: ReturnType<typeof setTimeout>;

    function delayForTitle(authenticated: boolean) {
      const animationDelay: number = 1250; // Time it takes for title to appear

      timeoutId = setTimeout(() => {
        if (authenticated) startLoading();
        setIsAuthenticated(authenticated);
        navigate("/dashboard", { replace: true })
      }, animationDelay);
    }

    getRequest<{ authenticated: boolean }>("/api/v1/players/authenticated")
      .then((data) => {
        if (data.authenticated) { 
          delayForTitle(data.authenticated)
        }
      })
      .catch((error) => {
        console.error(`Authentication error: ${error.message}`);
        delayForTitle(false);
      });

    return () => clearTimeout(timeoutId);
  };

  //Logout function
  function logout(): void {
    deleteRequest<{ success: boolean }>("/api/v1/players/logout")
      .then((data) => {
        if (!data.success) return;
        setIsAuthenticated(false);
        localStorage.removeItem("jwt");
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
      { /* Global Loading Screen */ }
      { showLoading && <LoadingScreen /> }

      <Routes>
        {/* Inauthenticated Route */}
        <Route 
          path="" 
          element={ 
            <LandingPage
              isAuthenticated={ isAuthenticated }
              setIsAuthenticated={ setIsAuthenticated }
              checkAuthentication={ checkAuthentication }
            />
          }
        />

        {/* Protected Routes */}
        <Route element={ 
          <ProtectedRoutes 
            isAuthenticated={ isAuthenticated }
            checkAuthentication={ checkAuthentication }
          /> 
        }>
          <Route path="/dashboard" element={ <Dashboard logout={ logout } /> }>
            <Route index element={ <PlayerCollections /> } />
            <Route path="edit-deck" element={ <DeckEditor /> } />
            <Route path="edit-tokens" element={ <TokenEditor /> } />
          </Route>
          
          <Route path="/game" element={ <div className="text-white">Hi</div> } />
        </Route>
        
        {/* Fallback Route */}
        <Route path="*" element={ <Navigate to="" replace /> } />
      </Routes>
    </>
  );
}


//<Routes>
//{ isAuthenticated ? (
  //<>
    //<Route element={<ProtectedRoutes isAuthenticated={ isAuthenticated } />}>
      //<Route path="/dashboard" element={<Dashboard logout={ logout } />}>
        //<Route index element={ <PlayerCollections /> } />
        //<Route path="edit-deck" element={ <DeckEditor /> } />
        //<Route path="edit-tokens" element={ <TokenEditor /> } />
      //</Route>
      //<Route path="/game" element={ <div className="text-white">Hi</div> } />
    //</Route>
    //<Route path="*" element={ <Navigate to="/dashboard" replace />} /> 
  //</>
//) : (
  //<>
    //<Route
      //path="/"
      //element={
        //<LandingPage
          //isAuthenticated={ isAuthenticated }
          //setIsAuthenticated={ setIsAuthenticated }
          //checkAuthentication={ checkAuthentication }
        ///>
      //}
    ///>
    //<Route path="*" element={ <Navigate to="/" replace /> } />
  //</>
//)}
//</Routes>