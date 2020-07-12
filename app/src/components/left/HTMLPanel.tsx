import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';
import HTMLTypes from '../../context/HTMLTypes';
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

const HTMLPanel = (): JSX.Element => {
  const classes = useStyles();
  const options = HTMLTypes.map(option => {
    const [{ isDragging }, drag] = useDrag({
      item: {
        type: ItemTypes.INSTANCE,
        newInstance: true,
        instanceType: 'HTML Element',
        name: option.name,
        instanceTypeId: option.id
      },
      collect: (monitor: any) => ({
        isDragging: !!monitor.isDragging()
      })
    });
    return (
      <Grid item xs={5} key={`html-${option.name}`}>
        <div ref={drag} className={classes.HTMLPanelItem}>
          <h3>{option.name}</h3>
          <span
            style={{
              verticalAlign: 'middle',
              display: 'inline-block',
              marginLeft: '5px'
            }}
          >
            {<option.icon />}
          </span>
        </div>
      </Grid>
    );
  });

  return (
    <div>
      <h4> HTML Elements</h4>
      <Grid
        container
        spacing={1}
        direction="row"
        justify="center"
        alignItems="center"
      >
        {options}
      </Grid>
    </div>
  );
};

export default HTMLPanel;
