//External Imports
import { ChangeEvent, InputHTMLAttributes, ReactNode, useMemo } from "react";

//Functions
import { capitalizeFirstLetter } from "../../../utils/utils";

//Stylesheets
import "./inputField.scss";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  inputType: "text" | "password" | "email";
  value: string;
  change: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export default function InputField({
  name,
  inputType,
  value,
  change,
  required = true,
  ...props
}: InputFieldProps): ReactNode {
  const capitalizedLabel = useMemo(() => capitalizeFirstLetter(name) , [name]);

  console.log("render InputField")

  return(
    <input
      id={ name }
      name={ name }
      type={ inputType }
      value={ value }
      className="w-full px-4 text-field"
      placeholder={ capitalizedLabel }
      onChange={ change }
      required={ required }
      { ...props }
    />
  )
}