import React, { useState, useContext, createContext, useEffect } from 'react';
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import NavBar from '../components/top/NavBar';
import LeftContainer from './LeftContainer';
import MainContainer from './MainContainer';
import RightContainer from './CustomizationPanel';
import { theme1, theme2 } from '../public/styles/theme';
import { connect } from 'react-redux';
import * as actions from '../redux/actions/actions';
// import { createTheme, ThemeProvider } from '@mui/material/styles'

const mapDispatchToProps = (dispatch) => ({
  darkModeToggle: () => {
    dispatch(actions.darkModeToggle());
  }
});

const mapStateToProps = (state) => {
  return {
    darkMode: state.darkModeSlice.darkMode
  }
}


export const styleContext = createContext({
  style: null,
  setStyle: null,
  isThemeLight: null,
});
// setting light and dark themes (navbar and background); linked to theme.ts
const lightTheme = theme1;
const darkTheme = theme2; // dark mode color in theme.ts not reached
const AppContainer = (props) => {
  // setting state for changing light vs dark themes; linked to NavBar.tsx
  const [isThemeLight, setTheme] = useState(!props.darkMode);
  const initialStyle = useContext(styleContext);
  const [style, setStyle] = useState(initialStyle);

  // Set background color of left and bottom panel on the first render
  // Without this hook, the first render is always going to be white
  useEffect(() => {
    if (isThemeLight) setStyle(null);
    else setStyle({ backgroundColor: '#21262c' });
  }, []);

  return (
    // Mui theme provider provides themed styling to all MUI components in app
    <MuiThemeProvider theme={isThemeLight ? lightTheme : darkTheme}>
      <styleContext.Provider value={{ style, setStyle, isThemeLight }}>
      <div>
        <NavBar setTheme={setTheme} isThemeLight={isThemeLight}/>
      </div>
      <div className="app-container">
            <LeftContainer isThemeLight={isThemeLight}/>
            <MainContainer isThemeLight={isThemeLight}/>
      </div>
      </styleContext.Provider>
    </MuiThemeProvider>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
