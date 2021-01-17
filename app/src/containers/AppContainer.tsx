import React, { useState, useContext, createContext } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import NavBar from '../components/top/NavBar';
import LeftContainer from './LeftContainer';
import MainContainer from './MainContainer';
import RightContainer from './RightContainer';
import { theme1 } from '../public/styles/theme';
import { makeStyles } from '@material-ui/core/styles';

export const styleContext = createContext({
  style: null,
  setStyle: null
});

//use context to enable darkmode functionality on navbar

const AppContainer = () => {
  //theme1 sets button font color to green
  const [theme, setTheme] = useState(theme1);
  const initialStyle = useContext(styleContext);
  const [style, setStyle] = useState(initialStyle);


  return (
    // Mui theme provider provides themed styling to all MUI components in app
    <MuiThemeProvider theme={theme}>
      <div>
        <NavBar />
      </div>
      <div className="app-container">
        <styleContext.Provider value={{ style, setStyle }}>
          
          {/* <div id="columns-container"> */}
            <LeftContainer />
            <MainContainer />
            <RightContainer />
        </styleContext.Provider>
      {/* </div> */}
      </div>
    </MuiThemeProvider>
  );
};

export default AppContainer;
