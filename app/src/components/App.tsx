/* eslint-disable max-len */
import '../public/styles/style.css';

import React, { useEffect } from 'react';
import { toggleLoggedIn } from '../redux/reducers/slice/appStateSlice';
import { useDispatch } from 'react-redux';

import AppContainer from '../containers/AppContainer';
/**
 * The `App` component is the root component of the React application. It performs an initial check
 * to determine if a user is logged in (not a 'guest') by inspecting local storage, and updates the
 * application's state accordingly using Redux. It then renders the `AppContainer`, which serves as
 * the main container for the application's user interface.
 *
 * The `useEffect` hook is used to perform the login check once on component mount, ensuring that
 * the login state is correctly set based on the presence of a specific item in local storage.
 *
 * @returns {JSX.Element} Renders the `AppContainer` wrapped within a div with a class of 'app',
 *                        serving as the root of the user interface.
 *
 * This component interacts with Redux by dispatching actions to modify the global state, particularly
 * the logged-in status of the user. This is central for managing conditional rendering and access
 * throughout the application based on user authentication status.
 */
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
