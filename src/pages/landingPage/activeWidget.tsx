//External Imports
import { ReactNode } from "react"

//Components
import SignUpWidget from "./signUpWidget"
import LoginWidget from "./loginWidget";
import RecaptchaText from "./recaptchaText";

export default function ActiveWidget({
  activeWidget,
  submitting,
  setSubmitting,
  successfulLogin,
} : {
  activeWidget: "Options" | "Sign Up" | "Log In";
  submitting: null | "Guest" | "Sign Up" | "Log In";
  setSubmitting: (value: null | "Guest" | "Sign Up" | "Log In") => void;
  successfulLogin: Function;
}): ReactNode {
  
  return(
    <>
      { getActiveWidget(activeWidget, submitting, setSubmitting, successfulLogin) }
      { activeWidget !== "Options" && <RecaptchaText /> }
    </>
  )
};

function getActiveWidget(
  widget: "Options" | "Sign Up" | "Log In",
  submitting: null | "Guest" | "Sign Up" | "Log In",
  setSubmitting: (value: null | "Guest" | "Sign Up" | "Log In") => void,
  successfulLogin: Function
): ReactNode {
  switch (widget) {
    case "Sign Up":
      return <SignUpWidget submitting={ submitting } setSubmitting={ setSubmitting } successfulLogin={ successfulLogin } />
    case "Log In":
      return <LoginWidget submitting={ submitting } setSubmitting={ setSubmitting } successfulLogin={ successfulLogin } />
  };
};