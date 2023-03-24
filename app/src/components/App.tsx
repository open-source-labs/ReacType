import React, { useReducer, useEffect } from 'react';
import '../public/styles/style.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AppContainer from '../containers/AppContainer';
import localforage from 'localforage';
import { saveProject } from '../helperFunctions/projectGetSaveDel';
import Cookies from 'js-cookie';
//redux toolkit addition
import { useSelector, useDispatch } from 'react-redux';
import { setInitialState, toggleLoggedIn, configToggle } from '../redux/reducers/slice/appStateSlice';

// Intermediary component to wrap main App component with higher order provider components
export const App = (): JSX.Element => {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const state = useSelector(store => store.appState);
  const dispatch = useDispatch();
  // checks if user is signed in as guest or actual user and changes loggedIn boolean accordingly
  useEffect(()=>{
    if (window.localStorage.getItem('ssid') !== 'guest') {
      // state.isLoggedIn = true;
      dispatch(toggleLoggedIn())
    } 
  },[])

  // else {
  //   state.isLoggedIn = false;
  // }
  // following useEffect runs on first mount
  useEffect(() => {
    // if user is a guest, see if a project exists in localforage and retrieve it
    // if (state.isLoggedIn === false) {
      if (!state.isLoggedIn) {
      localforage.getItem('guestProject').then(project => {
        // if project exists, use dispatch to set initial state to that project
        if (project) {
          // dispatch({
          //   type: 'SET INITIAL STATE',
          //   payload: project
          // });
          dispatch(setInitialState(project))
        }
      });
    } else {
      // otherwise if a user is logged in, use a fetch request to load user's projects from DB
      let userId;
      if (Cookies.get('ssid')) {
        userId = Cookies.get('ssid');
      } else {
        userId = window.localStorage.getItem('ssid');
      }
      //also load user's last project, which was saved in localforage on logout
      localforage.getItem(userId).then(project => {
        if (project) {
          // dispatch({
          //   type: 'SET INITIAL STATE',
          //   payload: project
          // });
          dispatch(setInitialState(project))
        } else {
          console.log(
            'No user project found in localforage, setting initial state blank'
          );
        }
      });
    }
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
      <DndProvider backend={HTML5Backend}>
        <header
          style={{ height: '40px', width: '100%', backgroundColor: 'white' }}
        >
          ReacType
        </header>
   
          <AppContainer />
    
      </DndProvider>
    </div>
  );
}

export default App;
