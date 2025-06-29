import { createContext, useState } from "react";

export const ThemeContext = createContext();
const ThemeProvider = ({ children }) => {
  // true refer light, false refer dark
  const [theme, setTheme] = useState(false);
  const toggleTheme = () => {
    setTheme(!theme);
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
