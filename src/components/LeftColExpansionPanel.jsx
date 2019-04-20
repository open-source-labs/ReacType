import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';

const LeftColExpansionPanel = (props) => {
  const {
    index, classes, focusComponent, component, deleteComponent, addChild,
  } = props;
  const { title, id, color } = component;

  return (
    <div className={classes.root}>
      <Grid item xs={12} md={6}>
        <List>
          <ListItem button component="a">
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
              <IconButton aria-label="Add">
                <AddIcon
                  style={{ color, float: 'right' }}
                  onClick={() => {
                    console.log(title);
                    addChild(title);
                  }}
                />
              </IconButton>
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

LeftColExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  component: PropTypes.object,
  index: PropTypes.number,
  focusComponent: PropTypes.object.isRequired,
  onExpansionPanelChange: PropTypes.func,
  updateComponent: PropTypes.func,
  deleteComponent: PropTypes.func,
};

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
