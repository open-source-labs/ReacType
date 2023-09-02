import ComponentPanelItem from '../right/ComponentPanelItem';
import Grid from '@mui/material/Grid';
import React from 'react';
import { RootState } from '../../redux/store';
import makeStyles from '@mui/styles/makeStyles';
import { useSelector } from 'react-redux';

const ComponentsContainer = () => {
  const classes = useStyles();
  const state = useSelector((store: RootState) => store.appState);
  const isDarkMode = useSelector(
    (store: RootState) => store.darkMode.isDarkMode
  );
  const isFocus = (targetId: Number) => {
    return state.canvasFocus.componentId === targetId ? true : false;
  };
  return (
    <div>
      <div className={classes.panelWrapper}>
        <div className={classes.panelWrapperList}>
          <h4
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
            direction="column"
            alignContent={"center"}
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
                  />
                );
              })}
          </Grid>
        </div>
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
  },
  lightThemeFontColor: {
    color: '#fff'
  },
  darkThemeFontColor: {
    color: '#fff'
  }
});

export default ComponentsContainer;
