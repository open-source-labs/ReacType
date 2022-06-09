import React, { useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { useDispatch } from 'react-redux';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import DataTable from './components/DataTable';
import AddDataForm from './components/AddDataForm';
import AddContextForm from './components/AddContextForm';
import * as actions from '../../../redux/actions/actions';
import { Typography } from '@mui/material';

const CreateContainer = () => {
  const defaultTableData = [{ key: 'Enter Key', value: 'Enter value' }];
  const store = useStore();
  const [state, setState] = useState([]);
  const [tableState, setTableState] = React.useState(defaultTableData);
  const [contextInput, setContextInput] = React.useState(null);

  useEffect(() => {
    setState(store.getState().contextSlice);
  }, []);

  const dispatch = useDispatch();

  const handleClickSelectContext = () => {
    //prevent user from adding duplicate context
    for (let i = 0; i < state.allContext.length; i += 1) {
      if (state.allContext[i].name === contextInput.name) {
        return;
      } 
    }
    dispatch(actions.addContextActionCreator(contextInput));
    setState(store.getState().contextSlice);
    
  };

  const handleClickInputData = ({ name }, { inputKey, inputValue }) => {
    dispatch(
      actions.addContextValuesActionCreator({ name, inputKey, inputValue })
    );
    setState(store.getState().contextSlice);
  };

  const handleDeleteContextClick = () => {
    dispatch(actions.deleteContext(contextInput));
    setContextInput('');
    setState(store.getState().contextSlice);
  };

  const renderTable = targetContext => {
    if (!targetContext.values) {
      setTableState(defaultTableData);
    } else {
      setTableState(targetContext.values);
    }
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
                renderTable={renderTable}
                contextInput={contextInput}
                setContextInput={setContextInput}
              />
            </Grid>

            <Divider variant="middle" />
            <Grid item>
              <AddDataForm
                handleClickInputData={handleClickInputData}
                contextInput={contextInput}
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
          <DataTable target={tableState} contextInput={contextInput} />
        </Grid>
      </Grid>
    </>
  );
};

export default CreateContainer;
