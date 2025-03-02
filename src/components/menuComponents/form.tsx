//Components
import { ChangeEvent, FormEvent, ReactNode } from "react"
import StandardButton from "./buttons/standardButton"
import InputField from "./inputFields/inputFields"

export default function Form({ 
  submit,
  formData,
  change,
  buttonText,
  submitting, 
} : {
  submit: (event: FormEvent<HTMLFormElement>) => void;
  formData: { [key: string]: string };
  change: (event: ChangeEvent<HTMLInputElement>) => void;
  buttonText: string;
  submitting: boolean;
}): ReactNode {
  console.log("render Form")

  return(
    <form onSubmit={ submit } id="form">
      <div className="py-2 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">

        { /* Generate input fields dynamically */
          Object.entries(formData).map(([fieldName, value]) => {
            return(
              <InputField
                key={ fieldName }
                name={ fieldName }
                change={ change }
                inputType={ fieldName === "username" ? "text" : "password" }
                value={ value }
                autoComplete={ fieldName === "password" ? "current-password" : "off" }
              />
            )
        })}
        <div className="px-5">
          <StandardButton
            type="submit"
            disabled={ submitting }
          >
            { buttonText }
          </StandardButton>
        </div>
      </div>
    </form>
  )
};