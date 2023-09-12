import React from 'react';
import Grid from '@mui/material/Grid';
import StatePropsPanel from './components/StatePropsPanel';

const CreateContainer = ({isThemeLight, data}) => {

  return (
      <Grid container display="flex" justifyContent="stretch" flexDirection="column">
        <StatePropsPanel isThemeLight={isThemeLight} data={data}/>
      </Grid>
  );
};

export default CreateContainer;
