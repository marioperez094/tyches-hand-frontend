//External Imports
import { ReactNode } from "react";

//Stylesheet
import "./woodenPanel.scss";

export default function WoodenPanel({ 
  children
} : {
  children: ReactNode
}) {
  return(
    <div className="wooden-panel-container">
      <div className="wooden-layer">
        <div className="dark-seam">
          <div className="wooden-layer">
            { children }
          </div>
        </div>
      </div>
    </div>
  )
}