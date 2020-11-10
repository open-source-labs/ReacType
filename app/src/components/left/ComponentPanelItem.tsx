import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import StateContext from '../../context/context';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';

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
    canDrag: !root && !isFocus,
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging()
    })
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
