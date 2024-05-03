import { Box } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ComponentDrag from './ComponentDrag';
import DragDropPanel from './DragDropPanel';

import { deleteChild } from '../../redux/reducers/slice/appStateSlice';
import { RootState } from '../../redux/store';
import { emitEvent } from '../../helperFunctions/socket';

// Left-hand portion of the app, where predefined component options are displayed
const ElementsContainer = (props): JSX.Element => {
  const contextParam = useSelector((store: RootState) => store.contextSlice);
  const roomCode = useSelector((store: RootState) => store.roomSlice.roomCode);

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteChild({ id: {}, contextParam: contextParam }));
    if (roomCode) {
      emitEvent('deleteChildAction', roomCode, {
        id: {},
        contextParam: contextParam
      });
    }
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
      {
        // moved ComponentDrag to DragDropPanel
        /* <div id={'CompBottomHalf'}>
        <ComponentDrag isThemeLight={props.isThemeLight} />
      </div> */
      }
    </Box>
  );
};

export default ElementsContainer;
