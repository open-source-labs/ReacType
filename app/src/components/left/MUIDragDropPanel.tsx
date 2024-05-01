import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import MUIItem from './MUIItem';
import React from 'react';
import { RootState } from '../../redux/store';
import { deleteElement } from '../../redux/reducers/slice/appStateSlice';
import { emitEvent } from '../../helperFunctions/socket';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@mui/styles';
import ComponentDrag from './ComponentDrag';
import { Icon } from '@mui/material';

const useStyles = makeStyles({
  accordion: {
    backgroundColor: '#000000', // Set the background color to gray
    color: '#ffffff' // Set the text color to white
  },
  accordionSummary: {
    backgroundColor: '#000000', // Set the background color of the summary to gray
    color: '#ffffff' // Set the text color of the summary to white
  }
});

const MUIDragDropPanel = (props): JSX.Element => {
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
        contextParam
      });
    }
  };

  const htmlTypesToRender = state.HTMLTypes.filter(
    (type) => type.name !== 'separator'
  );

  const muiInputToRender = state.MUITypes.filter(
    (type) => type.name !== 'separator' && type.id >= 21 && type.id <= 33
  );

  const muiDataDisplayToRender = state.MUITypes.filter(
    (type) => type.name !== 'separator' && type.id >= 34 && type.id <= 43
  );

  const muiFeedbackToRender = state.MUITypes.filter(
    (type) => type.name !== 'separator' && type.id >= 44 && type.id <= 49
  );

  const muiSurfacesToRender = state.MUITypes.filter(
    (type) => type.name !== 'separator' && type.id >= 50 && type.id <= 53
  );
  
  const muiNavigationToRender = state.MUITypes.filter(
    (type) => type.name !== 'separator' && type.id >= 54 && type.id <= 62
  );
  

  const muiLayoutToRender = state.MUITypes.filter(
    (type) => type.name !== 'separator' && type.id >= 63 && type.id <= 70
  );

  const muiUtilsToRender = state.MUITypes.filter(
    (type) => type.name !== 'separator' && type.id >= 71 && type.id <= 80
  );

  return (
    <div className={'MUIItems'}>
      <div id="MUIItemsPanel">

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

        {/* Inputs Components */}
        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            className={classes.accordionSummary}
          >
            <h3>Inputs</h3>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container justifyContent="center">
              {muiInputToRender.map((option) => {
                return (
                  <MUIItem
                    name={option.name}
                    key={`mui-${option.name}`}
                    id={option.id}
                    icon={option.icon}
                    handleDelete={handleDelete}
                  />
                );
              })}
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Data Display Component*/}
        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
            className={classes.accordionSummary}
          >
            <h3>Data Display</h3>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container justifyContent="center">
              {muiDataDisplayToRender.map((option) => {
                return (
                  <MUIItem
                    name={option.name}
                    key={`mui-${option.name}`}
                    id={option.id}
                    icon={option.icon}
                    handleDelete={handleDelete}
                  />
                );
              })}
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Feedback Component*/}
        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4a-content"
            id="panel4a-header"
            className={classes.accordionSummary}
          >
            <h3>Feedback</h3>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container justifyContent="center">
              {muiFeedbackToRender.map((option) => {
                return (
                  <MUIItem
                    name={option.name}
                    key={`mui-${option.name}`}
                    id={option.id}
                    icon={option.icon}
                    handleDelete={handleDelete}
                  />
                );
              })}
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Surfaces Component*/}
        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5a-content"
            id="panel5a-header"
            className={classes.accordionSummary}
          >
            <h3>Surfaces</h3>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container justifyContent="center">
              {muiSurfacesToRender.map((option) => {
                return (
                  <MUIItem
                    name={option.name}
                    key={`mui-${option.name}`}
                    id={option.id}
                    icon={option.icon}
                    handleDelete={handleDelete}
                  />
                );
              })}
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Navigation Component*/}
        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel6a-content"
            id="panel6a-header"
            className={classes.accordionSummary}
          >
            <h3>Navigation</h3>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container justifyContent="center">
              {muiNavigationToRender.map((option) => {
                return (
                  <MUIItem
                    name={option.name}
                    key={`mui-${option.name}`}
                    id={option.id}
                    icon={option.icon}
                    handleDelete={handleDelete}
                  />
                );
              })}
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Layout Component*/}
        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel7a-content"
            id="panel7a-header"
            className={classes.accordionSummary}
          >
            <h3>Layout</h3>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container justifyContent="center">
              {muiLayoutToRender.map((option) => {
                return (
                  <MUIItem
                    name={option.name}
                    key={`mui-${option.name}`}
                    id={option.id}
                    icon={option.icon}
                    handleDelete={handleDelete}
                  />
                );
              })}
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Utils Component */}
        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel8a-content"
            id="panel8a-header"
            className={classes.accordionSummary}
          >
            <h3>Utils</h3>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container justifyContent="center">
              {muiUtilsToRender.map((option) => {
                return (
                  <MUIItem
                    name={option.name}
                    key={`mui-${option.name}`}
                    id={option.id}
                    icon={option.icon}
                    handleDelete={handleDelete}
                  />
                );
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

export default MUIDragDropPanel;
