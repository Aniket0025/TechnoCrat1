import { useState } from "react";

export function useDarkMode(): [boolean, () => void] {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("darkMode");
      return stored ? stored === "true" : false;
    }
    return false;
  });

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      localStorage.setItem("darkMode", String(!prev));
      document.documentElement.classList.toggle("dark", !prev);
      return !prev;
    });
  };

  return [darkMode, toggleDarkMode];
}
