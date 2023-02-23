import React, { useContext, useEffect, useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import ComponentDrag from '../components/right/ComponentDrag';
import DragDropPanel from '../components/left/DragDropPanel';
import StateContext from '../context/context';
import { styleContext } from './AppContainer';

// Left-hand portion of the app, where component options are displayed
const LeftContainer = (props): JSX.Element => {
  const { style } = useContext(styleContext);
  const [state, dispatch] = useContext(StateContext);

  const handleDelete = () => {
    dispatch({ type: 'DELETE CHILD', payload: {} });
  };
  const keyBindedFunc = useCallback(e => {
    if (e.key === 'Backspace' && e.target.tagName !== "TEXTAREA" && e.target.tagName !== "INPUT") handleDelete();
  }, []);
  useEffect(() => {
    document.addEventListener('keydown', keyBindedFunc);
    return () => {
      document.removeEventListener('keydown', keyBindedFunc);
    };
  }, []);

  return (
    <div className="left-container hide-show">
        <div className="column left" style={style}>
          <Grid container direction="column" alignItems="center">
            <h4>Drag and Drop</h4>
            <DragDropPanel isThemeLight={props.isThemeLight}/>
            <div id={'CompBottomHalf'}>
              <ComponentDrag isThemeLight={props.isThemeLight}/>
            </div>
          </Grid>
        </div>
        <div className='left-indicator'>
          <span className="material-symbols-outlined">
            eject
          </span>
        </div>
    </div>
  );
};

export default LeftContainer;
