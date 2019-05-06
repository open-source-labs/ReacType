import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';

import { openExpansionPanel } from '../utils/componentReducer.util';

const LeftColExpansionPanel = (props) => {
  const {
    classes,
    focusComponent,
    component,
    addChild,
    changeFocusComponent,
    selectableChildren,
    components,
    deleteComponent,
  } = props;
  const { title, id, color } = component;

  // show a string of all direct parents. SO the user can gaze at it.
  const directParents = components
    .filter(comp => comp.childrenArray.some(child => child.childComponentId === id))
    .map(comp => comp.title)
    .join(',');

  function isFocused() {
    return focusComponent.id === id ? 'focused' : '';
  }

  return (
    <Grid container spacing={16} direction="row" justify="flex-start" alignItems="baseline">
      <Grid item xs={9}>
        <div
          className={classes.root}
          style={!isFocused() ? {} : { boxShadow: '0 10px 10px rgba(0,0,0,0.22)' }}
        >
          <Grid item xs={12} style={{ color: 'red' }}>
            <List style={{ color: 'red' }}>
              <ListItem
                button
                component="a"
                style={{ color: 'red' }}
                onClick={() => {
                  changeFocusComponent({ title });
                }}
              >
                <ListItemText
                  disableTypography
                  className={classes.light}
                  primary={
                    <Typography type="body2" style={{ color }}>
                      {title}
                    </Typography>
                  }
                  // secondary={isFocused()}
                  style={{ color }}
                />
              </ListItem>
            </List>
          </Grid>
          {id === 1 || !isFocused() ? (
            <div />
          ) : (
            <Fragment>
              <span>
                {directParents ? (
                  <p
                    style={{
                      marginLeft: '10px',
                      color: 'white',
                      fontSize: '12px',
                      marginTop: '1px',
                    }}
                  >
                    Used in: {directParents}
                  </p>
                ) : (
                  <p
                    style={{
                      marginLeft: '10px',
                      color: 'white',
                      fontSize: '12px',
                      marginTop: '1px',
                    }}
                  >
                    Not used
                  </p>
                )}
              </span>
              <Fab
                variant="extended"
                size="small"
                color="inherit"
                aria-label="Delete"
                className={classes.margin}
                style={{
                  marginLeft: '10px',
                  marginTop: '5px',
                  marginBottom: '10px',
                }}
                // style={{ maxWidth: "20px" }}
                onClick={() => deleteComponent({
                  componentId: id,
                  stateComponents: components,
                })
                }
              >
                <DeleteIcon className={classes.extendedIcon} />
                Delete
              </Fab>
              {/* <IconButton
                style={{ display: "inline-block" }}
                onClick={() =>
                  deleteComponent({
                    componentId: id,
                    stateComponents: components
                  })
                }
              >
                <DeleteIcon />
              </IconButton> */}
            </Fragment>
          )}
        </div>
      </Grid>

      <Grid item xs={3}>
        {id === 1 || isFocused() || !selectableChildren.includes(id) ? (
          <div />
        ) : (
          <IconButton aria-label="Add">
            <AddIcon
              style={{ color, float: 'right' }}
              onClick={() => {
                addChild({ title, childType: 'COMP' });
              }}
            />
          </IconButton>
        )}
      </Grid>
    </Grid>
  );
};

function styles(theme) {
  return {
    root: {
      width: '100%',
      // flexGrow: 1,
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
