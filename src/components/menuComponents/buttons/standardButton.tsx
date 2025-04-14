//Stylesheets 
import "./buttons.scss";

interface StandardButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: "button" | "submit" | "reset";
  action?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export default function StandardButton({
  buttonType = "button",
  action = () => {},
  disabled = false,
  children,
  ...props

}: StandardButtonProps) {
  
  return(
    <button
      type={ buttonType }
      onClick={ action }
      className={ `text-white uppercase font-bold ${ disabled ? "disabled-button" : "standard-button" } ` }
      disabled={ disabled }
      { ...props }
    >
      { children }
    </button>
  )
};