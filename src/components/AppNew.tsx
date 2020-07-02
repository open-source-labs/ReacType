import React, { useState, useReducer, useEffect } from 'react';
import '../public/styles/style.css';
import '../public/styles/styleNew.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AppContainer from '../containers/AppContainer';
import { stateContext } from '../context/context';
import initialState from '../context/initialState';
import reducer from '../reducers/componentReducerNew';
import { getProjects } from '../helperFunctions/projectGetSave';
import { saveProject } from '../helperFunctions/projectGetSave';
import { loadInitData } from '../actions/actionCreators';
// import { Context, State } from '../interfaces/InterfacesNew';

// Intermediary component to wrap main App component with higher order provider components
export const App = (): JSX.Element => {
  // const [context, setContext] = useState(initialState);
  //let initialStateLoaded = false;
  // retrieves user's project (if it exists) from DB on component load
  const [state, dispatch] = useReducer(reducer, initialState);

  // gets projects from DB for current user on mount
  useEffect(() => {
    // getProjects returns a promise which is thenable
    getProjects().then(project => {
      if (project) {
        // if user has project we run a dispatch to update state with received project
        dispatch({
          type: 'SET INITIAL STATE',
          payload: project
        });
      }
    });
  }, []);

  // saves project to DB whenever there are changes to the state via this canvas component
  useEffect(() => {
    console.log('useEffect in CanvasNew ran');
    // setTimeout is necessary so the saveProjects method does not fire and save an empty project before the initial getProjects in AppNew
    setTimeout(() => {
      saveProject(state);
    }, 1000);
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
