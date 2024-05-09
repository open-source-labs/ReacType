import { Box } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ComponentDrag from './ComponentDrag';
import DragDropPanel from './DragDropPanel';

import { deleteChild } from '../../redux/reducers/slice/appStateSlice';
import { RootState } from '../../redux/store';
import { emitEvent } from '../../helperFunctions/socket';

/**
 * ElementsContainer serves as the left-hand side container in the application, primarily responsible
 * for hosting user interaction elements such as `DragDropPanel`. This component handles user inputs
 * related to component selection and arrangement via drag-and-drop interfaces.
 * 
 * It also includes key bindings to enhance user interaction, such as deleting a child component
 * with the 'Backspace' key when focus is not on text input fields.
 *
 * Props:
 * @param {Object} props - The properties passed down to this component.
 * @param {boolean} props.isThemeLight - Indicates if the current theme is light, affecting the visual styling.
 *
 * @returns {JSX.Element} The container element that holds UI sections for component interaction.
 */
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
