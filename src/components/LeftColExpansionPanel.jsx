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
    return focusComponent.title === title ? 'focused' : '';
  }

  return (
    <div className={classes.root}>
      <Grid item xs={12} md={6} style={{ color: 'red' }}>
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
                <Typography type="body2" style={{ color: '#FFFFFF' }}>
                  {title}
                </Typography>
              }
              secondary={'focused'}
              style={{ color }}
            />
            <ListItemSecondaryAction>
              { id == 1 || isFocused() || !selectableChildren.includes(id) ? (
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

export default withStyles(styles)(LeftColExpansionPanel);

/**
//button and functionality for deleting a component:
<IconButton
  className={classes.button}
  onClick={() => {
    deleteComponent({
      index,
      id,
      parentIds,
    });
  }}
  aria-label="Delete"
>
  <DeleteIcon className={classes.light} />
</IconButton>
 */

/*
//expansion panel and some functionality
<div className={classes.root}>
  <ExpansionPanel
    className={classes.panel}
    expanded={focusComponent.id === id}
    onChange={() => onExpansionPanelChange(component)}
    elevation={4}
  >
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style={{ color }} />}>
      <Typography className={classes.light}>{title}</Typography>
    </ExpansionPanelSummary>
  </ExpansionPanel>
</div>
*/

function styles(theme) {
  return {
    root: {
      width: '100%',
      flexGrow: 1,
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
