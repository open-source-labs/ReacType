import React, { useState, useContext, createContext, useEffect } from 'react';
import { createTheme, ThemeProvider, Theme, StyledEngineProvider } from '@mui/material/styles';
import NavBar from '../components/top/NavBar';
import LeftContainer from './LeftContainer';
import MainContainer from './MainContainer';
import RightContainer from './CustomizationPanel';
import { theme1, theme2 } from '../public/styles/theme';
import {setStyle} from '../redux/reducers/slice/styleSlice';
// Imports for redux toolkit usage
import { toggleDarkMode } from '../redux/reducers/slice/darkModeSlice';
import { useSelector, useDispatch } from 'react-redux';


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


// import { createTheme, ThemeProvider } from '@mui/material/styles'

// export const styleContext = createContext({
//   style: null,
//   setStyle: null,
//   isThemeLight: null,
// });
// setting light and dark themes (navbar and background); linked to theme.ts
const lightTheme = theme1;
const darkTheme = theme2; // dark mode color in theme.ts not reached
const AppContainer = () => {
  // setting state for changing light vs dark themes; linked to NavBar.tsx
  
  const {isDarkMode, style }= useSelector((store) =>({
isDarkMode: store.darkMode.isDarkMode,
style: store.styleSlice,
  } ));
  // const initialStyle = useContext(styleContext);
  // const [style, setStyle] = useState(initialStyle);
  const [isThemeLight, setTheme] = useState(!isDarkMode);
  const dispatch = useDispatch();


  // Set background color of left and bottom panel on the first render
  // Without this hook, the first render is always going to be white
  useEffect(() => {
    if (!isDarkMode) dispatch(setStyle(null)) ;
    else dispatch(setStyle({ backgroundColor: '#21262c' }));
  }, [isDarkMode]);
  // useEffect(() => {
  //   if (!isDarkMode) setStyle(null);
  //   else setStyle({ backgroundColor: '#21262c' });
  // }, [isDarkMode]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={!isDarkMode ? lightTheme : darkTheme}>
        {/* <styleContext.Provider value={{ style, setStyle, isDarkMode }}> */}
        <div>
          <NavBar setTheme={setTheme} isThemeLight={isThemeLight}/>
        </div>
        <div className="app-container">
              <LeftContainer isThemeLight={isThemeLight}/>
              <MainContainer isThemeLight={isThemeLight}/>
        </div>
        {/* </styleContext.Provider> */}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
export default AppContainer;
