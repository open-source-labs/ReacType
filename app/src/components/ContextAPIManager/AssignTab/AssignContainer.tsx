import { Typography } from '@material-ui/core';
import React, { useContext, useState, Fragment, useEffect } from 'react';
import ContextTable from './components/ContextTable';
import { useStore } from 'react-redux';
import StateContext from '../../../context/context';
import ContextDropDown from './components/ContextDropDown';

const AssignContainer = () => {
  const [state, setState] = useState(null);

  useEffect(() => {
    setState(store.getState().contextSlice);
  }, []);

  // const [componentList, setComponentList] = useContext(StateContext);

  const store = useStore();

  console.log(componentList);

  //create an onclick for assign

  return (
    <Fragment>
      <ContextDropDown contextList={state} />
      <ContextTable />
    </Fragment>
  );
};

export default AssignContainer;
