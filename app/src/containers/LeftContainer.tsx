import { Drawer, List, ListItem, ListItemIcon } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ComponentDrag from '../components/left/ComponentDrag';
import DragDropPanel from '../components/left/DragDropPanel';
import FolderIcon from '@mui/icons-material/Folder';
import Grid from '@mui/material/Grid';
import SettingsIcon from '@mui/icons-material/Settings';
import { deleteChild } from '../redux/reducers/slice/appStateSlice';

// Left-hand portion of the app, where component options are displayed
const LeftContainer = (props): JSX.Element => {
  const [selectedTab, setSelectedTab] = React.useState('files');

  const { contextParam, style } = useSelector((store) => ({
    contextParam: store.contextSlice,
    style: store.styleSlice
  }));
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteChild({ id: {}, contextParam: contextParam }));
  };
  const keyBindedFunc = useCallback((e) => {
    if (
      e.key === 'Backspace' &&
      e.target.tagName !== 'TEXTAREA' &&
      e.target.tagName !== 'INPUT'
    )
      handleDelete();
  }, []);
  useEffect(() => {
    document.addEventListener('keydown', keyBindedFunc);
    return () => {
      document.removeEventListener('keydown', keyBindedFunc);
    };
  }, []);

  return (
    <div className="left-container">
      <div className="column left" style={style.style}>
        <Grid container direction="column" alignItems="center">
          <h4>Drag and Drop</h4>
          <DragDropPanel />
          <div id={'CompBottomHalf'}>
            <ComponentDrag isThemeLight={props.isThemeLight} />
          </div>
        </Grid>
      </div>
      {/* <div className="left-indicator">
        <span className="material-symbols-outlined">eject</span>
      </div> */}
    </div>
  );
};

export default LeftContainer;
