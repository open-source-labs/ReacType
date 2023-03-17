import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import StateContext from '../../context/context';
import HTMLItem from './HTMLItem';

import { useSelector, useDispatch } from 'react-redux';
import { deleteElement } from '../../redux/reducers/slice/appStateSlice';

/*
DESCRIPTION: This is the top half of the left panel, starting from the 'HTML
  Elements' header. The boxes containing each HTML element are rendered in
  HTMLItem, which itself is rendered by this component.

Central state contains all available HTML elements (stored in the HTMLTypes property).
  The data for HTMLTypes is stored in HTMLTypes.tsx and is added to central state in
  initialState.tsx.

Hook state:
  -tag:
*/
// Extracted the drag and drop functionality from HTMLPanel to make a modular component that can hang wherever the future designers may choose.
const DragDropPanel = (props): JSX.Element => {
  // const [state, dispatch] = useContext(StateContext);
  // const { isThemeLight } = props;
  const isDarkMode = useSelector(store => store.darkMode.isDarkMode);
const dispatch = useDispatch();
// const state = useSelector(store => store.appState)
const { state, contextParam } = useSelector((store) => ({
  state: store.appState,
  contextParam: store.contextSlice,
}));
  const handleDelete = (id: number): void => {
    dispatch(deleteElement({id:id, contextParam: contextParam}))
    // dispatch({
    //   type: 'DELETE ELEMENT',
    //   payload: id
    // });
  };
  // filter out separator so that it will not appear on the html panel
  const htmlTypesToRender = state.HTMLTypes.filter(type => type.name !== 'separator');
  return (
    <div className={`${!isDarkMode ? 'HTMLItems' : 'HTMLItemsDark'}`}>
      <div id="HTMLItemsTopHalf">
        <Grid
          id="HTMLItemsGrid"
        >
          <h3 style={ {color: !isDarkMode ? '#000' : '#fff'} }>HTML ELEMENTS</h3>
          {htmlTypesToRender.map(option => {
            if (!['Switch', 'LinkTo', 'LinkHref', 'Image', 'Route'].includes(option.name)) {
              return (
                <HTMLItem
                  name={option.name}
                  key={`html-${option.name}`}
                  id={option.id}
                  Icon={option.icon}
                  handleDelete={handleDelete}
                  
                />
              );
            }

          })}
          {state.projectType === "Classic React" ? <h3 style={ {color: !isDarkMode ? '#000' : '#fff' } }>REACT ROUTER</h3> : null}
          {htmlTypesToRender.map(option => {
            if ((option.name === 'Switch' || option.name === 'LinkTo' || option.name === 'Route') && state.projectType === "Classic React") {
              return (
                <HTMLItem
                  name={option.name}
                  key={`html-${option.name}`}
                  id={option.id}
                  Icon={option.icon}
                  handleDelete={handleDelete}
                  
                />
              );
            }
          })}

            {state.projectType === "Next.js" ? <h3 style={ {color: !isDarkMode? '#000': "#fff"} }>Next.js</h3> : null}
            {htmlTypesToRender.map(option => {
              if ((option.framework === 'nextjs') && state.projectType === "Next.js") {
                return (
                  <HTMLItem
                    name={option.name}
                    key={`html-${option.name}`}
                    id={option.id}
                    Icon={option.icon}
                    handleDelete={handleDelete}
                    
                  />
                );
              }
          })}
        </Grid>
      </div>
    </div>
  );
};

export default DragDropPanel;
