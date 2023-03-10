import React, { useContext, useState, Fragment, useEffect } from 'react';
import DataTable from '../CreateTab/components/DataTable';
import ContextDropDown from './components/ContextDropDown';
import ComponentDropDown from './components/ComponentDropDrown';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import ComponentTable from './components/ComponentTable';
import { Button } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
// import * as actions from '../../../redux/actions/actions';
import StateContext from '../../../context/context';
import {addComponentToContext}  from '../../../redux/reducers/slice/contextReducer'
import {useSelector, useDispatch , useStore,} from 'react-redux';

const AssignContainer = () => {
  const store = useStore();
  const dispatch = useDispatch();

  const [state, setState] = useState([]);
  const defaultTableData = [{ key: 'Key', value: 'Value' }];
  const [tableState, setTableState] = React.useState(defaultTableData);
  const [contextInput, setContextInput] = React.useState(null);
  const [componentInput, setComponentInput] = React.useState(null);
  const [componentTable, setComponentTable] = useState([]);
  const [stateContext, dispatchContext] = useContext(StateContext);
  const allContext = useSelector(state => state.contextSlice);

  //fetching data from redux store
  useEffect(() => {
    setState(allContext);
  }, []);

  const renderTable = targetContext => {
    if (targetContext === null || !targetContext.values) {
      setTableState(defaultTableData);
    } else {
      setTableState(targetContext.values);
    }
  };

  //construct data for table displaying component table
  const renderComponentTable = targetComponent => {
    //target Component is main

    const listOfContexts = [];
    if (
      !Array.isArray(state) &&
      targetComponent !== null &&
      targetComponent.name
    ) {
      state.allContext.forEach(context => {
        if (context.components.includes(targetComponent.name)) {
          listOfContexts.push(context.name);
        }
      });
      setComponentTable(listOfContexts);
    }
  };

  //handling assignment of contexts to components
  const handleAssignment = () => {
    if (
      contextInput === '' ||
      contextInput === null ||
      componentInput === '' ||
      componentInput === null
    )
      return;
    dispatch(
    addComponentToContext({
        context: contextInput,
        component: componentInput
      })
    );
    //trigger generateCode(), update code preview tab
    dispatchContext({
      type: 'DELETE ELEMENT',
      payload: 'FAKE_ID'
    });

    setState(allContext);
    renderComponentTable(componentInput);
  };

  return (
    <Fragment>
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
              <ContextDropDown
                contextStore={state}
                renderTable={renderTable}
                contextInput={contextInput}
                setContextInput={setContextInput}
              />
            </Grid>

            <Grid item>
              <DataTable target={tableState} contextInput={contextInput} />
            </Grid>
          </Grid>
        </Grid>
        <Divider orientation="vertical" variant="middle" flexItem>
          <Button onClick={handleAssignment}>
            <DoubleArrowIcon fontSize="large" color="primary" />
          </Button>
        </Divider>
        <Grid item>
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
                <ComponentDropDown
                  contextStore={state}
                  renderComponentTable={renderComponentTable}
                  componentInput={componentInput}
                  setComponentInput={setComponentInput}
                />
              </Grid>

              <Grid item>
                <ComponentTable target={componentTable} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default AssignContainer;
