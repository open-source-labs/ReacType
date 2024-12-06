/* eslint-disable max-len */
import React from 'react';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import DataTable from './components/DataTable';
import AddDataForm from './components/AddDataForm';
import AddContextForm from './components/AddContextForm';
import {
  addContext,
  deleteContext,
  addContextValues,
} from '../../../redux/reducers/slice/contextReducer';
import { RootState } from '../../../redux/store';
import { emitEvent } from '../../../../src/helperFunctions/socket';

/**
 * A React component that provides an interface for managing contexts and their key-value pairs within a Redux state.
 * It allows users to add new contexts, delete existing ones, and add key-value pairs to specific contexts. This component also supports
 * real-time synchronization with other clients through socket events if a room code is present.
 *
 * Uses `AddContextForm` and `AddDataForm` components for input forms, and `DataTable` to display the current context's key-value pairs.
 *
 * @component
 * @example
 * ```jsx
 * <CreateContainer />
 * ```
 *
 * State:
 * - `contextInput`: Tracks the user's input for adding a new context.
 * - `currentContext`: Stores the currently selected context for which data is being displayed or modified.
 * - `errorMsg`: Contains the error message to display based on validation failure.
 * - `errorStatus`: Boolean to indicate whether an error is present.
 *
 * Redux State Dependencies:
 * - `contextSlice`: Contains all contexts and their respective key-value pairs.
 * - `roomSlice`: Contains the current room code which is used to identify the room in socket communications.
 *
 * Socket Events:
 * - Emits events for adding or deleting contexts, and adding key-value pairs to a context, if a room code is present.
 *
 * Methods:
 * - `handleClickSelectContext`: Validates the new context name and dispatches actions to add a context in the Redux state and through socket events.
 * - `handleClickInputData`: Dispatches actions to add a new key-value pair to the selected context in the Redux state and through socket events.
 * - `handleDeleteContextClick`: Dispatches actions to delete the selected context from the Redux state and through socket events.
 * - `triggerError`: Sets error messages based on the type of input validation error.
 *
 * @returns {JSX.Element} A React component structured with Grid layout, featuring forms for input and a data table for displaying contexts.
 */
const CreateContainer = (): JSX.Element => {
  const state = useSelector((store: RootState) => store.contextSlice);
  const roomCode = useSelector((store: RootState) => store.roomSlice.roomCode);

  const [contextInput, setContextInput] = React.useState('');
  const [currentContext, setCurrentContext] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');
  const [errorStatus, setErrorStatus] = React.useState(false);
  const currentKeyValues = state.allContext.find(
    (obj) => obj.name === currentContext,
  )?.values || [{ key: 'Enter Key', value: 'Enter value' }];
  const dispatch = useDispatch();

  // update data store when user adds a new context
  const handleClickSelectContext = () => {
    let letters = /[a-zA-Z]/;
    let error;
    // checking for input error / setting error type
    if (!contextInput || contextInput.trim() === '') {
      error = 'empty';
    } else if (!contextInput.charAt(0).match(letters)) {
      error = 'letters';
    } else if (!contextInput.match(/^[0-9a-zA-Z]+$/)) {
      error = 'symbolsDetected';
    } else if (
      state.allContext.some(
        (context) => context.name.toLowerCase() === contextInput.toLowerCase(),
      )
    ) {
      error = 'dupe';
    }

    if (error !== undefined) {
      triggerError(error);
      return;
    }

    dispatch(addContext({ name: contextInput }));

    if (roomCode) {
      emitEvent('addContextAction', roomCode, { name: contextInput });
    }

    setContextInput('');
  };

  const triggerError = (type: string) => {
    setErrorStatus(true);
    switch (type) {
      case 'empty':
        setErrorMsg('Context name cannot be blank.');
        break;
      case 'dupe':
        setErrorMsg('Context name already exists.');
        break;
      case 'letters':
        setErrorMsg('Context name must start with a letter.');
        break;
      case 'symbolsDetected':
        setErrorMsg('Context name must not contain symbols.');
        break;
    }
  };

  // update data store when user add new key-value pair to context
  const handleClickInputData = (name, { inputKey, inputValue }) => {
    dispatch(addContextValues({ name, inputKey, inputValue }));

    if (roomCode) {
      emitEvent('addContextValuesAction', roomCode, {
        name,
        inputKey,
        inputValue,
      });
    }
  };

  // update data store when user deletes context
  const handleDeleteContextClick = () => {
    dispatch(deleteContext({ name: currentContext }));

    if (roomCode) {
      emitEvent('deleteContextAction', roomCode, { name: currentContext });
    }

    setContextInput('');
    setCurrentContext('');
  };

  return (
    <>
      <Grid container display="flex" justifyContent="space-evenly">
        <Grid item>
          <Grid
            container
            spacing={2}
            display="flex"
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <AddContextForm
                contextStore={state}
                handleClickSelectContext={handleClickSelectContext}
                handleDeleteContextClick={handleDeleteContextClick}
                contextInput={contextInput}
                setContextInput={setContextInput}
                currentContext={currentContext}
                setCurrentContext={setCurrentContext}
                errorStatus={errorStatus}
                setErrorStatus={setErrorStatus}
                errorMsg={errorMsg}
              />
            </Grid>

            <Divider variant="middle" />
            <Grid item>
              <AddDataForm
                handleClickInputData={handleClickInputData}
                currentContext={currentContext}
              />
            </Grid>
          </Grid>
        </Grid>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Grid item>
          <Typography
            style={{ color: 'white' }}
            variant="h6"
            gutterBottom={true}
          >
            Context Data Table
          </Typography>
          <DataTable
            target={currentKeyValues}
            currentContext={currentContext}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CreateContainer;
