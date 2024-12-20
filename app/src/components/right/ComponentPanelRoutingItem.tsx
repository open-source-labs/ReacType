/* eslint-disable max-len */
import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
// ------------------------------------------------
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import makeStyles from '@mui/styles/makeStyles';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ItemTypes } from '../../constants/ItemTypes';

/**
 * `ComponentPanelRoutingItem` represents a routing item in a component panel, specifically for Next.js mode.
 * It facilitates the creation of navigational links between pages by providing a drag-and-drop interface.
 * Users can select from a list of root components (pages) to set up navigation routes within the application.
 *
 * This component fetches root components from the Redux store, presents them in a dropdown for user selection,
 * and enables dragging these as route links to be dropped into a design canvas.
 *
 * @returns {JSX.Element} A grid item that contains a dropdown of navigable components and supports drag-and-drop.
 */
const ComponentPanelRoutingItem: React.FC<{}> = (): JSX.Element => {
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
        border: '2px dotted #f88e16',
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
