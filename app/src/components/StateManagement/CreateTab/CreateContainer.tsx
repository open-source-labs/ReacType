import React, { useEffect, useState, useContext } from 'react';
import { useStore } from 'react-redux';
import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import * as actions from '../../../redux/actions/actions';
import StateContext from '../../../context/context';
import StatePropsPanel from './components/StatePropsPanel';

//LegacyPD added this in here 
//import StatePropsPanel from '../../right/StatePropsPanel';

const CreateContainer = ({isThemeLight, data}) => {
  const defaultTableData = [{ key: 'Enter Key', value: 'Enter value' }];
  const store = useStore();
  const [state, setState] = useState([]);
  const [tableState, setTableState] = useState(defaultTableData);
  const [contextInput, setContextInput] = useState(null);
  const [stateContext, dispatchContext] = useContext(StateContext);

  //pass down stateprops and parent props from state management

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
      setTableState(defaultTableData);
    } else {
      setTableState(targetContext.values);
    }
  };
  return (
      <Grid container display="flex" justifyContent="stretch" flexDirection="column">
        <StatePropsPanel isThemeLight={isThemeLight} data={data}/>
      </Grid>
  );
};

export default CreateContainer;
