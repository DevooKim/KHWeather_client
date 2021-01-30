import { useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState("light");

  const setMode = (mode) => {
    setTheme(mode);
  };

  const toggleTheme = () => {
    setMode(theme === "light" ? "dark" : "light");

    // Component.forceUpdate = (props) => {
    //   return props.theme !== theme;
    // };
  };

  return [theme, toggleTheme];
};
