//External Imports
import { useState, useContext, createContext, ReactNode, } from "react";

interface LoadingContextType {
  isLoading: boolean;
  showLoading: boolean;
  startLoading: () => void;
  stopLoading: (delay?: number) => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

function LoadingProvider ({ children } : { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState<boolean>(false);

  console.log("render loadingContext");
  console.log("isLoading: " + isLoading);
  console.log("showLoading: " + showLoading);

  //Takes a boolean and a delay for length of ending animation
  function setLoadingState(state: boolean, delay?: number) {
    setIsLoading(state);

    if (state) return setShowLoading(true);

    console.log(delay)

    return setTimeout(() => setShowLoading(false), delay);
  };

  function startLoading(): void {
    setLoadingState(true);
  };

  function stopLoading(delay = 2000): void {
    setLoadingState(false, delay);
  };

  return(
    <LoadingContext.Provider value={{ isLoading, showLoading, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  )
};

function useLoading() {
  return useContext(LoadingContext);
};

export { LoadingProvider, useLoading };

