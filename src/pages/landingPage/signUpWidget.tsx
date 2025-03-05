//Components
import { ChangeEvent, FormEvent, ReactNode, useState } from "react"
import Form from "../../components/menuComponents/form"
import { getRecaptchaToken } from "../../utils/utils";

export default function SignUpWidget({ 
  submitting,
  setSubmitting,
  successfulLogin,
} : { 
  submitting: null | "Guest" | "Sign Up" | "Log In";
  setSubmitting: (value: null | "Guest" | "Sign Up" | "Log In") => void;
  successfulLogin: Function;
}): ReactNode {
  const [formData, setFormData] = useState<{[key: string]: string}>({
    username: "",
    password: "",
    password_confirmation: "",
  });

  console.log("render SignUpWidget")
  console.log("form data: ", formData)

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
      setSubmitting(null);
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