import React, { useContext, useState, Fragment, useEffect } from 'react';
import DataTable from '../CreateTab/components/DataTable';
import { useStore } from 'react-redux';
import ContextDropDown from './components/ContextDropDown';
import ComponentDropDown from './components/ComponentDropDrown';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import ComponentTable from './components/ComponentTable';
import { Button } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

const AssignContainer = () => {
  const [state, setState] = useState([]);
  const defaultTableData = [{ key: 'Key', value: 'Value' }];
  const [tableState, setTableState] = React.useState(defaultTableData);
  const store = useStore();
  const [contextInput, setContextInput] = React.useState(null);
  const [componentInput, setComponentInput] = React.useState(null);
  const [componentTable, setComponentTable] = useState([]);

  useEffect(() => {
    setState(store.getState().contextSlice);
  }, []);

  const renderTable = targetContext => {
    if (!targetContext.values) {
      setTableState(defaultTableData);
    } else {
      setTableState(targetContext.values);
    }
  };

  const renderComponentTable = targetContext => {
    console.log('current component is', targetContext);
    if (!targetContext.values) {
      const listOfContexts = [];
      if (!Array.isArray(state)) {
        state.allContext.forEach(context => {
          console.log('each context is', context);
          if (context.components.includes(targetContext))
            listOfContexts.push(context.name);
        });
      }
      // setComponentTable(defaultTableData);
      setComponentTable(listOfContexts);
    } else {
      setComponentTable(targetContext.values);
    }
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
              <DataTable target={tableState} />
            </Grid>
          </Grid>
        </Grid>
        <Divider orientation="vertical" variant="middle" flexItem>
          <Button>
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
