import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InputLabel from '@material-ui/core/InputLabel';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { ComponentInt, ComponentsInt, ChildInt } from '../utils/interfaces.ts';

const LeftColExpansionPanel = (props: any) => {
  const {
    classes,
    focusComponent,
    component,
    addChild,
    toggleExpansionPanel,
    changeFocusComponent,
    updateComponent,
    selectableChildren,
    components,
    deleteComponent,
  } = props;
  const { title, id, color, expanded, stateful, children } = component;

  return (
    <Grid container spacing={16} direction="row" justify="flex-start" alignItems="center">
      <Grid item xs={9}>
        <div
          className={classes.root}
          style={!expanded ? {} : { boxShadow: '0 10px 10px rgba(0,0,0,0.25)' }}
        >
          <Grid item xs={12} style={{ color: 'red' }}>
            <List style={{ color: 'red' }}>
              <ListItem
                button
                style={{ color: 'red' }}
                onClick={() => {
                  // changeFocusComponent({ title });
                  toggleExpansionPanel(id);
                }}
              >
                <ListItemText
                  disableTypography
                  className={classes.light}
                  primary={
                    <Typography type="body2" style={{ color, fontSize: '20px', paddingBottom: '0px' }}>
                      {title}
                    </Typography>
                  }
                  style={{ color }}
                />
              </ListItem>
            </List>
          </Grid>
          {!expanded? (
            <div />
          ) : (
            <Fragment>
              <div className={classes.margin}>
                <InputLabel 
                  className={classes.light} 
                  htmlFor='stateful'
                  style={{
                    color: '#D3D3D3',
                    marginBottom: '10px',
                    marginTop: '0px',
                    marginLeft: '11px',
                    padding: '0px',
                    fontSize: '18px',
                  }}
                >State?</InputLabel>
                <Switch
                  checked={stateful}
                  onChange={(e) => updateComponent(id, { stateful: e.target.checked })}
                  value='stateful'
                  color='primary'
                  id='stateful'
                />
              </div>
              <div className={classes.margin}>
                <InputLabel 
                  id="label" 
                  className={classes.light}
                  style={{
                    color: '#D3D3D3',
                    marginBottom: '10px',
                    marginTop: '0px',
                    marginLeft: '11px',
                    padding: '0px',
                    fontSize: '18px',
                  }}>
                    Component Type</InputLabel>
                <Select 
                  id="select" 
                  value="class"
                  className={classes.light}
                  style={{
                    color: '#D3D3D3',
                    marginBottom: '10px',
                    marginTop: '0px',
                    marginLeft: '11px',
                    padding: '0px',
                    fontSize: '18px',
                  }}>
                    <MenuItem value="class">Class</MenuItem>
                    <MenuItem value="functional">Functional</MenuItem>
                </Select>
              </div>
              <Button
                variant="text"
                size="small"
                color="default"
                aria-label="Delete"
                className={classes.margin}
                onClick={() => deleteComponent(id)
                }
                style={{
                  color: '#D3D3D3',
                  marginBottom: '10px',
                  marginTop: '0px',
                  marginLeft: '11px',
                  padding: '0px',
                }}
              >
                <DeleteIcon style={{ color: '#D3D3D3' }} />
                Delete Component
              </Button>
            </Fragment>
          )}
        </div>
      </Grid>

      <Grid item xs={3}>
        {/* checks to see if the current component pane is expanded, if the children of the current component has the id of any of the current components or if every component is currently not expanded */ }
        {expanded || children.find((childId: number) => childId === id) || components.every((comp) => !comp.expanded) ? (
          <div />
        ) : (
          <Tooltip title="Add Child" aria-label="Add Child" placement="left">
            <IconButton
              aria-label="Add"
              onClick={() => {
                addChild({ title, childType: 'COMP' });
              }}
            >
              <AddIcon style={{ color, float: 'right' }} />
            </IconButton>
          </Tooltip>
        )}
      </Grid>
    </Grid>
  );
};

function styles(): any {
  return {
    root: {
      width: '100%',
      marginTop: 10,
      backgroundColor: '#333333',
    },
    light: {
      color: '#eee',
      '&:hover': {
        color: '#1de9b6',
      },
    },
  };
}

export default withStyles(styles)(LeftColExpansionPanel);
