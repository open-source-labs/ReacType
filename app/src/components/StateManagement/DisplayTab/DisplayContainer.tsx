import React, {useState, useContext} from 'react';
import Tree from './Tree';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import DataTable from './DataTable';
import { Typography } from '@mui/material';
import StateContext from '../../../context/context';

function DisplayContainer({data, props}) { // "data" is referring to components from state - passed in from StateManagement

  //grabbing intialized state from App using the UseContext to put in lines 16 and 17
  const [currComponentState, setCurrComponentState] = useState([]);
  const [parentProps, setParentProps] = useState([]);
  const [state, dispatch] = useContext(StateContext);

  
  // check projectType. If it's 'Classic React', title should read 'App'. Otherwise it's Next.js or Gatsby which uses 'index'
  let root; 
  if (state.projectType === "Classic React") {
    root = 'App';
  } else {
    root = 'index';
  } 
  const [clickedComp, setClickedComp] = useState(root);
  
  return (
    <div style={{display: 'flex'}}>
      {<Tree data = {data} currComponentState={currComponentState} setCurrComponentState ={setCurrComponentState} parentProps={parentProps} setParentProps={setParentProps} setClickedComp={setClickedComp}  />}
      <Divider orientation="vertical" variant="middle" flexItem />
        <Grid item>
          <Typography
            style={{ color: 'black' }}
            variant="h6"
            gutterBottom={true}
            align="center"
          >
            Total State for {clickedComp}
          </Typography>
           <DataTable currComponentState={currComponentState} setCurrComponentState ={setCurrComponentState} parentProps={parentProps} setParentProps={setParentProps} props={props} clickedComp={clickedComp}  /> 
        </Grid>
    </div>
  );
}
export default DisplayContainer;
