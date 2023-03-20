import React, { useEffect, useState } from 'react';
// import { useStore } from 'react-redux';
import Grid from '@mui/material/Grid';
import StatePropsPanel from './components/StatePropsPanel';

const CreateContainer = ({isThemeLight, data}) => {
  // const store = useStore();
  // const [state, setState] = useState([]);

  // //pulling data from redux store
  // useEffect(() => {
  //   setState(store.getState().contextSlice);
  // }, []);

  return (
      <Grid container display="flex" justifyContent="stretch" flexDirection="column">
        <StatePropsPanel isThemeLight={isThemeLight} data={data}/>
      </Grid>
  );
};

export default CreateContainer;
