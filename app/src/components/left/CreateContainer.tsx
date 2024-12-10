import React from 'react';
import Grid from '@mui/material/Grid';
import makeStyles from '@mui/styles/makeStyles';
import MUIItem from './MUIItem';
import HTMLItem from './HTMLItem';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import CreateMenu from './CreateMenu';
import MUIDragDropPanel from './MUIDragDropPanel';
import { Box } from '@mui/material';
import { useCallback, useEffect } from 'react';
import ComponentDrag from './ComponentDrag';

import {
  deleteChild,
  deleteElement
} from '../../redux/reducers/slice/appStateSlice';
import { emitEvent } from '../../helperFunctions/socket';

/**
 *
 * A functional component that renders the MUIDragDropPanel within a simple container.
 * The ProfilePage currently acts as a wrapper for the MUIDragDropPanel.
 *
 * @returns {JSX.Element}
 * @example
 * return (
 *   <ProfilePage />
 * )
 */

const CreateContainer = (props): JSX.Element => {
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
        color: '#f7f4dc',
        textAlign: 'center'
      }}
    >
      <CreateMenu />
    </Box>
  );
};

export default CreateContainer;
