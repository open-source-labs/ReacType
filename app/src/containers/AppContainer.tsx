import React, { useState, useContext, createContext } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import LeftContainer from './LeftContainer';
import MainContainer from './MainContainer';
import RightContainer from './RightContainer';
import { theme1 } from '../public/styles/theme';
import { makeStyles } from '@material-ui/core/styles';

export const styleContext = createContext({});
// console.log('styleContext: ', styleContext);

const AppContainer = () => {
  const [theme, setTheme] = useState(theme1);
  const initialStyle = useContext(styleContext);
  const [style, setStyle] = useState(initialStyle);

  return (
    // Mui theme provider provides themed styling to all MUI components in app
    <MuiThemeProvider theme={theme}>
      <div className="app-container">
        <styleContext.Provider value={{ style, setStyle }}>
          <LeftContainer />
          <MainContainer />
          <RightContainer />
        </styleContext.Provider>
      </div>
    </MuiThemeProvider>
  );
};

export default AppContainer;
