import React, { Fragment, Component } from 'react';
import { ComponentState } from '../types/types';
import { withStyles, Typography, KeyboardArrowRightRoundedIcon, KeyboardArrowDownRoundedIcon, List, ListItem, ListItemText, InputLabel, Switch, Select, MenuItem, IconButton, Grid, AddCircleIcon, RemoveCircleIcon, DeleteIcon, Button, Tooltip } from '../utils/material.util';

type Props = {
  classes: any;
  focusComponent: ComponentState;
  component: ComponentState;
  addChild: any;
  deleteChild: any;
  toggleExpansionPanel: any;
  changeFocusComponent: any;
  updateComponent: any;
  selectableChildren: any;
  components: ComponentState[];
  deleteComponent: any;
  isFocusChild: boolean;
};

class LeftColExpansionPanel extends Component<Props> {
  render() {
    const { classes, component, addChild, deleteChild, toggleExpansionPanel, updateComponent, components, deleteComponent, isFocusChild } = this.props;
    const { title, id, color, expanded, stateful } = component;
    const addOrRemoveChildButton = () => {
      if (expanded || components.every((comp) => !comp.expanded)) {
        return <div></div>;
      } 
      if (!isFocusChild) {
        return (
          <Tooltip 
            title="Add Child" 
            aria-label="Add Child" 
            placement="left"
            style={{ position: 'absolute', right: '0', top: '0', bottom: '0' }}
          >
            <IconButton
              aria-label="Add"
              onClick={() => {
                addChild(title, 'COMP');
              }}
            >
              <AddCircleIcon style={{ color }} />
            </IconButton>
          </Tooltip>
        )
      } else {
        return (
          <Tooltip 
            title="Remove Child" 
            aria-label="Remove Child" 
            placement="left"
            style={{ position: 'absolute', right: '0', top: '0', bottom: '0' }}
          >
            <IconButton
              aria-label="Remove"
              onClick={() => {
                deleteChild(id);
              }}
            >
              <RemoveCircleIcon style={{ color }} />
            </IconButton>
          </Tooltip>
        )
      }
    }
    return (
      <Grid container spacing={16} direction="row" justify="flex-start" alignItems="center" style={{ position: 'relative', margin: '5px 0', width: '100%', backgroundColor: '#303147', borderRadius: '6px'}}>
        <Grid 
          item xs={12}
          style={!expanded ? { padding: '0' } : { backgroundColor: color, borderRadius: '6px', color: '#fff', padding: '0 10px 20px' }}
        >
          <Grid item xs={12}>
            <List>
              <ListItem
                button
                onClick={() => {
                  toggleExpansionPanel(id);
                }}
                style={{ padding: '10px'}}
              >
                <ListItemText
                  disableTypography
                  className={classes.light}
                  primary={
                    <Typography type="body2" style={!expanded ? { display:'flex', alignItems: 'center', fontSize: '16px', color } : { display:'flex', alignItems: 'center', fontSize: '16px', color: '#fff' }}>
                      {!expanded ? <KeyboardArrowRightRoundedIcon style={{ fontSize: '24px', marginRight: '5px', color }} /> : <KeyboardArrowDownRoundedIcon style={{ fontSize: '24px', marginRight: '5px', color: '#fff' }} />}
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
                  htmlFor='stateful'
                  style={{
                    color: '#fff',
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
                  style={{
                    color: '#fff',
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
                  style={{
                    color: '#fff',
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
                  color: '#fff',
                  marginBottom: '10px',
                  marginTop: '0px',
                  marginLeft: '11px',
                  padding: '0px',
                }}
              >
                <DeleteIcon style={{ color: '#fff' }} />
                Delete Component
              </Button>
            </Fragment>
          )}
          {/* checks to see if the current component pane is expanded, if the children of the current component has the id of any of the current components or if every component is currently not expanded */ }
          {addOrRemoveChildButton()}
        </Grid>
      </Grid>
    );
  }
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
