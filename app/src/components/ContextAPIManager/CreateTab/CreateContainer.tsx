import React from 'react';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import DataTable from './components/DataTable';
import AddDataForm from './components/AddDataForm';
import AddContextForm from './components/AddContextForm';
import { Typography } from '@mui/material';
import {
  addContext,
  deleteContext,
  addContextValues
} from '../../../redux/reducers/slice/contextReducer';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import { emitEvent } from '../../../../src/helperFunctions/socket';

const CreateContainer = () => {
  const state = useSelector((store: RootState) => store.contextSlice);
  const roomCode = useSelector((store: RootState) => store.roomSlice.roomCode);

  const [contextInput, setContextInput] = React.useState('');
  const [currentContext, setCurrentContext] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');
  const [errorStatus, setErrorStatus] = React.useState(false);
  const currentKeyValues = state.allContext.find(
    (obj) => obj.name === currentContext
  )?.values || [{ key: 'Enter Key', value: 'Enter value' }];
  const dispatch = useDispatch();

  //update data store when user adds a new context
  const handleClickSelectContext = () => {
    let letters = /[a-zA-Z]/;
    let error;
    //checking for input error / setting error type
    if (!contextInput || contextInput.trim() === '') {
      error = 'empty';
    } else if (!contextInput.charAt(0).match(letters)) {
      error = 'letters';
    } else if (!contextInput.match(/^[0-9a-zA-Z]+$/)) {
      error = 'symbolsDetected';
    } else if (
      state.allContext.some(
        (context) => context.name.toLowerCase() === contextInput.toLowerCase()
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

  const triggerError = (type: String) => {
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

  //update data store when user add new key-value pair to context
  const handleClickInputData = (name, { inputKey, inputValue }) => {
    dispatch(addContextValues({ name, inputKey, inputValue }));

    if (roomCode) {
      emitEvent('addContextValuesAction', roomCode, {
        name,
        inputKey,
        inputValue
      });
    }
  };

  //update data store when user deletes context
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
