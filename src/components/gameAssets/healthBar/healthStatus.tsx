//External Imports
import { useState } from "react"

//Components
import WoodenPanel from "../panels/woodenPanel";
import NumberTicker from "../wagerBottle/numberTicker";

//Stylesheets
import "./healthStatus.scss";

export default function HealthStatus({
  name,
  health, 
  maxHealth = 5000,
  isPlayer = true,
} : {
  name: string;
  health: number;
  maxHealth?: number;
  isPlayer: boolean;
}) {
  const playerMaxHealth: number = maxHealth;
  const healthBarWidth: number = (health / playerMaxHealth) * 100;
  const [value, setValue] = useState(health); 

  return(
    <div className="health-status-container">
      <WoodenPanel>
        { !isPlayer &&
          <div className="heading-name px-2">
            <h2 className="text-center truncate">
              { name }
            </h2>
          </div>
        }
        <div className="healthbar-container">
          <WoodenPanel>
            <div className="relative healthbar-inner-layer">
              <div className="absolute w-full h-full">
                <div className={ `healthbar-fill ${ isPlayer && "player-health" }` } style={{ width: `${ healthBarWidth }%` }} />
                { isPlayer &&
                  <div className="absolute w-full text-right text-sm font-extrabold healthbar-text">
                    <NumberTicker
                      replacement={ health }
                      duration={ 1000 } 
                      value={ value } 
                      setValue={ setValue } 
                    /> / { maxHealth }
                  </div>
                }
              </div>
            </div>
          </WoodenPanel>
        </div>
      </WoodenPanel>
    </div>
  )
};