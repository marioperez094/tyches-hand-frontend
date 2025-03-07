//External Imports
import { MouseEvent, ButtonHTMLAttributes, ReactNode } from "react";

//Stylesheets 
import "./buttons.scss";

interface StandardButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: "button" | "submit" | "reset";
  action?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export default function StandardButton({
  buttonType = "button",
  action = () => {},
  disabled = false,
  children,
  ...props

}: StandardButtonProps): ReactNode {
  console.log("render StandardButton")
  
  return(
    <button
      type={ buttonType }
      onClick={ action }
      className="text-white uppercase font-bold standard-button"
      disabled={ disabled }
      { ...props }
    >
      { children }
    </button>
  )
};