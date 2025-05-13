//External Imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

//Context
import { useLoading } from "@context/loading";

//Components
import UserEntryWidget from "./userEntryWidget";
import Notification from "@components/headers/notification/notification";
import StandardButton from "@components/menuComponents/buttons/standardButton";

//Function
import { postRequest } from "../../utils/fetchRequest";
import { getRecaptchaToken, loadRecaptchaScript } from "../../utils/utils";

interface LoginResponse {
  success: boolean;
  token: string;
};

type SubmittingType = "" | "Guest" | "Sign Up" | "Log In"

export default function Login({
  setIsAuthenticated
} : {
  setIsAuthenticated: (value: boolean) => void;
}) {
  const navigate = useNavigate();
  const { startLoading } = useLoading();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [submitting, setSubmitting] = useState<SubmittingType>("");

  useEffect(() => {
    const cleanup = loadRecaptchaScript();
    return () => cleanup();
  }, []);

  async function submitGuest(e: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    if (e) e.preventDefault();
    setSubmitting("Guest");

    try {
      const token = await getRecaptchaToken();

      const payload: {} = {
        player: { is_guest: true },
        recaptcha_token: token,
      };

      successfulLogin("/api/v1/players", payload);
    } catch (error: any) {
      setSubmitting("");
      setErrorMessage(error.message)
      console.error(`Recaptcha error: ${ error.message }`)
    }
  };

  function successfulLogin(url: string, payload: object): void {
    postRequest<LoginResponse>(`${ url }`, payload)
      .then(data => {
        if (data.success) {
          startLoading();
          localStorage.setItem("jwt", data.token);
          setIsAuthenticated(true);
          redirection(url);
        };
      })
      .catch(error => {
        setErrorMessage(error.message);
        console.error(`Guest Error: ${ error.message }`);
        setSubmitting("");
      })
  }

  //Redirects to tutorial if it's a new account or to the dashboard if logging in
  function redirection(url: string) {
    const redirectTo = url === "/api/v1/players" ? "/game" : "/dashboard";
    navigate(redirectTo, { replace: true });
  };

  return(
    <div className="w-full h-full border-t-4 widget-container">
      <div className="overflow-y-scroll w-full h-full">
        { errorMessage && <Notification message={ errorMessage } /> }

        <UserEntryWidget
          submitting={ submitting }
          setSubmitting={ setSubmitting }
          successfulLogin={ successfulLogin }
        />
        <StandardButton
          action={ (e: React.MouseEvent<HTMLButtonElement>) => submitGuest(e) }
          buttonType="button"
          disabled={ submitting === "Guest" }
        >
          { submitting === "Guest" ? "Creating Account..." : "Guest"}
        </StandardButton>
      </div>
    </div>
  )
};