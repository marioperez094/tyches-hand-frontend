//External Imports
import { useState } from "react";

//Components
import ActiveWidget from "./activeWidget";
import StandardButton from "@components/menuComponents/buttons/standardButton";

const userEntryOptions: { name: "Sign Up" | "Log In" }[] = [
  { name: "Sign Up" },
  { name: "Log In" }
]

export default function UserEntryWidget({
  submitting,
  setSubmitting,
  successfulLogin, 
} : {
  submitting: "" | "Guest" | "Sign Up" | "Log In";
  setSubmitting: (value: "" | "Guest" | "Sign Up" | "Log In") => void;
  successfulLogin: (url: string, payload: object) => void;
}) {
  const [activeWidget, setActiveWidget] = useState<"Options" | "Sign Up" | "Log In">("Options");

  return(
    <>
      <ActiveWidget
        activeWidget={ activeWidget }
        submitting={ submitting }
        setSubmitting={ setSubmitting }
        successfulLogin={ successfulLogin }
      />
      { userEntryOptions.map(option =>
        activeWidget !== option.name ?
          <StandardButton
            key={ option.name }
            action={ () => setActiveWidget( option.name )}
          >
            { option.name }
          </StandardButton>
          : null
      )}
    </>
  )
}