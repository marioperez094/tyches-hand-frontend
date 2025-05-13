//External Imports
import { useState, useEffect } from "react";

//Styles
import "./wagerBottle.scss";
import NumberTicker from "./numberTicker";

export default function WagerBottle({ wager }: { wager: number }) {
  const [value, setValue] = useState(wager); 
  const rawTop = 100 - (100 * (value / 1000));
  const top = Math.min(100, Math.max(1, rawTop));

  return(
    <div className="orb">
      <div className="shine" />
      <div className="w-full h-full flex justify-center items-center wager-text">
        <NumberTicker
          replacement={ wager }
          value={ value }
          setValue={ setValue }
        />
      </div>
      <div className={ `blood-fill ${ wager === value ? "" : "animate-fill"}` }
        style={{ top: `${ top }%`}} 
      />
    </div>
  )
};