//Components
import WoodenPanel from "@components/gameAssets/panels/woodenPanel";

//Styles
import "./dialogueBox.scss";
import WoodenButton from "../../menuComponents/buttons/woodeButtons/woodenButtons";

export default function DialogueBox({
  dialogueLine,
}: {
  dialogueLine: string;
}) {
  return(
    <div className="flex dialogue-box">
      <WoodenPanel>
        <div className="flex items-center w-full inner-content">
          <p key={ dialogueLine } className="dialogue-line text-center">{ dialogueLine }</p>
        </div>
      </WoodenPanel>
    </div>
  )
};