//External Imports
import { useState, ReactNode, ChangeEvent, FormEvent } from "react";

//Components
import Form from "../../components/menuComponents/form";

export default function LoginWidget({ 
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
    password: ""
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
    setSubmitting("Log In");

    const payload: { player: { [key: string]: string }} = {
      player: formData
    };

    successfulLogin("/login", payload);
  };

  return(
    <Form
      submit={ handleSubmit }
      formData={ formData }
      change={ handleInputChange }
      submitting={ submitting === "Log In" }
      buttonText={ submitting === "Log In" ? "Logging In..." : "Log In" }
    />
  )
}