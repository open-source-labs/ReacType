import '../public/styles/style.css';

import React, { useEffect } from 'react';
import { toggleLoggedIn } from '../redux/reducers/slice/appStateSlice';
import { useDispatch } from 'react-redux';

import AppContainer from '../containers/AppContainer';

export const App: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (window.localStorage.getItem('ssid') !== 'guest') {
      dispatch(toggleLoggedIn(true));
    }
  }, []);

  return (
    <div className="app">
      <AppContainer />
    </div>
  );
};

export default App;
