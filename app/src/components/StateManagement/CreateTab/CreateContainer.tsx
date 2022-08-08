import React, { useEffect, useState, useContext } from 'react';
import { useStore } from 'react-redux';
import { useDispatch } from 'react-redux';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import DataTable from './components/DataTable';
import AddDataForm from './components/AddDataForm';
import AddContextForm from './components/AddContextForm';
import * as actions from '../../../redux/actions/actions';
import { Typography } from '@mui/material';
import StateContext from '../../../context/context';
import StatePropsPanel from './components/StatePropsPanel';
import TableStateProps from './components/TableStateProps';

//LegacyPD added this in here 
//import StatePropsPanel from '../../right/StatePropsPanel';

const CreateContainer = (props) => {
  const defaultTableData = [{ key: 'Enter Key', value: 'Enter value' }];
  const store = useStore();
  const [state, setState] = useState([]);
  const [tableState, setTableState] = React.useState(defaultTableData);
  const [contextInput, setContextInput] = React.useState(null);
  const [stateContext, dispatchContext] = useContext(StateContext);

  //pulling data from redux store
  useEffect(() => {
    setState(store.getState().contextSlice);
  }, []);

  const dispatch = useDispatch();

  //update data store when user adds a new context
  const handleClickSelectContext = () => {
    //prevent user from adding duplicate context
    for (let i = 0; i < state.allContext.length; i += 1) {
      if (state.allContext[i].name === contextInput.name) {
        return;
      }
    }
    setContextInput('');
    dispatch(actions.addContextActionCreator(contextInput));
    setState(store.getState().contextSlice);
  };

  //update data store when user add new key-value pair to context
  const handleClickInputData = ({ name }, { inputKey, inputValue }) => {
    dispatch(
      actions.addContextValuesActionCreator({ name, inputKey, inputValue })
    );
    setState(store.getState().contextSlice);
  };

  //update data store when user deletes context
  const handleDeleteContextClick = () => {
    dispatch(actions.deleteContext(contextInput));
    setContextInput('');
    setState(store.getState().contextSlice);
    setTableState(defaultTableData);
    dispatchContext({
      type: 'DELETE ELEMENT',
      payload: 'FAKE_ID'
    });
  };

  //re-render data table when there's new changes
  const renderTable = targetContext => {
    if (
      targetContext === null ||
      targetContext === undefined ||
      !targetContext.values
    ) {
      // if (targetContext === null || targetContext === undefined) {
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
            {/* LegacyPD deleted the components below because we're going to replace with the component from CreationPanel */}
            {/* <Grid item>
              <AddContextForm
                contextStore={state}
                handleClickSelectContext={handleClickSelectContext}
                handleDeleteContextClick={handleDeleteContextClick}
                renderTable={renderTable}
                contextInput={contextInput}
                setContextInput={setContextInput}
              />
            </Grid> */}

            {/* <Divider variant="middle" />
            <Grid item>
              <AddDataForm
                handleClickInputData={handleClickInputData}
                contextInput={contextInput}
              />
            </Grid> */}
            <Grid item>
            <StatePropsPanel isThemeLight={props.isThemeLight}/>
            </Grid>
          </Grid>
        </Grid>
    
        {/* 
          LegacyPD commented out the below to move to DisplayContainer
        <Divider orientation="vertical" variant="middle" flexItem />
        <Grid item>
          <Typography
            style={{ color: 'black' }}
            variant="h6"
            gutterBottom={true}
          >
            State Data Table
          </Typography>
          <DataTable target={tableState} contextInput={contextInput} />
        </Grid> */}
      </Grid>
    </>
  );
};

export default CreateContainer;
