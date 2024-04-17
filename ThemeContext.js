import React, { createContext, useState } from 'react';

// MY CODE HERE
const ThemeContext = createContext();
// get state of theme, usestate set to false
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setDarkMode] = useState(false);

  // initialise toggleDarkMode and then setDarkMode using previous mode of theme
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // return 
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;

// MY CODE ENDS HERE
