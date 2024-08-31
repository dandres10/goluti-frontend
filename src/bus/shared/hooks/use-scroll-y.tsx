import { useEffect, useState } from "react";

export function useScrollY() {
  const [isScrollVerticalActive, setIsScrollVerticalActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrollVerticalActive(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isScrollVerticalActive;
}
