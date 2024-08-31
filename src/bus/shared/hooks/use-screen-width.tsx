import React from "react";

const LESS_MENU_SIZE = 145;
const MINIMUM_WIDTH_TABLES = 235;
//TODO: This hook is exclusive to determine the container of the table and make it responsive
export function useScreenWidth() {
  const [screenWidth, setScreenWidth] = React.useState<number>(
    getScreenWidth()
  );

  React.useEffect(() => {
    const handleResize = () => {
      setScreenWidth(getScreenWidth());
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function getScreenWidth() {
    const newWidth = window.innerWidth - LESS_MENU_SIZE;
    if (window.innerWidth <= 600) return window.innerWidth - 95;
    if (newWidth < MINIMUM_WIDTH_TABLES) return MINIMUM_WIDTH_TABLES;
    return newWidth;
  }

  return screenWidth;
}
