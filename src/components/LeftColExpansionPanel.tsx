import React, { Fragment } from 'react';
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
import Collapse from '@material-ui/core/Collapse';
import Switch from '@material-ui/core/Switch'; // for state/class toggling
import InputLabel from '@material-ui/core/InputLabel'; // labeling of state/class toggles

import { ComponentInt, ComponentsInt, PropsInt } from '../utils/Interfaces'; // unused
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
  toggleComponentState(arg: number): void;
  toggleComponentClass(arg: number): void;
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
  } = props;

  const { title, id, color, stateful, classBased } = component;

  function isFocused() {
    return focusComponent.id === id ? 'focused' : '';
  }

  // boolean flag to determine if the component card is focused or not
  // state/class toggles will be displayed when a component is focused
  const focusedToggle = isFocused() === 'focused' ? true : false;

  return (
    <Grid
      container
      spacing={16}
      direction="row"
      justify="flex-start"
      alignItems="center"
    >
      <Grid item xs={9}>
        <div
          className={classes.root}
          style={
            // shadow to highlight the focused component card
            focusedToggle ? { boxShadow: '4px 4px 4px rgba(0, 0, 0, .4)' } : {}
          }
        >
          {/* {This is the component responsible for the collapsing transition animation for each component card} */}
          <Collapse
            in={focusedToggle}
            collapsedHeight={'70px'}
            timeout={750} 
          >
            {/* NOT SURE WHY COLOR: RED IS USED, TRIED REMOVING IT AND NO VISIBLE CHANGE OCCURED. */}
            <Grid
              item
              xs={12}
              style={{
                color: 'red',
                backgroundColor: color,
                borderRadius: '10px',
              }}
            >
              <List style={{ color: 'red' }}>
                <ListItem
                  // button // commented out to disable materialUI hover shading effect. TBD if any adverse effects occur
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
                        <Typography
                          //type='body2'
                          style={{
                            color: '#fff',
                            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)',
                            fontSize: '1.40rem',
                          }}
                        >
                          {title}
                        </Typography>

                        {/* ALL OF THE STATE/CLASS TOGGLES AND LABELS ARE ONLY RENDERED IF THEIR COMPONENT IS THE FOCUSED COMPONENT 
                      
                        TO DO : IMPROVE DRYNESS OF CODE BY RENDERING ALL FOUR MATERIAL ELEMENTS (LABELS/SWITCH) IN ONE CONDITIONAL
                      */}

                        {/* LABEL AND TOGGLE(SWITCH) FOR STATEFULNESS */}
                        {focusedToggle ? (
                          <InputLabel
                            htmlFor="stateful"
                            style={{
                              color: '#fff',
                              marginBottom: '10px',
                              marginTop: '0px',
                              marginLeft: '11px',
                              padding: '0px',
                              fontSize: '18px',
                              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)',
                            }}
                          >
                            State?
                          </InputLabel>
                        ) : (
                          ''
                        )}

                        {focusedToggle ? (
                          <Switch
                            checked={stateful}
                            onChange={e => {
                              toggleComponentState(id);
                              changeFocusComponent({ title });
                            }}
                            value="stateful"
                            color="primary"
                            // id={props.id.toString()}
                          />
                        ) : (
                          ''
                        )}
                        <div>
                          {/* LABEL/TOGGLE(SWITCH) FOR CLASS BASED */}
                          {focusedToggle ? (
                            <InputLabel
                              htmlFor="classBased"
                              style={{
                                color: '#fff',
                                marginBottom: '10px',
                                marginTop: '0px',
                                marginLeft: '11px',
                                padding: '0px',
                                fontSize: '18px',
                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)',
                              }}
                            >
                              Class?
                            </InputLabel>
                          ) : (
                            ''
                          )}
                          {focusedToggle ? (
                            <Switch
                              checked={classBased}
                              onChange={e => {
                                toggleComponentClass(id);
                                changeFocusComponent({ title });
                              }}
                              value="classBased"
                              color="primary"
                            />
                          ) : (
                            ''
                          )}
                          {focusedToggle && component.id !== 1 ? (
                            <Button
                              variant="text"
                              size="small"
                              color="default"
                              aria-label="Delete"
                              className={classes.margin}
                              onClick={() =>
                                deleteComponent({
                                  componentId: id,
                                  stateComponents: components,
                                })
                              }
                              style={{
                                color: 'white',
                                marginBottom: '0px',
                                marginTop: '4px',
                              }}
                            >
                              <DeleteIcon
                                style={{
                                  color: '#b30000',
                                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                                }}
                              />
                              <span
                                style={{
                                  marginTop: '3px',
                                  fontSize: '15px',
                                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
                                }}
                              >
                                Delete Component
                              </span>
                            </Button>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                    }
                    style={{ color }}
                  />
                </ListItem>
              </List>
            </Grid>
          </Collapse>
          {/* {id === 1 || !isFocused() ? (           Removed sepearate delete icon and     
                                                      made it part of card
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
                    stateComponents: components,
                  })
                }
                style={{
                  color: '#D3D3D3',
                  marginBottom: '10px',
                  marginTop: '4px',
                  marginLeft: '11px',
                  padding: '0px',
                }}
              >
                <DeleteIcon style={{ color: '#D3D3D3' }} />
                <span style={{ marginTop: '3px' }}>Delete Component</span>
              </Button>
            </Fragment>
          )} */}
        </div>
      </Grid>
      {/* {Create the '+' symbol that add's components as children.} */}
      <Grid item xs={3}>
        {id === 1 || isFocused() || !selectableChildren.includes(id) ? (
          <div />
        ) : (
          <Tooltip
            title="add as child"
            aria-label="add as child"
            placement="left"
          >
            <IconButton
              aria-label="Add"
              onClick={() => {
                addChild({ title, childType: 'COMP' });
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
