//External Imports
import { useMemo } from "react";

//Context
import { useLoading } from "../../../context/loading";

//Components
import LoadingLine from "./loadingLine";

//Stylesheets
import "./loadingScreen.scss";

import loadingScreenText from "../../../utils/loadingScreenText.json";

export default function LoadingScreen() {
  const { isLoading } = useLoading();

  //Select a random loading text array
  const selectedLoadingLines = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * loadingScreenText.loadingScreenText.length);
    return loadingScreenText.loadingScreenText[randomIndex];
  }, []);

  return(
    <main className="h-full">
      <ul className="w-full h-full flex flex-col justify-center items-center">
        { selectedLoadingLines.map((line, index) => 
          <LoadingLine 
            key={ index } 
            animationDelay={ index } 
            loadingLine={ line }
            isLoading={ isLoading }
          />
        )}
      </ul>
    </main>
  )
};