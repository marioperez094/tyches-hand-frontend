//External Imports
import { ReactNode, useState } from "react";

//Context
import { useLoading } from "../../context/loading";

//Components
import StandardButton from "../../components/menuComponents/buttons/standardButton";
import UserEntryWidget from "./userEntryWidget";
import Notification from "../../components/headers/notification/notification";

//Functions
import { postRequest } from "../../utils/fetchRequest";

interface LoginResponse {
  success: boolean;
  token: string;
}


export default function Login({ 
  setIsAuthenticated 
} : { 
  setIsAuthenticated: (value: null | boolean) => void 
}): ReactNode {
  const { startLoading } = useLoading();
  const [submitting, setSubmitting] = useState<null | "Guest" | "Sign Up" | "Log In">(null);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);


  console.log("render Login")
  console.log("submitting: ", submitting)

  //Login options 
  const userEntryOptions: { name: "Sign Up" | "Log In" }[] = [
    { name: "Sign Up" },
    { name: "Log In" }
  ];

  function submitGuest(e: React.MouseEvent<HTMLButtonElement>): void {
    if (e) e.preventDefault();
    setSubmitting("Guest");

    const payload = {
      player: { is_guest: true }
    };

    successfulLogin("", payload); 
  };

  function successfulLogin(url: string, payload: object): void {
    postRequest<LoginResponse>(`/api/v1/players${ url }`, payload)
      .then(data => {
        if (data.success) {
          localStorage.setItem('jwt', data.token);
          setIsAuthenticated(true);
          startLoading();
        }
      })
      .catch(error => {
        console.log(error) 
        setErrorMessage(error.message);
        console.error(`Guest Error: ${ error.message }`);
        setSubmitting(null);
      })
  };

  return(
    <div className="w-full h-full border-t-4 widget-container">
      <div className="overflow-y-scroll w-full h-full">
        { errorMessage && <Notification message={ errorMessage } /> }

        <UserEntryWidget
          options={ userEntryOptions }
          submitting={ submitting }
          setSubmitting={ setSubmitting }
          successfulLogin={ successfulLogin }
        />
        <StandardButton
          action={ (e) => submitGuest(e) }
          inverse= { submitting === "Guest" }
          disabled={ submitting === "Guest" }
        >
          { submitting === "Guest" ? "Creating Account..." : "Guest" }
        </StandardButton>
      </div>
    </div>
  )
};