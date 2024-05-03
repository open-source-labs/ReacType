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
