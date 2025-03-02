//External Imports
import { ReactNode, useEffect } from "react";

//Components
import Logo from "../../components/gameAssets/logo/logo";

//Stylesheets
import "./landingPage.scss";
import Login from "./login";

export default function LandingPage({
  isAuthenticated,
  setIsAuthenticated,
  checkAuthentication,
} : {
  isAuthenticated: null | boolean;
  setIsAuthenticated: (value: null | boolean) => void;
  checkAuthentication: Function;
}): ReactNode {
  
  console.log("render LandingPage")

  useEffect(() => {
    const cleanup = checkAuthentication();

    return cleanup;
  }, []);

  return(
    <div className="h-full flex flex-col justify-center items-center" id="landing-page">
      <div className={ !isAuthenticated ? "shift-up" : "" }>
        <Logo />
      </div>

      <main className={ `main-menu-container ${ isAuthenticated === false ? "visible" : "" }` }>
        { isAuthenticated === null && null }
        
        { /* Only displays login after authentication returns false */}
        { isAuthenticated === false && <Login setIsAuthenticated={ setIsAuthenticated } /> }
      </main>
    </div>
  )
};