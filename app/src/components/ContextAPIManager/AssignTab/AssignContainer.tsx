/* eslint-disable max-len */
import React, { useState, Fragment } from 'react';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useSelector, useDispatch } from 'react-redux';
import DataTable from '../CreateTab/components/DataTable';
import ContextDropDown from './components/ContextDropDown';
import ComponentDropDown from './components/ComponentDropDrown';
import ComponentTable from './components/ComponentTable';
import { addComponentToContext } from '../../../redux/reducers/slice/contextReducer';
import { deleteElement } from '../../../redux/reducers/slice/appStateSlice';
import { RootState } from '../../../redux/store';
import { emitEvent } from '../../../../src/helperFunctions/socket';

/**
 * Provides an interface for assigning components to contexts within an application.
 * The component allows the selection of contexts and components through dropdown menus,
 * displays related data in tables, and permits the assignment of components to selected contexts.
 * It leverages Redux for state management and may trigger socket events for real-time updates across sessions.
 *
 * This component integrates several subcomponents:
 * - `ContextDropDown` for selecting contexts which triggers updates to the data table.
 * - `DataTable` for displaying key-value pairs related to the selected context.
 * - `ComponentDropDown` for selecting components which triggers updates to the component table.
 * - `ComponentTable` for displaying a list of contexts associated with a selected component.
 * - A button for assigning the selected component to the selected context, potentially emitting socket events if a room code is present.
 *
 * The state management involves interaction with the Redux store to fetch state information and dispatch actions related to context and component management.
 *
 * @returns {JSX.Element} A React component structured with a Grid layout, integrating forms and tables for managing and viewing context and component assignments.
 */
const AssignContainer = (): JSX.Element => {
  const dispatch = useDispatch();
  const defaultTableData = [{ key: 'Key', value: 'Value' }];
  const [tableState, setTableState] = React.useState(defaultTableData);
  const [contextInput, setContextInput] = React.useState(null);
  const [componentInput, setComponentInput] = React.useState(null);
  const [componentTable, setComponentTable] = useState([]);
  const { state, contextParam } = useSelector((store: RootState) => ({
    state: store.appState,
    contextParam: store.contextSlice,
  }));
  const roomCode = useSelector((store: RootState) => store.roomSlice.roomCode);

  // sets table data if it exists
  const renderTable = (targetContext) => {
    targetContext?.values && setTableState(targetContext.values);
  };

  // construct data for table displaying component table
  const renderComponentTable = (targetComponent) => {
    // target Component is main
    const listOfContexts = [];
    if (!Array.isArray(state) && targetComponent?.name) {
      contextParam.allContext.forEach((context) => {
        if (context.components.includes(targetComponent.name)) {
          listOfContexts.push(context.name);
        }
      });
      setComponentTable(listOfContexts);
    }
  };

  // handling assignment of contexts to components
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
        component: componentInput,
      }),
    );
    // trigger generateCode(), update code preview tab
    dispatch(deleteElement({ id: 'FAKE_ID', contextParam: contextParam }));

    if (roomCode) {
      emitEvent('assignContextActions', roomCode, {
        context: contextInput,
        component: componentInput,
        id: 'FAKE_ID',
        contextParam: contextParam,
      });
    }

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
                contextStore={contextParam}
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
                  contextStore={contextParam}
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
