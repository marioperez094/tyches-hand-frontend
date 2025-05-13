//Components
import WoodenPanel from "@components/gameAssets/panels/woodenPanel";

//Styles
import "./woodenButtons.scss";

interface StandardButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: "button" | "submit" | "reset";
  action?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export default function WoodenButton({
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
      className="text-end wooden-button"
      disabled={ disabled }
      { ...props }
    >
      <WoodenPanel>
        <div className="button-inner-content">
          <p className="w-full text-center">
            { children }
          </p>
        </div>
      </WoodenPanel>
    </button>
  )
};