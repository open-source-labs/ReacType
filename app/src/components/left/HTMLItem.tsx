import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  HTMLPanelItem: {
    color: 'white',
    // this is experimental for version: BLADERUNNER THEME
    backgroundColor: 'transparent',
    // minWidth: '340px',
    minHeight: '60px',
    marginBottom: '10px',
    marginRight: '5px',
    marginLeft: '5px',
    border: '2px dotted rgba(255,255,255, 0.45)',
    borderRadius: '8px',
    cursor: 'grab',
    '& > h3': {
      display: 'inline-block',
      paddingTop: '18px'
    }
  }
});

const HTMLItem: React.FC<{
  name: string;
  id: number;
  Icon: any;
}> = ({ name, id, Icon }) => {
  const classes = useStyles();

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.INSTANCE,
      newInstance: true,
      instanceType: 'HTML Element',
      name,
      instanceTypeId: id
    },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging()
    })
  });

  return (
    <Grid item xs={5} key={`html-${name}`}>
      <div ref={drag} className={classes.HTMLPanelItem}>
        <h3>{name}</h3>
        <span
          style={{
            verticalAlign: 'middle',
            display: 'inline-block',
            marginLeft: '5px'
          }}
        >
          {Icon && <Icon />}
        </span>
      </div>
    </Grid>
  );
}

export default HTMLItem;
