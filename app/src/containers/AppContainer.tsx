import React, { useState, useContext, createContext } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import NavBar from '../components/top/NavBar';
import LeftContainer from './LeftContainer';
import MainContainer from './MainContainer';
import RightContainer from './RightContainer';
import { theme1, theme2 } from '../public/styles/theme';
import { makeStyles } from '@material-ui/core/styles';


export const styleContext = createContext({
  style: null,
  setStyle: null
});

// setting light and dark themes (navbar and background); linked to theme.ts
const lightTheme = theme1;
const darkTheme = theme2; // dark mode color in theme.ts not reached

export const themeContext = createContext({
  
})
const AppContainer = () => {

  // setting state for changing light vs dark themes; linked to NavBar.tsx
  const [isThemeLight, setTheme] = useState(true);

  const initialStyle = useContext(styleContext);
  const [style, setStyle] = useState(initialStyle);


  return (
    // Mui theme provider provides themed styling to all MUI components in app
    <MuiThemeProvider theme={isThemeLight ? lightTheme : darkTheme}>
      <styleContext.Provider value={{ style, setStyle }}>
      <div>
        <NavBar setTheme={setTheme} isThemeLight={isThemeLight}/>
      </div>
      <div className="app-container">
        
            <LeftContainer isThemeLight={isThemeLight}/>
            <MainContainer isThemeLight={isThemeLight}/>
            <RightContainer isThemeLight={isThemeLight}/>

      </div>
      </styleContext.Provider>
    </MuiThemeProvider>
  );
};

export default AppContainer;
