import React, {useState, useContext} from 'react';
import Tree from './Tree';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import DataTable from './DataTable';
import { Typography } from '@mui/material';
import StateContext from '../../../context/context';

function DisplayContainer({data, props}) { // "data" is referring to components from state - passed in from StateManagement

  //grabbing intialized state from App using UseContext
  const [currComponentState, setCurrComponentState] = useState([]);
  const [parentProps, setParentProps] = useState([]);
  const [state, dispatch] = useContext(StateContext);
 
  let root = ''; 

  // check the canvasFocus
    // if canvasFocus is a root component, use that root component as "root"
    if (state.rootComponents.includes(state.canvasFocus.componentId)) {
        for (let i = 0; i < data.length; i++) {
          if (data[i]["id"] === state.canvasFocus.componentId) root = data[i]["name"];
        }
    } else if (state.projectType === "Classic React") {
    // else default to the main root component (aka app or index depending on react vs next/gatsby)
    root = 'App';
   } else {
    root = 'index';
   } 

  // root becomes default value of clickedComp
  const [clickedComp, setClickedComp] = useState(root);
  
  return (
    <div style={{display: 'flex'}}>
      {<Tree data = {data} currComponentState={currComponentState} setCurrComponentState ={setCurrComponentState} parentProps={parentProps} setParentProps={setParentProps} setClickedComp={setClickedComp}/>}
      <Divider orientation="vertical" variant="middle" flexItem />
        <Grid item>
        <Typography
            style={{ color: 'black' }}
            variant="subtitle2"
            gutterBottom={true}
            align="center"
          >
            Click on a component in the graph to see its state!
          </Typography>
          <Typography
            style={{ color: 'black' }}
            variant="h6"
            gutterBottom={true}
            align="center"
          >
            Total State for {clickedComp}
          </Typography>
           <DataTable currComponentState={currComponentState} setCurrComponentState ={setCurrComponentState} parentProps={parentProps} setParentProps={setParentProps} props={props} clickedComp={clickedComp} data = {data} /> 
        </Grid>
    </div>
  );
}
export default DisplayContainer;
