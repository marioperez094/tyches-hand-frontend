//External Imports
import { useMemo } from "react";

//Components
import SubHeaders from "@components/headers/subHeaders/subHeaders"

//Functions
import { capitalizeFirstLetter } from "@utils/utils";

export default function GameStats({ 
  stats
} : {
  stats: {
    name: string;
    stat: number;
  }[]
}) {
  
  return(
    <>
      { Object.entries(stats).map(([stat, count]) => {
        return(
          <Stat key={ stat } stat={ stat } count={ count } />
        )
      })}
    </>
  )
};

function Stat({ 
  stat, 
  count
} : { 
  stat: string;
  count: number;
}) {
  const capitalizedStat = useMemo<string>(() => capitalizeFirstLetter(stat), [stat])

  return(
    <li className="w-full flex flex-col justify-between">
      <SubHeaders isHeading={ false }>
        <p className={ `${ stat }-text` }>{ capitalizedStat }: { count }</p>
      </SubHeaders>
    </li>
  )
};