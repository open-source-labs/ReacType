import React, { useState, useContext, createContext, useEffect } from 'react';
import { createTheme, ThemeProvider, Theme, StyledEngineProvider } from '@mui/material/styles';
import NavBar from '../components/top/NavBar';
import LeftContainer from './LeftContainer';
import MainContainer from './MainContainer';
import RightContainer from './CustomizationPanel';
import { theme1, theme2 } from '../public/styles/theme';
import { connect } from 'react-redux';
import * as actions from '../redux/actions/actions';


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


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
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={isThemeLight ? lightTheme : darkTheme}>
        <styleContext.Provider value={{ style, setStyle, isThemeLight }}>
        <div>
          <NavBar setTheme={setTheme} isThemeLight={isThemeLight}/>
        </div>
        <div className="app-container">
              <LeftContainer isThemeLight={isThemeLight}/>
              <MainContainer isThemeLight={isThemeLight}/>
        </div>
        </styleContext.Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
