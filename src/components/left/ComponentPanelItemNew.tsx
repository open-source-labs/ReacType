import React from 'react';
import Grid from '@material-ui/core/Grid';

import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';

const ComponentPanelItem = (): JSX.Element => {
  // useDrag hook allows components in left panel to be drag source
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.INSTANCE,
      newInstance: true,
      instanceType: 'Component',
      instanceId: 2
      // category,
    },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging()
    })
  });
  return (
    <Grid
      item
      ref={drag}
      xs={12}
      style={{
        color: 'white',
        // this is experimental for version: BLADERUNNER THEME
        backgroundColor: 'none',
        borderRadius: '10px',
        // minWidth: '340px',
        minHeight: '100px',
        border: '2px solid white'
      }}
    >
      Component Panel
    </Grid>
  );
};

export default ComponentPanelItem;
