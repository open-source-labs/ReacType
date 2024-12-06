/* eslint-disable max-len */
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@mui/styles';
import { emitEvent } from '../../helperFunctions/socket';
import { deleteElement } from '../../redux/reducers/slice/appStateSlice';
import { RootState } from '../../redux/store';
import MUIItem from './MUIItem';
import HTMLItem from './HTMLItem';
import ComponentDrag from './ComponentDrag';

const useStyles = makeStyles({
  accordion: {
    backgroundColor: '#0b0b0b', // Set the background color to gray
    color: '#ffffff', // Set the text color to white
  },
  accordionSummary: {
    backgroundColor: '#101012', // Set the background color of the summary to gray
    color: '#ffffff', // Set the text color of the summary to white
  },
});

/**
 * DragDropPanel is a component that renders a series of accordions each containing different
 * types of draggable elements that can be used in a project. These include HTML elements, React Router components,
 * and specific components for frameworks like Next.js if applicable. Each section allows users to interact with
 * elements by dragging them into a canvas or other designated drop zones.
 *
 * Props:
 * @param {Object} props - Contains properties passed down to the component.
 * @param {boolean} props.isThemeLight - Indicates if the current theme is light, affecting the visual styling of the component.
 *
 * @returns {JSX.Element} A React component that renders various draggable item panels grouped in accordions.
 */
const DragDropPanel = (props): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const state = useSelector((store: RootState) => store.appState);
  const contextParam = useSelector((store: RootState) => store.contextSlice);
  const roomCode = useSelector((store: RootState) => store.roomSlice.roomCode);

  const handleDelete = (id: number): void => {
    dispatch(deleteElement({ id: id, contextParam: contextParam }));
    if (roomCode) {
      emitEvent('deleteElementAction', roomCode, {
        id,
        contextParam,
      });
    }
  };

  const htmlTypesToRender = state.HTMLTypes.filter(
    (type) => type.name !== 'separator',
  );

  const muiTypesToRender = state.MUITypes.filter(
    (type) => type.name !== 'separator',
  );

  return (
    <div className={'HTMLItems'}>
      <div id="HTMLItemsTopHalf">
        {/* Root Components */}
        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className={classes.accordionSummary}
          >
            <h3>Root Components</h3>
          </AccordionSummary>
          <AccordionDetails>
            <ComponentDrag isVisible={true} isThemeLight={props.isThemeLight} />
          </AccordionDetails>
        </Accordion>

        {/* HTML Components */}
        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className={classes.accordionSummary}
          >
            <h3>HTML Elements</h3>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'space-around',
            }}
          >
            <Grid container justifyContent="space-around" columnSpacing={2}>
              {htmlTypesToRender.map((option) => {
                if (
                  !['Switch', 'LinkTo', 'LinkHref', 'Image', 'Route'].includes(
                    option.name,
                  )
                ) {
                  return (
                    <HTMLItem
                      name={option.name}
                      key={`html-${option.name}`}
                      id={option.id}
                      icon={option.icon}
                      handleDelete={handleDelete}
                    />
                  );
                }
              })}
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* React Router */}
        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className={classes.accordionSummary}
          >
            <h3>React Router</h3>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'space-around',
            }}
          >
            <Grid container justifyContent="space-around" columnSpacing={2}>
              {htmlTypesToRender.map((option) => {
                if (
                  (option.name === 'Switch' ||
                    option.name === 'LinkTo' ||
                    option.name === 'Route') &&
                  state.projectType === 'Classic React'
                ) {
                  return (
                    <HTMLItem
                      name={option.name}
                      key={`html-${option.name}`}
                      id={option.id}
                      icon={option.icon}
                      handleDelete={handleDelete}
                    />
                  );
                }
              })}
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Next.js */}
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
                icon={option.icon}
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
