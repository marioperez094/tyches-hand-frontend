//External Imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

//Context
import { useLoading } from "@context/loading";

//Components
import Login from "./login";
import Logo from "@components/gameAssets/logo/logo";

//Functions
import { getRequest } from "../../utils/fetchRequest";

//Stylesheets
import "./landingPage.scss";

export default function Landing({ 
  setIsAuthenticated
} : { 
  setIsAuthenticated: (value: boolean) => void;
}) {
  const navigate = useNavigate();
  const { startLoading } = useLoading();
  const [showLogo, setShowLogo] = useState<boolean>(true);

  useEffect(() => {
    //Allows the title to appear before redirecting
    const animationDelay = 1250
    let timer: ReturnType<typeof setTimeout>;

    function handleShowLogin() {
      timer = setTimeout(() => setShowLogo(false), animationDelay);
    };

    function handleRedirect() {
      timer = setTimeout(() => {
        startLoading();
        navigate("/game");
      }, animationDelay);
    };

    getRequest<{ authenticated: boolean }>("/api/v1/players/authenticated")
      .then(data => {
        setIsAuthenticated(data.authenticated);
        /*Shows logo for animationDelay then either redirects or moves the logo up
          to give main menu space*/ 
        data.authenticated ? handleRedirect() : handleShowLogin()
      })
      .catch(() => {
        setIsAuthenticated(false);
        handleShowLogin();
      });

    return () => clearTimeout(timer);
  }, []);

  return(
    <div 
      className="h-full flex flex-col justify-center items-center"
      id="landing-page"
    >
      <Logo />

      <main className={ `main-menu-container ${ !showLogo ? "visible" : "" }` }>
        
        {/* Only displays login after authentication returns false */}
        { !showLogo && <Login setIsAuthenticated={ setIsAuthenticated } /> }
      </main>
    </div>
  )
};