import '../public/styles/style.css';

import React, { useEffect, useState } from 'react';
import {
  setInitialState,
  toggleLoggedIn
} from '../redux/reducers/slice/appStateSlice';
//redux toolkit addition
import { useDispatch, useSelector } from 'react-redux';

import AppContainer from '../containers/AppContainer';
import Cookies from 'js-cookie';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { RootState } from '../redux/store';
import localforage from 'localforage';
import { saveProject } from '../helperFunctions/projectGetSaveDel';

// Intermediary component to wrap main App component with higher order provider components
export const App = (): JSX.Element => {
  const state = useSelector((store: RootState) => store.appState);
  
  const [toggleAttempt, setToggleAttempt] = useState(false);
  const dispatch = useDispatch();
  // checks if user is signed in as guest or actual user and changes loggedIn boolean accordingly
  useEffect(() => {
    if (window.localStorage.getItem('ssid') !== 'guest') {
      dispatch(toggleLoggedIn(true));
    }
    //setToggleAttempt(!toggleAttempt);
  }, []);

  // following useEffect runs on first mount
  useEffect(() => {
    console.log('state.isLoggedIn', state.isLoggedIn)
    // console.log('cookies.get in App', Cookies.get())
    // if user is a guest, see if a project exists in localforage and retrieve it
    // if (!state.isLoggedIn) {
    //   localforage.getItem('guestProject').then((project) => {
    //     // if project exists, use dispatch to set initial state to that project
    //     if (project) {
    //       dispatch(setInitialState(project));
    //     }
    //   });
    // } else {
    //   // otherwise if a user is logged in, use a fetch request to load user's projects from DB
      
    //   let userId;
    //   if (Cookies.get('ssid')) {
    //     userId = Cookies.get('ssid');
    //   } else {
    //     userId = window.localStorage.getItem('ssid');
    //   }
    //   also load user's last project, which was saved in localforage on logout
    //   localforage.getItem(userId).then((project) => {
    //     if (project) {
    //       dispatch(setInitialState(project));
    //     } else {
    //       console.log(
    //         'No user project found in localforage, setting initial state blank'
    //       );
    //     }
    //   });
    // }
  }, []);
  // useEffect(() => {
  //   // provide config properties to legacy projects so new edits can be auto saved
  //   // if (state.config === undefined) {
  //   //   state.config = { saveFlag: true, saveTimer: false };
  //   // }
  //   // New project save configuration to optimize server load and minimize Ajax requests
  //   if (state.config.saveFlag) {
  //     // state.config.saveFlag = false;
  //     // state.config.saveTimer = true;
  //     // dispatch(configToggle())

  //     let userId;
  //     if (Cookies.get('ssid')) {
  //       userId = Cookies.get('ssid');
  //     } else {
  //       userId = window.localStorage.getItem('ssid');
  //     }
  //     // if (state.isLoggedIn === false) {
  //     if (!state.isLoggedIn) {
  //       localforage.setItem('guestProject', state);
  //     } else if (state.name !== '') {
  //       saveProject(state.name, state);
  //       localforage.setItem(userId, state);
  //     }
  //   }
  //   if (!state.config.saveTimer) {
  //     state.config.saveTimer = false;
  //     setTimeout(() => {
  //       state.config.saveFlag = true;
  //     }, 15000);
  //   }
  // }, [state]);
  // uncomment below to log state

  return (
    <div className="app">
      
        <header
          style={{ height: '40px', width: '100%', backgroundColor: 'white' }}
        >
          ReacType
        </header>

        <AppContainer />
     
    </div>
  );
};

export default App;
