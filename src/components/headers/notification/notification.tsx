//External Imports
import { ReactNode, useMemo } from "react";

//Functions
import { capitalizeFirstLetter } from "../../../utils/utils";

//Stylesheets
import "./notification.scss";

interface NotificationProps {
  message: string;
  className?: string; 
}

export default function Notification({
  message,
  className = "text-red-500"
} : NotificationProps
): ReactNode {
  console.log("render Notification");
  const capitalizedMessage = useMemo<string>(() => capitalizeFirstLetter(message), [message])

  return(
    <div className={ `${ className } text-lg notification` }>
      <p className="text-center">
        { capitalizedMessage }
      </p>
    </div>
  )
};