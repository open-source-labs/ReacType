import { Box, Drawer, List, ListItem, ListItemIcon } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ComponentDrag from './ComponentDrag';
import DragDropPanel from './DragDropPanel';

import { deleteChild } from '../../redux/reducers/slice/appStateSlice';

// Left-hand portion of the app, where component options are displayed
const ElementsContainer = (props): JSX.Element => {
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'top',
        color: '#ffffff',
        textAlign: 'center'
      }}
    >
      {' '}
      <DragDropPanel />
      <div id={'CompBottomHalf'}>
        <ComponentDrag isThemeLight={props.isThemeLight} />
      </div>
    </Box>
  );
};

export default ElementsContainer;
