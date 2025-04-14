//External Imports
import { ChangeEvent, FormEvent, ReactNode, useState } from "react"

//Components
import Form from "@components/menuComponents/form"

//Functions
import { getRecaptchaToken } from "@utils/utils";

//Types
import SubmittingType from "@pages/landingPage/login";

export default function SignUpWidget({ 
  submitting,
  setSubmitting,
  successfulLogin,
} : { 
  submitting: SubmittingType;
  setSubmitting: (value: "" | "Guest" | "Sign Up" | "Log In") => void;
  successfulLogin: Function;
}): ReactNode {
  const [formData, setFormData] = useState<{[key: string]: string}>({
    username: "",
    password: "",
    password_confirmation: "",
  });

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    setFormData(prevData => 
    ({ ...prevData, [name]: value })
    );
  };

  async function submitForm(e: FormEvent<HTMLFormElement>): Promise<void> {
    if (e) e.preventDefault();
    setSubmitting("Sign Up");

    try {
      const token = await getRecaptchaToken();
      
      const payload: {} = {
        player: formData,
        recaptcha_token: token,
      };

      successfulLogin("/api/v1/players", payload);
    } catch (error: any) {
      setSubmitting("");
      console.error(`Recaptcha error: ${ error.message }`);
    }
  };

  return(
    <Form
      submit={ submitForm }
      formData={ formData }
      change={ handleInputChange }
      submitting={ submitting === "Sign Up" }
      buttonText={ submitting === "Sign Up" ? "Signing Up..." : "Sign Up" }
    />
  )
};