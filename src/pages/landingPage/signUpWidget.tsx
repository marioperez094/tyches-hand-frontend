//Components
import { ChangeEvent, FormEvent, ReactNode, useState } from "react"
import Form from "../../components/menuComponents/form"

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

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    if (e) e.preventDefault();
    setSubmitting("Sign Up");

    submitForm();
  };

  function submitForm(): void {
    const payload: { player: {[key: string]: string} } = {
      player: formData
    };

    successfulLogin("", payload);
  };

  return(
    <Form
      submit={ handleSubmit }
      formData={ formData }
      change={ handleInputChange }
      submitting={ submitting === "Sign Up" }
      buttonText={ submitting === "Sign Up" ? "Signing Up..." : "Sign Up" }
    />
  )
};