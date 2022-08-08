import React, { useRef, useEffect, useContext, useState, Children } from 'react';
import { select, hierarchy, tree, linkHorizontal } from 'd3';
import cloneDeep from 'lodash/cloneDeep';
import useResizeObserver from './useResizeObserver';
import StateContext from '../../../context/context';
import { element } from 'prop-types';
import Tree from './Tree';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import DataTable from './DataTable';
import { Typography } from '@mui/material';

function DisplayContainer({data, props}) { // data is components from state - passed in from state manager

  //grabbing intialized state from App using the UseContext to put in lines 16 and 17
  const [currComponentState, setCurrComponentState] = useState([]);
  const [parentProps, setParentProps] = useState([]);
  const [clickedComp, setClickedComp] = useState('App');
  // dummy data
  // const tableState = [{ name: 'State Name', type: 'Typescript Data Type', value: 'Initial State Value' }];
  // const contextInput = null;

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
          {/* target={tableState} contextInput={contextInput} */}
          <DataTable currComponentState={currComponentState} setCurrComponentState ={setCurrComponentState} parentProps={parentProps} setParentProps={setParentProps} props={props} clickedComp={clickedComp}  />
        </Grid>
    </div>
  );
}
export default DisplayContainer;
