import React from 'react';
import Grid from '@mui/material/Grid';
import makeStyles from '@mui/styles/makeStyles';
import MUIItem from './MUIItem';
import HTMLItem from './HTMLItem';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import CreatePanel from './CreatePanel';
import Box from '@mui/material/Box';
import { useCallback, useEffect } from 'react';
import ComponentDrag from './ComponentDrag';

import {
  deleteChild,
  deleteElement
} from '../../redux/reducers/slice/appStateSlice';
import { emitEvent } from '../../helperFunctions/socket';

/**
 *
 * A functional component that renders the CreatePanel within a simple container.
 * The CreateContainer currently acts as a wrapper for the CreatePanel.
 * /**
 * CreateContainer serves as the left-hand side container in the application, primarily responsible
 * for hosting user interaction elements such as `DragDropPanel` and `MUIDragDropPanel`. This component handles user inputs
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
 *
 *
 * @returns {JSX.Element}
 * @example
 * return (
 *   <CreateContainer/>
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

  //   useEffect(() => {
  //     document.addEventListener('keydown', keyBindedFunc);
  //     return () => {
  //       document.removeEventListener('keydown', keyBindedFunc);
  //     };
  //   }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'top',
        color: '#f7f4dc',
        textAlign: 'center',
        marginLeft: '15px'
      }}
    >
      <CreatePanel isThemeLight={true} />
    </Box>
  );
};

export default CreateContainer;
