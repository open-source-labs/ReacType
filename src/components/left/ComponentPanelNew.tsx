import React from 'react';

import Grid from '@material-ui/core/Grid';

import ComponentPanelItem from './ComponentPanelItemNew';

const ComponentPanel = (): JSX.Element => {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{
        minWidth: '470px',
        padding: '20px'
      }}
    >
      <ComponentPanelItem />
      <ComponentPanelItem />
      <ComponentPanelItem />
    </Grid>
    // </div>
  );
}

export default ComponentPanel;
