// External Imports
import { useState, useContext, createContext, ReactNode } from "react";

interface LoadingContextType {
  isLoading: boolean;
  showLoading: boolean;
  startLoading: () => void;
  stopLoading: (delay?: number) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  let timeoutId: ReturnType<typeof setTimeout>;

  console.log("render loadingContext");
  console.log("isLoading:", isLoading);
  console.log("showLoading:", showLoading);

  //Takes a boolean and an optional delay for length of ending animation
  function setLoadingState(state: boolean, delay?: number): void {
    setIsLoading(state);

    if (state) {
      setShowLoading(true);
      return;
    }

    console.log("Delay:", delay);

    timeoutId = setTimeout(() => setShowLoading(false), delay ?? 2000);
  }

  function startLoading(): void {
    setLoadingState(true);
  }

  function stopLoading(delay = 2000): void {
    setLoadingState(false, delay);
  }

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

function useLoading(): LoadingContextType {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}

export { LoadingProvider, useLoading };
