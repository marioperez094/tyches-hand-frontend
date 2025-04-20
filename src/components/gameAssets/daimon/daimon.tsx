//Stylesheets
import { useEffect, useMemo, useState } from "react";
import "./daimon.scss";

export default function Daimon({
  animation = "idle",
  rune = "Ω"
}: {
  animation?: string;
  rune?: string;
}) {
  console.log(animation)
  const [animationState, setAnimationState] = useState(animation);

  //Sets it if animation variable changes
  useEffect(() => {
    setAnimationState(animation);
  }, [animation]);

  //Blinks randomly if in an idle animation
  useEffect(() => {
    let blinkTimer: ReturnType<typeof setTimeout>;

    if (animationState === "idle") {
      blinkTimer = setTimeout(() => {
        setAnimationState("blinking");

        setTimeout(() => {
          setAnimationState("idle");
        }, 1000);
      }, Math.random() * 5000 + 5000);
    }

    return () => clearTimeout(blinkTimer);
  }, [animationState]);

  return(
    <div className="float">
      <div className={ `flex ${ animationState }` } >
        <div className="flex justify-center items-center" id="eye">
          <div className="pupil">
            <div className="shine" />
            { rune && 
              <div className="rune">
                { rune }
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
};