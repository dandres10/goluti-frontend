import { useState, useEffect } from "react";

export function useFullWidth() {
  const [availableHeight, setAvailableHeight] = useState(601);

  useEffect(() => {
    function handleResize() {
      setTimeout(() => {
        setAvailableHeight(window.innerWidth);
      }, 200);
    }
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("load", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return availableHeight;
}
