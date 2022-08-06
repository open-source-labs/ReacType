import React, { useRef, useEffect, useContext, Children } from 'react';
import { select, hierarchy, tree, linkHorizontal } from 'd3';
import cloneDeep from 'lodash/cloneDeep';
import useResizeObserver from './useResizeObserver';
import StateContext from '../../../context/context';
import { element } from 'prop-types';
import Tree from './Tree';


function DisplayContainer({data}) { // data is components from state - passed in from state manager
  return (
    <div style={{display: 'flex'}}>
      {<Tree data = {data} />}
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates officiis reprehenderit eligendi repellendus incidunt ducimus expedita laborum rem. Quasi sunt voluptatum iusto odio explicabo vero consequuntur vitae quos enim amet.</p>
    </div>
  );
}
export default DisplayContainer;
