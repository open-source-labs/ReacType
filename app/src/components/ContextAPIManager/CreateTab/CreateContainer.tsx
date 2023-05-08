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

const CreateContainer = () => {
  const state = useSelector((store: RootState) => store.contextSlice);
  const [contextInput, setContextInput] = React.useState(null);
  const [currentContext, setCurrentContext] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState('');
  const [errorStatus, setErrorStatus] = React.useState(false);
  const currentKeyValues = state.allContext.find(
    (obj) => obj.name === currentContext
  )?.values || [{ key: 'Enter Key', value: 'Enter value' }];
  const dispatch = useDispatch();

  //update data store when user adds a new context
  const handleClickSelectContext = () => {
    //prevent user from adding duplicate context
    let letters = /[a-zA-Z]/;
    let error;
    console.log(state.allContext, contextInput, 'error test');
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
    setContextInput('');
  };

  const triggerError = (type: String) => {
    setErrorStatus(true);
    if (type === 'empty') {
      setErrorMsg('Context name cannot be blank.');
    } else if (type === 'dupe') {
      setErrorMsg('Context name already exists.');
    } else if (type === 'letters') {
      setErrorMsg('Context name must start with a letter.');
    } else if (type === 'symbolsDetected') {
      setErrorMsg('Context name must not contain symbols.');
    }
  };

  //update data store when user add new key-value pair to context
  const handleClickInputData = (name, { inputKey, inputValue }) => {
    dispatch(addContextValues({ name, inputKey, inputValue }));
  };

  //update data store when user deletes context
  const handleDeleteContextClick = () => {
    dispatch(deleteContext({ name: currentContext }));
    setContextInput('');
    setCurrentContext(null);
  };

  console.log('state.allContext', state.allContext);
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
            style={{ color: 'black' }}
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
