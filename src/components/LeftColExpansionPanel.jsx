import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Switch from '@material-ui/core/Switch';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FlipToBackIcon from '@material-ui/icons/FlipToBack';
import FlipToFrontIcon from '@material-ui/icons/FlipToFront';
import Select from '@material-ui/core/Select';
import Tooltip from '@material-ui/core/Tooltip';
import InputLabel from '@material-ui/core/InputLabel';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: 10,
    // backgroundColor: '#333333',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  panel: {
    backgroundColor: '#333333',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  actions: {
    padding: 0,
  },
  column: {
    display: 'flex',
    alignItems: 'center',
  },
  light: {
    color: '#eee',
    // opacity: '0.8',

    '&:hover': {
      color: '#1de9b6',
    },
  },
  label: {
    color: '#eee',
    marginRight: '10px',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  icon: {
    fontSize: '20px',
    color: '#000',
    transition: 'all .2s ease',

    '&:hover': {
      color: 'red',
    },
  },
});

const LeftColExpansionPanel = props => {
  const { index, classes, focusComponent, component, deleteComponent, addChild } = props;
  const { title, id, stateful, color, parents, parentIds, selectableParents } = component;

  const handleParentChange = (event, parentId = null) => {
    let newParentId = parentId;
    if (event) {
      const selectedParents = event.target.value;
      newParentId = selectedParents[selectedParents.length - 1].id;
    }

    return updateComponent({
      index,
      id,
      newParentId,
    });
  };

  function isFocused() {
    return focusComponent.title === title ? 'focused' : '';
  }

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
              secondary={isFocused()}
              style={{ color }}
            />
            <ListItemSecondaryAction>
              <IconButton aria-label="Add">
                <AddIcon
                  style={{ color, float: 'right' }}
                  onClick={() => {
                    console.log(title);
                    addChild({ title });
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

LeftColExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  component: PropTypes.object,
  index: PropTypes.number,
  focusComponent: PropTypes.object.isRequired,
  onExpansionPanelChange: PropTypes.func,
  updateComponent: PropTypes.func,
  deleteComponent: PropTypes.func,
  moveToBottom: PropTypes.func,
  moveToTop: PropTypes.func,
};
