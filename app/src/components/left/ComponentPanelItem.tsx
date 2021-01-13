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

/*
SUMMARY: REACT DND
  -In React DnD, "items" of a certain "type" are dragged
  -Dragged items are objects
  -A type is a string that uniquely identifies a class of items (e.g., "html components")

  -useDrag is a hook from the React DnD API
    -Takes a specification object that includes:
      -Item (required): object describing data being dragged - only info the drop target (canvas) gets
        -type is required - must be a string or a symbol
          -Only drop targets registered for same type will allow drop to occur and react accordingly
          -In Canvas.tsx, see useDrop method - on line 47, canvas has type item.instanceType, allowing drop/interaction
        -canDrag: specifies when dragging is permitted (omitted if always permitted)
        -collect: method that returns an object of the props to inject into drop component
          -Takes two params: (1) monitor and (2) props
            -A monitor is a wrapper that allows update of props of components in response to drag-and-drop state changes
          -Within the collect method used here, monitor.isDragging returns a boolean reflecting whether a drag is in progress
            and an item is the source of the drag
*/

// ComponentPanelItem is a tile that represents a single component
const ComponentPanelItem: React.FC<{
  name: string;
  id: number;
  root: boolean;
  isFocus: boolean;
}> = ({ name, id, root, isFocus }) => {
  const classes = useStyles();
  const [state, dispatch] = useContext(StateContext);

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
      // not clear !! is needed on the next line -- monitor.isDragging() already returns a boolean, and quick testing w/out still works
      // on the other hand, commenting out this line of code entirely does not appear to change anything
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
        color: 'white',
        backgroundColor: 'transparent',
        height: '75px',
        marginBottom: '15px',
        border: root
          ? '2px dotted rgba(255,255,255, 0.45)'
          : '2px solid rgba(255,255,255, 0.75)',
        borderRadius: '8px'
      }}
    >
      <div className="compPanelItem" onClick={handleClick}>
        {isFocus && <div className={classes.focusMark}></div>}
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
    backgroundColor: '#01d46d',
    position: 'absolute',
    width: '12px',
    height: '12px',
    borderRadius: '12px',
    left: '-35px',
    top: '30px'
  }
});

export default ComponentPanelItem;
