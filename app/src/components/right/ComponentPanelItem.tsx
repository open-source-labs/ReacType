import React from 'react';
import Grid from '@mui/material/Grid';
import makeStyles from '@mui/styles/makeStyles';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';
import { useDispatch, useSelector } from 'react-redux';
import { changeFocus } from '../../redux/reducers/slice/appStateSlice';
import { RootState } from '../../redux/store';
import { emitEvent } from '../../helperFunctions/socket';
import * as Icons from '@mui/icons-material';
/*
DESCRIPTION: This component is each box beneath the 'HTML Elements' and
  'reusable components' (in classic React mode) headings. Drag-and-drop
  functionality works only for reusable components.

  -root is a boolean reflecting whether a component is a root component (that is, a container)
  -isFocus is boolean reflecting whether a component is the one currently displayed on the canvas
*/
// ComponentPanelItem is a tile that represents a single component
const ComponentPanelItem: React.FC<{
  name: string;
  id: number;
  root: boolean;
  isFocus: boolean;
  isThemeLight: boolean;
}> = ({ name, id, root, isFocus, isThemeLight }) => {
  const classes = useStyles({});
  const state = useSelector((store: RootState) => store.appState);
  const roomCode = useSelector((store: RootState) => store.roomSlice.roomCode);
  const dispatch = useDispatch();

  const IconComponent = Icons[name]; // Use the correct icon component based on the name

  // useDrag hook allows components in left panel to be drag source
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.INSTANCE,
      newInstance: true,
      instanceType: 'Component',
      instanceTypeId: id
    },
    canDrag: !root && !isFocus, // dragging not permitted if component is root component or current component
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging() // !! converts an object to a boolean (i.e., if falsy, becomes false => !!0 === false)
    })
  });

  // when a component is clicked in the left panel, change canvas focus to that component
  const handleClick = () => {
    //LEGACY PD
    dispatch(changeFocus({ componentId: id, childId: null }));

    if (roomCode) {
      emitEvent('changeFocusAction', roomCode, {
        componentId: id,
        childId: null
      });
    }
  };

  return (
    <Grid
      item
      ref={drag}
      xs={8}
      style={{
        fontSize: 'small',
        backgroundColor: '#2D313A', // Set background color
        border: '2px solid',
        borderRadius: '10px',
        borderColor: '#2D313A',
        margin: '5px 0px',
        width: '10rem', 
        height: '3rem', 
        position: 'relative',
      }}
    >
      {isFocus && <div className={classes.focusMark}></div>}
      <div className="compPanelItem" onClick={handleClick}>
        <div className={classes.nameContainer}>
          {IconComponent && <IconComponent />}
          <h3
            className={`${name} ${
              isThemeLight ? classes.lightTheme : classes.darkTheme
            }`}
          >
            {name}
          </h3>
        </div>
      </div>
    </Grid>
  );
};

const useStyles = makeStyles({
  nameContainer: {
    display: 'flex',
    alignItems: 'center', 
  },
  focusMark: {
    border: '2px solid #0671e3', 
    borderRadius: '5%', 
    position: 'absolute', 
    top: '0', 
    left: '0', 
    right: '0', 
    bottom: '0',  
  },
  lightTheme: {
    color: 'rgba (0, 0, 0, 0.54)'
  },
  darkTheme: {
    color: '#ffffff'
  }
});

export default ComponentPanelItem;
