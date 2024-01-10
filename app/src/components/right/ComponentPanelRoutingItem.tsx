import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import { ItemTypes } from '../../constants/ItemTypes';
// ------------------------------------------------
import MenuItem from '@mui/material/MenuItem';
import { RootState } from '../../redux/store';
import Select from '@mui/material/Select';
import makeStyles from '@mui/styles/makeStyles';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';

// ------------------------------------------------

/*
N.B.: RENDERED ONLY IN NEXT.JS MODE

DESCRIPTION: This is the box beneath the "Navigation" heading. It allows insertion of links
  ("routing items") between pages (which are listed in the "Pages" menu, located above in the app).
First, this component gathers all Pages (as listed in the Pages menu) and puts them in an
  array of names of those Pages (navigableComponents). 
Next, it sets route (hook state) to the first value in navigableComponents and checks whether
  that value (referencedComponent) still exists in the app's central state (Redux). If it does,
  the variable routeId is set to the id property of referencedComponent. If it doesn't,
  referencedComponent is replaced by index (the only Page guaranteed to exist) in navigableComponents.
Dragging works in the same manner as in ComponentPanelItem.tsx
*/
// a component panel routing item is a Next.js component that allows the user to navigate between pages
const ComponentPanelRoutingItem: React.FC<{}> = () => {
  const classes = useStyles();
  ('s there, ');
  const state = useSelector((store: RootState) => store.appState);

  // find the root components that can be associated with a route
  // These will be the components that are displayed in the dropdown adjacent to "Route Link"
  let navigableComponents = state.components
    .filter((comp) => state.rootComponents.includes(comp.id))
    .map((comp) => comp.name);

  // set state for the route currently selected in the dropdown
  const [route, setRoute] = useState(navigableComponents[0]);

  let routeId;
  // check if the component in the drop down still references an existing component
  const referencedComponent = state.components.find(
    (comp) => comp.name === route
  );
  // if so, set the route id for that component to the id of the referenced component
  if (referencedComponent) routeId = referencedComponent.id;
  // otherwise, set the component name and and id to the root component
  else {
    setRoute(state.components[0].name);
    routeId = 1;
  }
  // on switching to another Page in the dropdown menu, update hook state
  const handleRouteChange = (event) => {
    setRoute(event.target.value);
  };
  // useDrag hook allows components in left panel to be drag source
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.INSTANCE,
      newInstance: true,
      instanceType: 'Route Link',
      instanceTypeId: routeId
    },
    canDrag: true,
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging()
    })
  });

  return (
    <Grid
      item
      ref={drag}
      xs={8}
      style={{
        color: '#C6C6C6',
        backgroundColor: 'transparent',
        height: '75px',
        marginBottom: '15px',
        border: '2px dotted #46C0A5',
        borderRadius: '8px'
      }}
    >
      {/* Route Link component */}
      <div className="compPanelItem">
        <h3>Route Link</h3>
        {/* Select is the dropdown menu */}
        <Select
          variant="outlined"
          labelId="project-type-label"
          id="demo-simple-select"
          className={classes.routeSelector}
          value={route}
          onChange={handleRouteChange}
        >
          {/* each MenuItem is a Page in the dropdown menu  */}
          {navigableComponents.map((page) => (
            <MenuItem key={'menu' + page} value={page}>
              {page}
            </MenuItem>
          ))}
        </Select>
      </div>
    </Grid>
  );
};

const useStyles = makeStyles({
  activeFocus: {
    backgroundColor: '#808080'
  },
  focusMark: {
    backgroundColor: '#808080',
    position: 'absolute',
    width: '12px',
    height: '12px',
    borderRadius: '12px',
    left: '-35px',
    top: '30px'
  },
  routeSelector: {
    backgroundColor: '#808080',
    marginLeft: '20px',
    color: '#fff',
    height: '60%',
    alignSelf: 'center',
    minWidth: '100px'
  }
});

export default ComponentPanelRoutingItem;
