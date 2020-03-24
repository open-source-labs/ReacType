import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Collapse from '@material-ui/core/Collapse';
import Switch from '@material-ui/core/Switch'; // for state/class toggling
import InputLabel from '@material-ui/core/InputLabel'; // labeling of state/class toggles
import {
  ComponentInt,
  ComponentsInt,
  PropsInt
} from '../../interfaces/Interfaces'; // unused

interface LeftColExpPanPropsInt extends PropsInt {
  classes: any;
  id?: number;
  component: ComponentInt;
  addChild(arg: { title: string; childType: string; HTMLInfo?: object }): void;
  changeFocusComponent(arg: { title: string }): void;
  selectableChildren: number[];
  deleteComponent(arg: {
    componentId: number;
    stateComponents: ComponentsInt;
  }): void;
  toggleComponentState(arg: { id: number }): void;
  toggleComponentClass(arg: { id: number }): void;
  editMode: number;
  toggleEditMode(arg: { id: number }): void;
  handleChangeName(event: string): void;
  handleEditComponent(): void;
  updateCode(arg: { componentId: number; code: string }): void;
}
//interface created but never used
// interface TypographyProps {
//   type: string;
// }
// TODO: ASSIGN SPECIFIC TYPING TO INCOMING PROPS (REMOVE ANY)
const LeftColExpansionPanel = (props: LeftColExpPanPropsInt) => {
  const {
    classes,
    focusComponent,
    components,
    component,
    addChild,
    changeFocusComponent,
    selectableChildren,
    deleteComponent,
    toggleComponentState,
    toggleComponentClass,
    updateCode,
    editMode,
    toggleEditMode,
    handleChangeName,
    handleEditComponent
  } = props;

  const { title, id, color, stateful, classBased } = component;

  function isFocused() {
    return focusComponent.id === id ? 'focused' : '';
  }

  // boolean flag to determine if the component card is focused or not
  // state/class toggles will be displayed when a component is focused
  const focusedToggle = isFocused() === 'focused' ? true : false;

  //this function determines whether edit mode for component name should be entered or not
  //resets the title if 'escape' key is hit
  const handleEdit = () => {
    if (editMode !== id) {
      handleChangeName(title);
      toggleEditMode({ id });
    } else {
      toggleEditMode({ id: -1 });
    }
  };

  return (
    <Grid
      container
      direction='row'
      justify='center'
      alignItems='center'
      style={{
        minWidth: '470px'
      }}
    >
      <Grid item xs={9}>
        <div
          className={classes.root}
          style={
            // shadow to highlight the focused component card
            focusedToggle
              ? {
                  boxShadow: '4px 4px 4px rgba(0, 0, 0, .4)',
                  borderRadius: '8px'
                }
              : {}
          }
        >
          {/* {This is the component responsible for the collapsing transition animation for each component card} */}
          <Collapse
            in={focusedToggle}
            collapsedHeight={'80px'} //The type for the Collapse component is asking for a string, but if you put in a string and not a number, the component itself breaks.
            style={{ borderRadius: '5px' }}
            timeout='auto'
          >
            {/* NOT SURE WHY COLOR: RED IS USED, TRIED REMOVING IT AND NO VISIBLE CHANGE OCCURED. */}
            <Grid
              item
              xs={12}
              style={{
                // color: 'red',
                // this is experimental for version: BLADERUNNER THEME
                backgroundColor: 'none',
                borderRadius: '10px',
                minWidth: '340px',
                border: `2px solid ${color}`
              }}
            >
              <List
                style={
                  {
                    // color: 'red'
                  }
                }
              >
                <ListItem
                  // button // commented out to disable materialUI hover shading effect. TBD if any adverse effects occur
                  // style={{ color: 'red' }}
                  onClick={() => {
                    if (focusComponent.title !== title)
                      //changed the logic here so it only focuses if you click on a different card. Otherwise, you can't double click into edit mode for the title.
                      changeFocusComponent({ title });
                  }}
                >
                  <ListItemText
                    // disableTypography
                    // className={classes.light}
                    primary={
                      <div>
                        {editMode !== id ? (
                          <Typography
                            //type='body2'
                            onDoubleClick={() => handleEdit()}
                            style={{
                              color: '#fff',
                              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)',
                              fontSize: '1.40rem'
                            }}
                          >
                            {title}
                          </Typography>
                        ) : (
                          <TextField //show a text field for editing instead if edit mode entered
                            id='filled'
                            label='Change Component Name'
                            defaultValue={title}
                            variant='outlined'
                            className={classes.text}
                            InputProps={{
                              className: classes.light //all of these styling makes the input box border, label, and text default to white.
                            }}
                            InputLabelProps={{
                              className: classes.inputLabel
                            }}
                            autoFocus
                            onChange={e => handleChangeName(e.target.value)} //event handler for key press
                            onKeyPress={ev => {
                              if (ev.key === 'Enter') {
                                //event handler for enter pressed
                                handleEditComponent();
                                ev.preventDefault();
                              }
                            }}
                            // onKeyUp={ev => {                                   //the old escape handler, keeping it here just in case a bug in the main.js escape handler wasn't caught
                            //   if (ev.keyCode === 27) {
                            //     handleEdit();
                            //     ev.preventDefault();
                            //   }
                            // }}
                          />
                        )}
                        {/* ALL OF THE STATE/CLASS TOGGLES AND LABELS ARE ONLY RENDERED IF THEIR COMPONENT IS THE FOCUSED COMPONENT 
                        TO DO : IMPROVE DRYNESS OF CODE BY RENDERING ALL FOUR MATERIAL ELEMENTS (LABELS/SWITCH) IN ONE CONDITIONAL
                      */}
                        {/* LABEL AND TOGGLE(SWITCH) FOR STATEFULNESS */}
                        {focusedToggle ? (
                          <span style={{ display: 'inline-flex' }}>
                            <InputLabel
                              htmlFor='stateful'
                              style={{
                                color: '#fff',
                                marginBottom: '0px',
                                marginTop: '10px',
                                marginLeft: '11px',
                                padding: '0px',
                                fontSize: '18px',
                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)'
                              }}
                            >
                              State?
                            </InputLabel>
                            <Switch
                              checked={stateful}
                              onChange={() => {
                                toggleComponentState({ id });
                                changeFocusComponent({ title });
                              }}
                              value='stateful'
                              color='primary'
                              // id={props.id.toString()}
                            />
                            <InputLabel
                              htmlFor='classBased'
                              style={{
                                color: '#fff',
                                marginBottom: '0px',
                                marginTop: '10px',
                                marginLeft: '11px',
                                padding: '0px',
                                fontSize: '18px',
                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)'
                              }}
                            >
                              Class?
                            </InputLabel>{' '}
                            <Switch
                              checked={classBased}
                              onChange={() => {
                                toggleComponentClass({ id });
                                changeFocusComponent({ title });
                              }}
                              value='classBased'
                              color='primary'
                            />
                          </span>
                        ) : (
                          ''
                        )}
                        {focusedToggle && component.id !== 1 ? (
                          <Button
                            variant='text'
                            size='small'
                            color='default'
                            aria-label='Delete'
                            className={classes.margin}
                            onClick={() =>
                              deleteComponent({
                                componentId: id,
                                stateComponents: components
                              })
                            }
                            style={{
                              color: 'white',
                              marginBottom: '0px',
                              marginTop: '4px'
                            }}
                          >
                            <DeleteIcon
                              style={{
                                color: '#b30000',
                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
                              }}
                            />
                            <div
                              style={{
                                marginTop: '4px',
                                marginLeft: '5px',
                                fontSize: '15px',
                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
                              }}
                            >
                              Delete Component
                            </div>
                          </Button>
                        ) : (
                          ''
                        )}
                      </div>
                    }
                  />
                </ListItem>
              </List>
            </Grid>
          </Collapse>
        </div>
      </Grid>
      {/* {Create the '+' symbol that add's components as children.} */}
      <Grid item xs={3}>
        {id === 1 || isFocused() || !selectableChildren.includes(id) ? (
          <div />
        ) : (
          <Tooltip
            title='add as child'
            aria-label='add as child'
            placement='left'
          >
            <IconButton
              aria-label='Add'
              onClick={() => {
                addChild({ title, childType: 'COMP' });
                changeFocusComponent({ title: focusComponent.title });
              }}
            >
              <AddIcon style={{ color, float: 'right', marginTop: '10px' }} />
            </IconButton>
          </Tooltip>
        )}
      </Grid>
    </Grid>
  );
};
function styles(): object {
  return {
    root: {
      width: '100%',
      marginTop: 10
    },
    light: {
      color: '#eee',
      '&:hover': {
        color: '#fff'
      }
    },
    inputLabel: {
      fontSize: '16px',
      color: '#fff',
      '&.Mui-focused': {
        color: '#fff'
      }
    },
    text: {
      '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white'
      },
      '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white'
      },
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white'
      }
    }
  };
}
export default withStyles(styles)(LeftColExpansionPanel);
