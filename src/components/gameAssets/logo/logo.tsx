//External Imports
import { ReactNode } from "react";

//Stylesheets
import "./logo.scss";

export default function Logo(): ReactNode {
  console.log("render Logo");
  
  return (
    <header className="sm:mx-auto sm:w-full sm:max-w-4xl text-center" id="logo">
      <h1 className="mt-6 text-center text-6xl sm:text-8xl font-extrabold title-text">
        Tyche's Hand
      </h1>
      <div className="mx-auto border-container" data-testid="border-container">
        <div className="border-t-8 textured-border">
        </div>
        <span className="text-4xl four-suits">
          &#9829;
        </span>
        <span className="text-4xl four-suits">
          &#9830;
        </span>
        <span className="text-4xl four-suits">
          &#9827;
        </span>
        <span className="text-4xl four-suits">
          &#9824;
        </span>
      </div>
    </header>
  )
};