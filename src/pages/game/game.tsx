//Components
import HealthStatus from "@components/gameAssets/healthBar/healthStatus";

//Stylesheets
import "./game.scss";
import Daimon from "../../components/gameAssets/daimon/daimon";

export default function Game() {
  return(
    <>
      <div className="flex justify-center">
      <HealthStatus 
        name="The Draw"
        health={ 5000 }
        isPlayer={ false }
      />
      </div>

      <div className="flex justify-center">
        <Daimon
          animation="attacking" 
        />
      </div>

      <div className="flex justify-center">
        <HealthStatus 
          name="Newbie"
          health={ 5000 }
        />
      </div>
    </>
  )
};