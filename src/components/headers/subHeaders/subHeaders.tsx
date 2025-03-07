//External Imports
import { ReactNode } from "react";

//Stylesheets
import "./subHeaders.scss";

export default function SubHeaders({ 
  children,
  isHeading = false, 
} : { 
  children: ReactNode;
  isHeading?: boolean; 
}) {
  console.log("render SubHeaders")
  
  return(
    <div className={ `${ isHeading ? "mx-5 my-5" : "mx-10 my-3" }` }>
      <div className="w-full text-center player-stat border-b-4">
        <div className="text-white font-bold ">{ children }</div>
      </div>
    </div>
  )
};