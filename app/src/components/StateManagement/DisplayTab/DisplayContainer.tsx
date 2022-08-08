import React, { useRef, useEffect, useState, useContext, Children } from 'react';
import { select, hierarchy, tree, linkHorizontal } from 'd3';
import cloneDeep from 'lodash/cloneDeep';
import useResizeObserver from './useResizeObserver';
import StateContext from '../../../context/context';
import { element } from 'prop-types';
import Tree from './Tree';
import TotalPropsPanel from './TotalPropsPanel';


function DisplayContainer({data, props}): JSX.Element { // data is components from state - passed in from state manager
  //pass down hooks to store stateprops and parents from state management components
  const [parentProps, setParentProps] = useState([]);
  const [currComponentState, setCurrComponentState] = useState([]);
  
  return (
    <div style={{display: 'flex'}}>
      <div style={{maxWidth: "500px"}}>
      <Tree data = {data} currComponentState={currComponentState} setCurrComponentState ={setCurrComponentState} parentProps={parentProps} setParentProps={setParentProps} />
      </div>
      
      
      <TotalPropsPanel currComponentState={currComponentState} setCurrComponentState ={setCurrComponentState} parentProps={parentProps} setParentProps={setParentProps} props={props}/>
    </div>
  )
}
export default DisplayContainer;
