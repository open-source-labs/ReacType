import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import HTMLItem from './HTMLItem';
import React from 'react';
import { RootState } from '../../redux/store';
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
  const dispatch = useDispatch();
  const state = useSelector((store: RootState) => store.appState);
  const contextParam = useSelector((store: RootState) => store.contextSlice);

  const handleDelete = (id: number): void => {
    dispatch(deleteElement({ id: id, contextParam: contextParam }));
  };
  // filter out separator so that it will not appear on the html panel
  const htmlTypesToRender = state.HTMLTypes.filter(
    (type) => type.name !== 'separator'
  );
  return (
    <div className={'HTMLItems'}>
      <div id="HTMLItemsTopHalf">
        <h3 style={{ color: '#C6C6C6' }}>HTML Elements</h3>
        <Grid
          container
          spacing={{ xs: 0.5, md: 0.5 }}
          columns={{ xs: 4, sm: 4, md: 4 }}
          justifyContent="center"
        >
          {htmlTypesToRender.map((option) => {
            if (
              !['Switch', 'LinkTo', 'LinkHref', 'Image', 'Route'].includes(
                option.name
              )
            ) {
              return (
                <Grid item xs={2} sm={2} md={2} key={option.name}>
                  <HTMLItem
                    name={option.name}
                    key={`html-${option.name}`}
                    id={option.id}
                    Icon={option.icon}
                    handleDelete={handleDelete}
                  />
                </Grid>
              );
            }
          })}
        </Grid>
        {state.projectType === 'Classic React' ? (
          <h3 style={{ color: '#C6C6C6' }}>React Router</h3>
        ) : null}
        <Grid
          container
          spacing={{ xs: 0.5, md: 0.5 }}
          columns={{ xs: 4, sm: 4, md: 4 }}
          justifyContent="center"
        >
          {htmlTypesToRender.map((option) => {
            if (
              (option.name === 'Switch' ||
                option.name === 'LinkTo' ||
                option.name === 'Route') &&
              state.projectType === 'Classic React'
            ) {
              return (
                <Grid item xs={2} sm={2} md={2} key={option.name}>
                  <HTMLItem
                    name={option.name}
                    key={`html-${option.name}`}
                    id={option.id}
                    Icon={option.icon}
                    handleDelete={handleDelete}
                  />
                </Grid>
              );
            }
          })}
        </Grid>

        {state.projectType === 'Next.js' ? (
          <h3 style={{ color: 'C6C6C6' }}>Next.js</h3>
        ) : null}
        {htmlTypesToRender.map((option) => {
          if (
            option.framework === 'nextjs' &&
            state.projectType === 'Next.js'
          ) {
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
      </div>
    </div>
  );
};

export default DragDropPanel;
