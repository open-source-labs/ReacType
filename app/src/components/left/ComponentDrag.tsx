import React from 'react';
import Grid from '@mui/material/Grid';
import { RootState } from '../../redux/store';
import makeStyles from '@mui/styles/makeStyles';
import { useSelector } from 'react-redux';
import ComponentPanelItem from '../right/ComponentPanelItem';


const useStyles = makeStyles({
  panelWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
    overflow: 'auto'
  },
  panelWrapperList: {
    minHeight: 'auto'
  },
  lightThemeFontColor: {
    color: '#fff'
  },
  darkThemeFontColor: {
    color: '#00008B,'
  }
});

const ComponentDrag = ({ isVisible, isThemeLight }): JSX.Element | null => {
  const classes = useStyles();
  const state = useSelector((store: RootState) => store.appState);

  const isFocus = (targetId: Number) => {
    console.log('targetID line 33', targetId)
    console.log('componentID line 34', state.canvasFocus.componentId)
    return state.canvasFocus.componentId === targetId ? true : false;
  };

  if (!isVisible) return null;

  return (
    <div className={classes.panelWrapper}>
      <div className={classes.panelWrapperList}>
        <h4 className={classes.darkThemeFontColor}>
          {state.projectType === 'Next.js' || state.projectType === 'Gatsby.js'
            ? 'Pages'
            : ''}
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
      </div>
    </div>
  );
};

export default ComponentDrag;

