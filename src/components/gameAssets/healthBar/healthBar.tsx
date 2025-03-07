//Stylesheet
import "./healthBar.scss";

export function HealthBarWithName({
  name,
  health,
  isPlayer = false
} : { 
  name: string;
  health: number;
  isPlayer?: boolean;
}) {
  const maxNameLength: number = 14;
  const shortenName: string = name.length < maxNameLength ? name : name.slice(0, maxNameLength) + "...";//Shortens player username

  console.log("render HealthBarWithname")

  return(
    <div className={ `health-bar-wrapper textured-gray-border ${ isPlayer && "player-health-bar" }` }>
      <div className={ `health-background` }>
        <HealthBar health={ health } isPlayer={ isPlayer } />
        <div className="relative name-container textured-gray-border">
          <div className="absolute w-full h-full name-background flex items-center">
            <div className={ `absolute w-full text-white text-center text-2xl name-text ${ isPlayer && "player-name-text"}` }>{ shortenName }</div>
          </div>
        </div>
      </div>
    </div>
  )
};

export function HealthBar({ 
  health,
  isPlayer,
} : {
  health: number;
  isPlayer: boolean;
}) {
  const playerMaxHealth: number = 5000;
  const healthBarWidth: number = (health / playerMaxHealth) * 100;
  const lowHealthEffect: string | boolean = healthBarWidth < 50 && isPlayer && "low-health";

  return (
    <div className={ `relative health-bar-container textured-gray-border ${ lowHealthEffect }` }>
      <div className="absolute w-full h-full">
        <div className={ `health-bar-fill ${ isPlayer && "player-blood-pool" }` } style={{ width: `${ healthBarWidth }%`}} />
        { isPlayer && 
          <div className="absolute text-white text-sm font-extrabold health-bar-text">
            { health } / { playerMaxHealth }
          </div> 
        }
      </div>
    </div>
  )
}