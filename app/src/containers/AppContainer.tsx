import React, { useEffect, useState } from 'react';
import {
  StyledEngineProvider,
  Theme,
  ThemeProvider
} from '@mui/material/styles';
import { theme1, theme2 } from '../public/styles/theme';
// Imports for redux toolkit usage
import { useDispatch, useSelector } from 'react-redux';

import LeftContainer from './LeftContainer';
import MainContainer from './MainContainer';
import MarketplaceContainer from './MarketplaceContainer';
import NavBar from '../components/top/NavBar';
import { setStyle } from '../redux/reducers/slice/styleSlice';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

// setting light and dark themes (navbar and background); linked to theme.ts
const lightTheme = theme1;
const darkTheme = theme2; // dark mode color in theme.ts not reached
const AppContainer = () => {
  // setting state for changing light vs dark themes; linked to NavBar.tsx

  const { isDarkMode, style } = useSelector((store) => ({
    isDarkMode: store.darkMode.isDarkMode,
    style: store.styleSlice
  }));

  const [isThemeLight, setTheme] = useState(!isDarkMode);
  const dispatch = useDispatch();

  // Set background color of left and bottom panel on the first render
  // Without this hook, the first render is always going to be white
  useEffect(() => {
    if (!isDarkMode) dispatch(setStyle(null));
    else dispatch(setStyle({ backgroundColor: '#21262c' }));
  }, [isDarkMode]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={!isDarkMode ? lightTheme : darkTheme}>
        <div>
          <NavBar setTheme={setTheme} isThemeLight={isThemeLight} />
        </div>
        <div className="app-container">
          <LeftContainer isThemeLight={isThemeLight} />
          <MainContainer isThemeLight={isThemeLight} />
        </div>
        {/* <MarketplaceContainer /> */}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
export default AppContainer;
