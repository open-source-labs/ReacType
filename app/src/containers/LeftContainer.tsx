import React, { useContext, useEffect, useCallback } from 'react';
import Grid from '@mui/material/Grid';
import ComponentDrag from '../components/right/ComponentDrag';
import DragDropPanel from '../components/left/DragDropPanel';
// import StateContext from '../context/context';
// import { styleContext } from './AppContainer';
import { useDispatch, useSelector } from 'react-redux';
import { deleteChild } from '../redux/reducers/slice/appStateSlice';


// Left-hand portion of the app, where component options are displayed
const LeftContainer = (props): JSX.Element => {
  // const { style } = useContext(styleContext);
  // const [state, dispatch] = useContext(StateContext);
  const{contextParam, style }  = useSelector(store =>({
    contextParam: store.contextSlice,
    style: store.styleSlice,
  }))
  const dispatch = useDispatch();

  const handleDelete = () => {
    // dispatch({ type: 'DELETE CHILD', payload: {} });
    dispatch(deleteChild({id:{},contextParam:contextParam}))
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
            <DragDropPanel />
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
