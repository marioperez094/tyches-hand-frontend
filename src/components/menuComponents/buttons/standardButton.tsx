//External Imports
import { MouseEvent, ButtonHTMLAttributes, ReactNode } from "react";

//Stylesheets 
import "./buttons.scss";

interface StandardButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: "button" | "submit" | "reset";
  action?: (event: MouseEvent<HTMLButtonElement>) => void;
  inverse?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

export default function StandardButton({
  buttonType = "button",
  action = () => {},
  inverse = false,
  disabled = false,
  children,
  ...props

}: StandardButtonProps): ReactNode {
  console.log("render StandardButton")
  
  return(
    <button
      type={ buttonType }
      onClick={ action }
      className={ `text-white uppercase font-bold ${ inverse ? "inverse-button-colors" : "standard-button-colors" }` }
      disabled={ disabled }
      { ...props }
    >
      { children }
    </button>
  )
};