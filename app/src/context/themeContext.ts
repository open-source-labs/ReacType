import React from "react";
const ThemeContext = React.createContext({
    theme: "light",
    setTheme: () => {},
})
export default ThemeContext;