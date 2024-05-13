import React, { useState } from 'react';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import DataTable from './DataTable';
import Tree from './Tree';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

/**
 * `DisplayContainer` is a React component that provides an interactive visual representation
 * of the state architecture of an application using a tree graph. Users can click on nodes
 * in the tree graph to view detailed state information for each component in a `DataTable`.
 *
 * This component uses Redux to access global state to determine which component is currently
 * in focus and dynamically update the display based on user interactions with the tree graph.
 * It manages local state for the current component's state details and its parent's props,
 * which are passed down to child components for further interaction and display.
 *
 * @param {Object} props - Properties passed to the component including:
 * @param {Array} props.data - The hierarchical data used to generate the tree structure, typically derived from the application's state.
 * @param {Object} props.props - Additional props that might be necessary for child components or additional functionality.
 * @returns {JSX.Element} A split view containing a `Tree` visualization on the left and a `DataTable` on the right
 *                        that updates based on the node selected in the `Tree`.
 *
 * The `DisplayContainer` is designed to provide a comprehensive overview of the component structure of an application,
 * allowing developers to navigate and manage the state and props relationships visually. This component is part of a larger
 * state management feature within an application that may involve complex state logic and architecture.
 */
function DisplayContainer({ data, props }): JSX.Element {
  // "data" is referring to components from state - passed in from StateManagement
  // grabbing intialized state from App using UseContext
  const [currComponentState, setCurrComponentState] = useState([]);
  const [parentProps, setParentProps] = useState([]);
  const state = useSelector((store: RootState) => store.appState);

  let root = '';

  // check the canvasFocus
  // if canvasFocus is a root component, use that root component as "root"
  if (state.rootComponents.includes(state.canvasFocus.componentId)) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === state.canvasFocus.componentId) root = data[i].name;
    }
  } else if (state.projectType === 'Classic React') {
    // else default to the main root component (aka app or index depending on react vs next/gatsby)
    root = 'App';
  } else {
    root = 'index';
  }

  // root becomes default value of clickedComp
  const [clickedComp, setClickedComp] = useState(root);

  return (
    <div style={{ display: 'flex' }}>
      <Tree
        data={data}
        setCurrComponentState={setCurrComponentState}
        setParentProps={setParentProps}
        setClickedComp={setClickedComp}
      />
      <Divider orientation="vertical" variant="middle" flexItem />
      <Grid item style={{ margin: '60px 0 0 20px' }}>
        <Typography
          style={{ color: 'white', marginBottom: '30px' }}
          variant="subtitle2"
          gutterBottom
          align="center"
        >
          Click on a component in the graph to see its state
        </Typography>
        <Typography
          style={{ color: 'white' }}
          variant="h6"
          gutterBottom
          align="center"
        >
          Total State for {clickedComp}
        </Typography>
        <DataTable
          currComponentState={currComponentState}
          setCurrComponentState={setCurrComponentState}
          parentProps={parentProps}
          setParentProps={setParentProps}
          props={props}
          clickedComp={clickedComp}
          data={data}
        />
      </Grid>
    </div>
  );
}
export default DisplayContainer;
