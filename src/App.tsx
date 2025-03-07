// External Imports
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router";

// Context
import { useLoading } from "./context/loading";

// Components
import LandingPage from "./pages/landingPage/landingPage";
import ProtectedRoutes from "./pages/protectedRoutes";
import Dashboard from "./pages/dashboard/dashboard";
import PlayerCollections from "./pages/dashboard/playerCollections/playerCollections";
import LoadingScreen from "./components/gameAssets/loadingScreen/loadingScreen";

// Functions
import { deleteRequest, getRequest } from "./utils/fetchRequest";
import DeckEditor from "./pages/dashboard/deckEditor/deckEditor";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { showLoading, startLoading } = useLoading();

  console.log("rendered App");
  console.log("isAuthenticated: ", isAuthenticated);

  //Function to check authentication
  function checkAuthentication(): () => void {
    let timeoutId: ReturnType<typeof setTimeout>;

    function delayForTitle(authenticated: boolean) {
      const animationDelay: number = 1250; // Time it takes for title to appear

      timeoutId = setTimeout(() => {
        if (authenticated) startLoading();
        setIsAuthenticated(authenticated);
      }, animationDelay);
    }

    getRequest<{ authenticated: boolean }>("/api/v1/players/authenticated")
      .then((data) => delayForTitle(data.authenticated))
      .catch((error) => {
        console.error(`Authentication error: ${error.message}`);
        delayForTitle(false);
      });

    return () => clearTimeout(timeoutId);
  }

  //Logout function
  function logout(): void {
    deleteRequest<{ success: boolean }>("/api/v1/players/logout")
      .then((data) => {
        if (!data.success) return;
        setIsAuthenticated(false);
        localStorage.removeItem("jwt");
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      { /* Global Loading Screen */ }
      { showLoading && <LoadingScreen /> }

      <Routes>
        { isAuthenticated ? (
          <>
            <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>
              <Route path="/dashboard" element={<Dashboard logout={ logout } />}>
                <Route index element={ <PlayerCollections /> } />
                <Route path="edit-deck" element={ <DeckEditor /> } />
              </Route>
            </Route>

            <Route path="*" element={ <Navigate to="/dashboard" replace />} />
          </>
        ) : (
          <>
            <Route
              path="/"
              element={
                <LandingPage
                  isAuthenticated={ isAuthenticated }
                  setIsAuthenticated={ setIsAuthenticated }
                  checkAuthentication={ checkAuthentication }
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </>
  );
}
