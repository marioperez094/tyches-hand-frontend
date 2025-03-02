//External Imports
import { ReactNode, useState } from "react";

//Components
import StandardButton from "../../components/menuComponents/buttons/standardButton"
import ActiveWidget from "./activeWidget";

export default function UserEntryWidget({
  options,
  submitting,
  setSubmitting,
  successfulLogin,  
}: { 
  options: { name: "Sign Up" | "Log In" }[];
  submitting: null | "Guest" | "Sign Up" | "Log In";
  setSubmitting: (value: null | "Guest" | "Sign Up" | "Log In") => void;
  successfulLogin: Function;
}): ReactNode {
  const [activeWidget, setActiveWidget] = useState<"Options" | "Sign Up" | "Log In">("Options");

  console.log("render UserEntryWidget")
  console.log("ActiveWidget: ", activeWidget)
  
  return(
    <>
      <ActiveWidget
        activeWidget={ activeWidget }
        submitting={ submitting }
        setSubmitting={ setSubmitting }
        successfulLogin={ successfulLogin }
      />
      { options.map(option => 
        activeWidget !== option.name ?
          <StandardButton
            key={ option.name }
            action={ () => setActiveWidget(option.name) }
          >
            { option.name }
          </StandardButton>
        : null
      )}
    </>
  )
};