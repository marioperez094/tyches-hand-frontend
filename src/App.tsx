//External Imports
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router";

//Context
import { useLoading } from "./context/loading";

//Components
import LandingPage from "./pages/landingPage/landingPage";
import ProtectedRoutes from "./pages/protectedRoutes";
import Dashboard from "./pages/dashboard/dashboard";
import LoadingScreen from "./components/gameAssets/loadingScreen/loadingScreen";

//Functions
import { getRequest } from "./utils/fetchRequest";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null);
  const { showLoading, startLoading } = useLoading();

  console.log("rendered App")
  console.log("isAuthenticated: ", isAuthenticated)

  function checkAuthentication(): Function {
    //Variable to clear animation timeout
    let timeoutId: number;

    function delayForTitle(authenticated: boolean) {
      const animationDelay: number = 1250; //Time it takes for title to appear

      timeoutId = window.setTimeout(() => {
        if (authenticated) startLoading();

        setIsAuthenticated(authenticated);
      }, animationDelay);
    };

    getRequest<{ authenticated: boolean }>('/api/v1/players/authenticated')
      .then(data => delayForTitle(data.authenticated))
      .catch(error => { 
        console.error(`Authentication error: ${ error.message }`)
        delayForTitle(false) 
      });
    
    //Function to be returned for cleanup
    return () => clearTimeout(timeoutId);
  };

  function logout() {
    console.log("logout")
  }

  return(
    <>
      { /* Global loading screen */ }
      { showLoading && <LoadingScreen /> }

      <Routes>
        { isAuthenticated ? (
          <>
            <Route element={ <ProtectedRoutes isAuthenticated={ isAuthenticated } /> }>
              <Route path="/dashboard" element={ <Dashboard logout={ logout } /> }>
              </Route>
            </Route>

            <Route path="*" element={ <Navigate to={"/dashboard"} replace /> } />
          </>
        ) : (
          <>
            <Route path="/" element={
              <LandingPage
                isAuthenticated={ isAuthenticated }
                setIsAuthenticated={ setIsAuthenticated }
                checkAuthentication={ checkAuthentication } 
              />
            }/>
        
            <Route path="*" element={ <Navigate to="/" replace /> } /> 
          </>
        )}
      </Routes>
    </>
  )
};