//External Imports
import { useEffect } from "react";

//Components
import Logo from "../../components/logo/logo";

//Stylesheets
import "./landingPage.scss";

export default function LandingPage({
  isAuthenticated,
  checkAuthentication
} : {
  isAuthenticated: boolean | null;
  checkAuthentication: Function;
}) {
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
        { isAuthenticated === false && <div className="text-white">Hi</div>}
      </main>
    </div>
  )
};