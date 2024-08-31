import { useState, useEffect } from "react";

export function useFullHeight() {
  const [availableHeight, setAvailableHeight] = useState("100vh");

  useEffect(() => {
    function handleResize() {
      setAvailableHeight("100vh");
      setTimeout(() => {
        /* const height = document.documentElement.scrollHeight; */
        const height = window.innerHeight;
        setAvailableHeight(`${height}`);
      }, 1000);
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
