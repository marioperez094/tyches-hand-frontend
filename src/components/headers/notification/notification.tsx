//External Imports
import { ReactNode, useMemo } from "react";

//Functions
import { capitalizeFirstLetter } from "../../../utils/utils";

//Stylesheets
import "./notification.scss";

interface NotificationProps {
  message: string;
  textColor?: "text-red-500" | "text-green-500"; 
}

export default function Notification({
  message,
  textColor = "text-red-500"
} : NotificationProps
): ReactNode {
  console.log("render Notification");
  const capitalizedMessage = useMemo<string>(() => capitalizeFirstLetter(message), [message])

  return(
    <div className={ `${ textColor } text-lg notification` }>
      <p className="text-center">
        { capitalizedMessage }
      </p>
    </div>
  )
};