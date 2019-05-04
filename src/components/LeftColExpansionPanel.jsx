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
import { openExpansionPanel } from '../utils/componentReducer.util';

const LeftColExpansionPanel = props => {
  const { classes, focusComponent, component, addChild, changeFocusComponent, selectableChildren } = props;
  const { title, id, color } = component;

  function isFocused() {
    return focusComponent.id == id ? 'focused' : '';
  }

  return (
    <Grid
      container
      spacing={16}
      direction="row"
      justify="flex-start"
      alignItems="baseline"
    >
      <Grid item xs={9}>
        <div
          className={classes.root}
          style={
            !isFocused() ? {} : { boxShadow: "0 10px 10px rgba(0,0,0,0.22)" }
          }
        >
          <Grid item xs={12} style={{ color: "red" }}>
            <List style={{ color: "red" }}>
              <ListItem
                button
                component="a"
                style={{ color: "red" }}
                onClick={() => {
                  changeFocusComponent({ title });
                }}
              >
                <ListItemText
                  disableTypography
                  className={classes.light}
                  primary={
                    <Typography type="body2" style={{ color: color }}>
                      {title}
                    </Typography>
                  }
                  // secondary={isFocused()}
                  style={{ color }}
                />
              </ListItem>
            </List>
          </Grid>
          {id == 1 || !isFocused() ? (
            <div />
          ) : (
            <Fragment>
              <IconButton
                style={{ display: "inline-block" }}
                onClick={() =>
                  deleteComponent({
                    componentId: id,
                    stateComponents: components
                  })
                }
              >
                <DeleteIcon />
              </IconButton>

              <span>
                {directParents ? `Used in: ${directParents}` : "Not used"}
              </span>
            </Fragment>
          )}
        </div>
      </Grid>

      <Grid item xs={3}>
        {id == 1 || isFocused() || !selectableChildren.includes(id) ? (
          <div />
        ) : (
          <IconButton aria-label="Add">
            <AddIcon
              style={{ color, float: "right" }}
              onClick={() => {
                addChild({ title, childType: "COMP" });
              }}
            />
            <ListItemSecondaryAction>
              {id == 1 || isFocused() || !selectableChildren.includes(id) ? (
                <div />
              ) : (
                <IconButton aria-label="Add">
                  <AddIcon
                    style={{ color, float: 'right' }}
                    onClick={() => {
                      addChild({ title });
                    }}
                  />
                </IconButton>
              )}
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Grid>
    </div>
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
