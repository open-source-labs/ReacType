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

// const theme = createMuiTheme(theme1);
const lightTheme = theme1;
const darkTheme = theme2;
console.log('dark', darkTheme)

const AppContainer = () => {

  const [isThemeLight, setTheme] = useState(true);

  const initialStyle = useContext(styleContext);
  const [style, setStyle] = useState(initialStyle);


  return (
    // Mui theme provider provides themed styling to all MUI components in app
    <MuiThemeProvider theme={isThemeLight ? createMuiTheme(lightTheme) : createMuiTheme(darkTheme)}>
      <styleContext.Provider value={{ style, setStyle }}>
      <div>
        <NavBar setTheme={setTheme} isThemeLight={isThemeLight}/>
      </div>
      <div className="app-container">
        
          {/* <div id="columns-container"> */}
            <LeftContainer />
            <MainContainer />
            <RightContainer />

      {/* </div> */}
      </div>
      </styleContext.Provider>
    </MuiThemeProvider>
  );
};

export default AppContainer;
