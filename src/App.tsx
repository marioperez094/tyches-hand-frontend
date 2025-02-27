//External Imports
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";

//Components

//Functions
import { getRequest } from "./utils/fetchRequest";
import LandingPage from "./pages/landingPage/landingPage";

interface AuthResponse {
  authenticated: boolean;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  console.log("render App")
  console.log("isAuthenticated: " + isAuthenticated)

  function checkAuthentication() {
    //Variable to clear animation timeout
    let timeoutId: number;

    function delayForTitle(authenticated: boolean) {
      const animationDelay = 1500; //Time it takes for title to appear

      timeoutId = window.setTimeout(() => {
        setIsAuthenticated(authenticated);
      }, animationDelay);
    };

    getRequest<AuthResponse>('/api/v1/players/authenticated')
      .then(data => delayForTitle(data.authenticated))
      .catch(error => { 
        console.error("Authentication error: ", error.message)
        delayForTitle(false) 
      });
    
    return () => clearTimeout(timeoutId);
  };

  return(
    <>
      <Routes>
        { isAuthenticated ? (
          <div>Hi</div>
        ) : (
          <>
            <Route path="/" element={
              <LandingPage
                isAuthenticated={ isAuthenticated }
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