import ComponentPanelItem from '../right/ComponentPanelItem';
import Grid from '@mui/material/Grid';
import React from 'react';
import { RootState } from '../../redux/store';
import makeStyles from '@mui/styles/makeStyles';
import { useSelector } from 'react-redux';
// The component panel section of the left panel displays all components and has the ability to add new components
const ComponentDrag = ({ isThemeLight }): JSX.Element => {
  const classes = useStyles();
  const state = useSelector((store: RootState) => store.appState);
  const isDarkMode = useSelector(
    (store: RootState) => store.darkMode.isDarkMode
  );
  const isFocus = (targetId: Number) => {
    return state.canvasFocus.componentId === targetId ? true : false;
  };

  return (
    <div className={classes.panelWrapper}>
      {/* Display all root components */}
      {/* Font size for 'index' in root components in .compPanelItem h3 style.css */}
      <div className={classes.panelWrapperList}>
        {/* Heading just below ADD button */}
        <h4
          className={
            !isDarkMode
              ? classes.lightThemeFontColor
              : classes.darkThemeFontColor
          }
        >
          {state.projectType === 'Next.js' || state.projectType === 'Gatsby.js'
            ? 'Pages'
            : 'Root Components'}
        </h4>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {state.components
            .filter((comp) => state.rootComponents.includes(comp.id))
            .map((comp) => {
              return (
                <ComponentPanelItem
                  isFocus={isFocus(comp.id)}
                  key={`comp-${comp.id}`}
                  name={comp.name}
                  id={comp.id}
                  root={true}
                  isThemeLight={isThemeLight}
                />
              );
            })}
        </Grid>
        {/* Display all reusable components */}
        {/* <h4
          className={
            !isDarkMode
              ? classes.lightThemeFontColor
              : classes.darkThemeFontColor
          }
        >
          Reusable Components
        </h4>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {state.components
            .filter((comp) => !state.rootComponents.includes(comp.id))
            .map((comp) => {
              return (
                <ComponentPanelItem
                  isFocus={isFocus(comp.id)}
                  key={`comp-${comp.id}`}
                  name={comp.name}
                  id={comp.id}
                  root={false}
                  isThemeLight={isThemeLight}
                />
              );
            })}
        </Grid> */}
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  panelWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
    overflow: 'auto'
  },
  panelWrapperList: {
    minHeight: '120px',
    marginLeft: '-15px',
    marginRight: '-15px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    wordWrap: 'break-word'
  },
  lightThemeFontColor: {
    color: '#fff'
  },
  darkThemeFontColor: {
    color: '#fff'
  }
});

export default ComponentDrag;
