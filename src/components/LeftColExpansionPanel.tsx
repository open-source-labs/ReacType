import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
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


const LeftColExpansionPanel: React.FC<Props> = (props) => {
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
                // changeFocusComponent({ title });
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
        {expanded || children.find((childId: number) => childId === id) || components.every((comp) => !comp.expanded) ? (
          <div />
        ) : (
          <Tooltip 
            title="Add Child" 
            aria-label="Add Child" 
            placement="left"
            style={{ position: 'absolute', right: '0', top: '0', bottom: '0' }}
          >
            <IconButton
              aria-label="Add"
              onClick={() => {
                addChild({ title, childType: 'COMP' });
              }}
            >
              <AddIcon style={{ color }} />
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
