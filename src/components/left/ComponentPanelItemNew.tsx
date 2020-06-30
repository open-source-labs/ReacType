import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { stateContext } from '../../context/context';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';

const ComponentPanelItem: React.FC<{
  name: String;
  id: Number;
  root: Boolean;
  focusClick: any;
}> = ({ name, id, root, focusClick }) => {
  const [state, dispatch] = useContext(stateContext);
  // useDrag hook allows components in left panel to be drag source
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.INSTANCE,
      newInstance: true,
      instanceType: 'Component',
      instanceTypeId: id
    },
    canDrag: !root,
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging()
    })
  });

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
        // this is experimental for version: BLADERUNNER THEME
        backgroundColor: 'transparent',
        // minWidth: '340px',
        height: '80px',
        marginBottom: '15px',
        border: root
          ? '2px dotted rgba(255,255,255, 0.45)'
          : '2px solid rgba(255,255,255, 1)',
        borderRadius: root ? '' : '8px'
      }}
    >
      <div className="compPanelItem" onClick={handleClick}>
        <h3>
          {id} {name}
        </h3>
      </div>
    </Grid>
  );
};

export default ComponentPanelItem;
