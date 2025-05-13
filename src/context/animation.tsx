import { createContext, useContext, useState } from "react";

const AnimationContext = createContext(undefined);

const defaultState = {
  daimon: "idle",
  player: "idle",
};

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [animationState, setAnimationState] = useState(defaultState);

  function setAnimation(key: string, value: string, autoReset: number = 1000) {
    setAnimationState(prev => ({ ...prev, [key]: value }));

    setTimeout(() => {
      setAnimationState(prev => ({ ...prev, [key]: "idle" }));
    }, autoReset);
  };


  return(
    <AnimationContext.Provider value={{
      animationState,
      setAnimation
    }}>
      { children }
    </AnimationContext.Provider>
  )
};

export function useAnimationManager() {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimationManager must be used within AnimationProvider");
  }
  return context;
};