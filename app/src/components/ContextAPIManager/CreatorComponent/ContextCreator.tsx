import { Typography } from '@material-ui/core';
import React from 'react';
import { useStore } from 'react-redux'

import CreatorForm  from './CreatorForm';

const ContextCreator = () => {
  const store = useStore();
  console.log(store.getState())
  return (
    <>
      <CreatorForm />
    </>
  )
};

export default ContextCreator;
