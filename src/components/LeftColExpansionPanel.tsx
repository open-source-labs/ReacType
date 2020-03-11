import React, { Fragment, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Switch from '@material-ui/core/Switch'; // for state/class toggling
import InputLabel from '@material-ui/core/InputLabel'; // labeling of state/class toggles

// import { ComponentInt, ComponentsInt, ChildInt } from '../utils/Interfaces'; // unused

// TODO: ASSIGN SPECIFIC TYPING TO INCOMING PROPS (REMOVE ANY)
const LeftColExpansionPanel = (props: any) => {
  const {
    classes,
    focusComponent,
    component,
    addChild,
    changeFocusComponent,
    selectableChildren,
    components,
    deleteComponent,
    toggleComponentState,
    toggleComponentClass
  } = props;

  const { title, id, color, stateful, classBased } = component;
  useEffect(() => {
    console.log('title: ', title);
  });

  function isFocused() {
    return focusComponent.id === id ? 'focused' : '';
  }
  return (
    <Grid container spacing={16} direction="row" justify="flex-start" alignItems="center">
      <Grid item xs={9}>
        <div
          className={classes.root}
          style={!isFocused() ? {} : { boxShadow: '0 10px 10px rgba(0,0,0,0.25)' }}
        >
          <Grid item xs={12} style={{ color: 'red' }}>
            <List style={{ color: 'red' }}>
              <ListItem
                button
                style={{ color: 'red' }}
                onClick={() => {
                  changeFocusComponent({ title });
                }}
              >
                <ListItemText
                  disableTypography
                  className={classes.light}
                  primary={
                    <div>
                      <Typography type="body2" style={{ color }}>
                        {title}
                      </Typography>
                      {/* TOGGLE FOR STATEFULNESS */}
                      <InputLabel
                        htmlFor="stateful"
                        style={{
                          color: '#fff',
                          marginBottom: '10px',
                          marginTop: '0px',
                          marginLeft: '11px',
                          padding: '0px',
                          fontSize: '18px'
                        }}
                      >
                        State?
                      </InputLabel>
                      {/* 
                          Have to change focus component after toggling state 
                          in order to properly change the code that appears in the code 
                          peview
                      */}
                      <Switch
                        checked={stateful}
                        onChange={e => {
                          toggleComponentState(id);
                          changeFocusComponent(title);
                        }}
                        value="stateful"
                        color="primary"
                        id={props.id.toString()}
                        // id={props.index.toString()}
                      />
                      <div>
                        {/* TOGGLE FOR CLASS BASED */}
                        <InputLabel
                          htmlFor="classBased"
                          style={{
                            color: '#fff',
                            marginBottom: '10px',
                            marginTop: '0px',
                            marginLeft: '11px',
                            padding: '0px',
                            fontSize: '18px'
                          }}
                        >
                          Class?
                        </InputLabel>
                        <Switch
                          checked={classBased}
                          onChange={e => {
                            toggleComponentClass(id);
                            changeFocusComponent(title);
                          }}
                          value="classBased"
                          color="primary"
                        />
                      </div>
                    </div>
                  }
                  style={{ color }}
                />
              </ListItem>
            </List>
          </Grid>
          {id === 1 || !isFocused() ? (
            <div />
          ) : (
            <Fragment>
              <Button
                variant="text"
                size="small"
                color="default"
                aria-label="Delete"
                className={classes.margin}
                onClick={() =>
                  deleteComponent({
                    componentId: id,
                    stateComponents: components
                  })
                }
                style={{
                  color: '#D3D3D3',
                  marginBottom: '10px',
                  marginTop: '0px',
                  marginLeft: '11px',
                  padding: '0px'
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
        {id === 1 || isFocused() || !selectableChildren.includes(id) ? (
          <div />
        ) : (
          <Tooltip title="add as child" aria-label="add as child" placement="left">
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
      backgroundColor: '#333333'
    },
    light: {
      color: '#eee',
      '&:hover': {
        color: '#1de9b6'
      }
    }
  };
}

export default withStyles(styles)(LeftColExpansionPanel);
