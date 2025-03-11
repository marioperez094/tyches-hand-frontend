//External Imports
import { MouseEvent } from "react";

//Components
import StandardButton from "../buttons/standardButton";
import Notification from "../../headers/notification/notification";

//Stylesheets
import "./editorButtons.scss";

interface buttonProps {
  name: string;
  action: (() => void) | ((e: MouseEvent<HTMLButtonElement>) => void);
}

export default function EditorButtons({
  buttons,
  message
} : {
  buttons: buttonProps[];
  message: string | null;
}) {
  console.log("message: ", message);

  const greenMessage = message === "Deck Saved!" || "Token Slots Saved";
  return(
    <div className="sticky top-0 editor-buttons-container overflow-x-scroll">
      <div className="flex justify-center editor-buttons w-full">
        { buttons.map(button => (
          <StandardButton
            action={ button.action }
          >
            { button.name }
          </StandardButton>
        ))}
      </div>
      <div className="relative editor-message-container"> {/* Ensures space for Notification */}
        { message &&
          <Notification 
            message={message} 
            className={`absolute top-0 left-0 w-full ${ greenMessage ? "text-green-500" : "text-red-500" }`} 
          />  
        }
      </div>
    </div>
  )
};