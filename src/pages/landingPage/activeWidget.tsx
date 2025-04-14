//Components
import LoginWidget from "./loginWidget";
import SignUpWidget from "./signUpWidget";
import RecaptchaText from "./recaptchaText";

export default function ActiveWidget({
  activeWidget,
  submitting,
  setSubmitting,
  successfulLogin
} : {
  activeWidget: "Options" | "Sign Up" | "Log In";
  submitting: "" | "Guest" | "Sign Up" | "Log In";
  setSubmitting: (value: null | "Guest" | "Sign Up" | "Log In") => void;
  successfulLogin: (url: string, payload: object) => void;
}) {

  return (
    <>
      { getActiveWidget(activeWidget, submitting, setSubmitting, successfulLogin ) }
      { activeWidget !== "Options" && <RecaptchaText /> }
    </>
  )
};

function getActiveWidget(
  widget: "Options" | "Sign Up" | "Log In",
  submitting: "" | "Guest" | "Sign Up" | "Log In",
  setSubmitting: (value: null | "Guest" | "Sign Up" | "Log In") => void,
  successfulLogin: Function
) {
  switch (widget) {
    case "Sign Up":
      return <SignUpWidget submitting={ submitting } setSubmitting={ setSubmitting } successfulLogin={ successfulLogin } />
    case "Log In":
      return <LoginWidget submitting={ submitting } setSubmitting={ setSubmitting } successfulLogin={ successfulLogin } />
  };
};