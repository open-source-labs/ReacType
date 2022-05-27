import { Typography } from '@material-ui/core';
import React, {useEffect, useState } from 'react';
import { useStore } from 'react-redux'

import CreatorForm  from './CreatorForm';

const ContextCreator = () => {
  const store = useStore();
  const [state, setState] = useState([]);
  
  useEffect(() => {
    setState(store.getState().contextSlice)
  }, [])
  return (
    <>
      <CreatorForm contextStore={state}/>
    </>
  )
};

export default ContextCreator;
