import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import StateContext from '../../context/context';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';
/*
DESCRIPTION: This component is each box beneath the 'root components' and
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
  const classes = useStyles();
  const [, dispatch] = useContext(StateContext);
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
      isDragging: !!monitor.isDragging(), // !! converts an object to a boolean (i.e., if falsy, becomes false => !!0 === false)
    }),
  });

  // when a component is clicked in the left panel, change canvas focus to that component
  const handleClick = () => {
    dispatch({
      type: 'CHANGE FOCUS',
      payload: { componentId: id, childId: null }
    });
  };
  return (
    <Grid
      item
      ref={drag}
      xs={8}
      style={{
        display: 'grid',
        color: isThemeLight ? 'black' : 'white',
        backgroundColor: 'transparent',
        // border: root
        //   ? '2px dotted #186BB4'
        //   : '2px solid #186BB4',
        border: isThemeLight
          ? '2px solid black'
          : '2px solid white',
        borderRadius: '4px',
        borderColor: '#000000',
        margin: '5px 0px'
      }}
    >
      {isFocus && <div className={classes.focusMark}></div>}  
      <div className="compPanelItem" onClick={handleClick}>
        <h3>{name}</h3>
      </div>
    </Grid>
  );
};
const useStyles = makeStyles({
  activeFocus: {
    backgroundColor: 'rgba(1,212,109,0.3)'
  },
  focusMark: {
    backgroundColor: 'red',
    justifySelf: 'left',
    width: '12px',
    height: '12px',
    borderRadius: '25px',
  },
  lightTheme: {
    color: 'rgba (0, 0, 0, 0.54)'
  },
  darkTheme: {
    color: '#fff'
  }
});
export default ComponentPanelItem;