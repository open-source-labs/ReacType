import React, { useEffect, useState } from 'react';
import {
  StyledEngineProvider,
  Theme,
  ThemeProvider
} from '@mui/material/styles';
import { theme1, theme2 } from '../public/styles/theme';
import { useDispatch, useSelector } from 'react-redux';

import LeftContainer from './LeftContainer';
import MainContainer from './MainContainer';

import MarketplaceContainer from './MarketplaceContainer';
import NavBar from '../components/top/NavBar';
import { RootState } from '../redux/store';

import { setStyle } from '../redux/reducers/slice/styleSlice';
import { useHistory } from 'react-router-dom';
declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}

// setting light and dark themes (navbar and background); linked to theme.ts
const lightTheme = theme1;
const darkTheme = theme2; // dark mode color in theme.ts not reached

/**
 * The `AppContainer` component serves as the primary layout container for the application.
 * It uses the `useHistory` hook from `react-router-dom` to determine the current URL path and conditionally
 * renders different child components based on whether the path is '/marketplace' or another. It integrates
 * a theme provider to apply a light theme to all nested components and controls the overall layout of
 * the application including the navigation bar and main content areas.
 *
 * The component selectively renders `MarketplaceContainer` for the marketplace route, otherwise it renders
 * both `LeftContainer` and `MainContainer` for general application navigation and display. This allows for
 * flexible navigation and layout management based on user interaction and route changes.
 *
 * @returns {JSX.Element} A React element representing the structured layout of the application, including
 *                        the navigation bar and the main or marketplace content areas, wrapped within theme
 *                        providers to ensure consistent styling.
 *
 * The usage of `ThemeProvider` from Material-UI ensures that the theme is consistently applied across all
 * child components. The `StyledEngineProvider` with `injectFirst` helps in overriding the default Material-UI
 * styles with custom styles defined in the application.
 */
const AppContainer: React.FC = () => {
  //useHistory hook to grab the url, if it is /marketplace then selectively render MarketplaceContainer
  const urlAdd = useHistory();
  const isMarketplace = urlAdd.location.pathname === '/marketplace';

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={lightTheme}>
        <div>
          <NavBar />
        </div>
        <div className="app-container">
          {isMarketplace ? (
            <MarketplaceContainer />
          ) : (
            <>
              <LeftContainer />
              <MainContainer />
            </>
          )}
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
export default AppContainer;
