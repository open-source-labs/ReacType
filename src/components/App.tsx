import React, { useState, useReducer, useEffect } from 'react';
import '../public/styles/style.css';
import '../public/styles/styleNew.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AppContainer from '../containers/AppContainer';
import { stateContext } from '../context/context';
import initialState from '../context/initialState';
import reducer from '../reducers/componentReducer';
import localforage from 'localforage';
import { saveProject } from '../helperFunctions/projectGetSave';

//import { Context, State } from '../interfaces/InterfacesNew';

// Intermediary component to wrap main App component with higher order provider components
export const App = (): JSX.Element => {
  // const [context, setContext] = useState(initialState);

  const [state, dispatch] = useReducer(reducer, initialState);

  // checks if user is signed in as guest or actual user and changes loggedIn boolean accordingly
  if (document.cookie.slice(5, 10) !== 'guest') {
    state.isLoggedIn = true;
  } else {
    state.isLoggedIn = false;
  }
  useEffect(() => {
    if (state.isLoggedIn === false) {
      localforage.getItem('guestProject').then(project => {
        if (project) {
          console.log(
            'Project found in localforage, guest project is',
            project
          );
          dispatch({
            type: 'SET INITIAL STATE',
            payload: project
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    if (state.isLoggedIn === false) {
      console.log('Saving guest project as', state);
      localforage.setItem('guestProject', state);
    } else if (state.name !== '') {
      console.log('Saving user project as', state);
      saveProject(state.name, state);
    }
  }, [state]);

  return (
    <div className="app">
      <DndProvider backend={HTML5Backend}>
        <header
          style={{ height: '40px', width: '100%', backgroundColor: 'white' }}
        >
          ReacType
        </header>
        <stateContext.Provider value={[state, dispatch]}>
          <AppContainer />
        </stateContext.Provider>
      </DndProvider>
    </div>
  );
};

export default App;
