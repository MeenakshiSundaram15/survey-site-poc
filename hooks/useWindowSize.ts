import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({ windowHeight: 0, windowWidth: 0 });
  const { windowHeight, windowWidth } = windowSize;

  useEffect(() => {
    const setSize = () => {
      setWindowSize({
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth,
      });
    };

    window.addEventListener("resize", setSize);
    setSize();
    return () => {
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return {
    windowHeight,
    windowWidth,
  };
};
