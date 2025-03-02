//External Imports
import { ReactNode, useState } from "react"

//Components
import SignUpWidget from "./signUpWidget"
import Notification from "../../components/headers/notification/notification";
import LoginWidget from "./loginWidget";

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