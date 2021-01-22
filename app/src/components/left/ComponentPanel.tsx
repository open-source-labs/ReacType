import React, { useState, useContext } from 'react';
import StateContext from '../../context/context';
import Grid from '@material-ui/core/Grid';
import ComponentPanelItem from './ComponentPanelItem';
import ComponentPanelRoutingItem from './ComponentPanelRoutingItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import { flexbox } from '@material-ui/system';

// The component panel section of the left panel displays all components and has the ability to add new components
const ComponentPanel = (): JSX.Element => {
  const classes = useStyles();
  const [state, dispatch] = useContext(StateContext);

  //state hooks for inputted component name, component id and array of components
  const [errorStatus, setErrorStatus] = useState(false);
  // errorMsg refers to the error message on the new component text field
  const [errorMsg, setErrorMsg] = useState('');
  const [compName, setCompName] = useState('');
  const [isRoot, setIsRoot] = useState(false);

  // function to create error message for component name input
  const triggerError = (type: String) => {
    setErrorStatus(true);
    if (type === 'empty') {
      setErrorMsg('Component name cannot be blank.');
    } else if (type === 'dupe') {
      setErrorMsg('Component name already exists.');
    } else if (type === 'letters') {
      setErrorMsg('Component name must start with a letter.');
    } else if (type === 'symbolsDetected') {
      setErrorMsg('Component name must not contain symbols.');
    }
  };

  const resetError = () => {
    setErrorStatus(false);
  };

  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetError();
    setCompName(e.target.value);
  };

  // check if name of new component is the same as an existing component
  const checkNameDupe = (inputName: String) => {
    let checkList = state.components.slice(); // makes copy of components array

    // checks to see if inputted comp name already exists
    let dupe = false;
    checkList.forEach(comp => {
      if (comp.name.toLowerCase() === inputName.toLowerCase()) {
        dupe = true;
      }
    });
    return dupe;
  };

  // "Root" components are not draggable into the main canvas
  // If next.js or Gatsby.js mode is on, root components will be separate pages
  const toggleRootStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRoot(isRoot ? false : true);
  };

  // Add a new component
  const createOption = (inputName: String) => {
    // format name so first letter is capitalized and there are no white spaces
    let inputNameClean = inputName.replace(/\s+/g, ''); // removes spaces
    const formattedName =
      inputNameClean.charAt(0).toUpperCase() + inputNameClean.slice(1); // capitalizes first letter
    // add new component to state
    dispatch({
      type: 'ADD COMPONENT',
      payload: { componentName: formattedName, root: isRoot }
    });
    // reset root toggle back to default position
    setIsRoot(false);
    // reset name field
    setCompName('');
  };

  // checks whether component name includes any non-alphanumeric chars
  const alphanumeric = input => {
    let letterNumber = /^[0-9a-zA-Z]+$/;
    if (input.match(letterNumber)) return true;
    return false;
  };

  const handleNameSubmit = () => { // creates a component if no error conditions triggered
    let letters = /[a-zA-Z]/;
    if (!compName.charAt(0).match(letters)) {
      triggerError('letters');
      return;
    } else if (!alphanumeric(compName)) {
      triggerError('symbolsDetected');
      return;
    } else if (compName.trim() === '') {
      triggerError('empty');
      return;
    } else if (checkNameDupe(compName)) {
      triggerError('dupe');
      return;
    }
    createOption(compName);
    resetError();
  };

  const isFocus = (targetId: Number) => {
    return state.canvasFocus.componentId === targetId ? true : false;
  };

  return (
    <div className={classes.panelWrapper}>
      {/* Add a new component*/}
      <div className={classes.addComponentWrapper}>
          <h4 className={classes.newComponent}>New Component:</h4>
          {/* input for new component */}
          <div style={{display: 'flex', justifyContent:'space-around', marginTop: '20px', alignItems:'baseline'}}>
            <div style={{alignSelf:'center'}}>
               <label className={classes.inputLabel}>Name:</label>
                <div className={classes.inputWrapper}>
                    <input
                    color={'primary'}
                    variant="outlined"
                    className={classes.inputField}
                    InputProps={{ className: classes.input }}
                    value={compName}
                    error={errorStatus}
                    helperText={errorStatus ? errorMsg : ''}
                  onChange={handleNameInput}
              />
              </div>
            </div>
           
            <div className={classes.btnGroup} id="checkboxContainer" style={{marginBottom: '30px'}}>
              <FormControlLabel
                value="top"
                control={
                  <Checkbox
                    className={classes.rootCheckBox}
                    color="primary"
                    checked={isRoot}
                    onChange={toggleRootStatus}
                  />
                }
                label={state.projectType === 'Next.js'  || state.projectType === 'Gatsby.js' ? 'Page' : 'Root'} // name varies depending on mode
                className={classes.rootCheckBoxLabel}
                labelPlacement="top"
              />
            </div>
          </div>
          <button
            className={classes.addComponentButton}
            id="addComponentButton"
            onClick={handleNameSubmit}
          >
            Create
          </button>
       
      </div>
      <div className="lineDiv">
          <hr
            style={{
              borderColor: '#f5f5f5',
              borderStyle: 'solid',
              color: '#f5f5f5',
              backgroundColor: 'white',
              height: '0.5px',
              width: '100%',
              marginLeft: '0px'
            }}
          />
        </div>
      {/* Display all root components */}
      <div className={classes.panelWrapperList}>
        {/* Heading just below ADD button */}
        <h4>{state.projectType === 'Next.js' || state.projectType === 'Gatsby.js' ? 'Pages' : 'Root components'}</h4>
        <Grid container direction="row" justify="center" alignItems="center">
          {state.components
            .filter(comp => state.rootComponents.includes(comp.id))
            .map(comp => {
              return (
                  <ComponentPanelItem
                  isFocus={isFocus(comp.id)}
                  key={`comp-${comp.id}`}
                  name={comp.name}
                  id={comp.id}
                  root={true}
                  />
               
              );
            })}
        </Grid>
        {/* Display all reusable components */}
        <h4>Reusable components</h4>
        <Grid container direction="row" justify="center" alignItems="center">
          {state.components
            .filter(comp => !state.rootComponents.includes(comp.id))
            .map(comp => {
              return (
                <ComponentPanelItem
                  isFocus={isFocus(comp.id)}
                  key={`comp-${comp.id}`}
                  name={comp.name}
                  id={comp.id}
                  root={false}
                />
              );
            })}
        </Grid>
        {/* Display routing components - (only applies to next.js or gatsby.js which has routing built in) */}
        {state.projectType === 'Next.js' || state.projectType === 'Gatsby.js'? (
          <React.Fragment>
            <h4>Routing</h4>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <ComponentPanelRoutingItem key={'premadecomp-1'} />
            </Grid>
          </React.Fragment>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  inputField: {
    marginTop: '10px',
    color: '#77b6ed',
    borderRadius: '5px',
    // paddingLeft: '15px',
    // paddingRight: '10px',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    // border: '1px solid rgba(51,235,145,0.75)',
    backgroundColor: 'rgba(255,255,255,0.15)',
    margin: '0px 0px 0px 10px',
    width: '140px',
    height: '30px',
    borderColor: 'white'
  },
  inputWrapper: {
    // height: '115px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingLeft: '35px',
    marginBottom: '15px',
  },
  addComponentWrapper: {
    padding: 'auto',
    marginLeft: '21px',
    display: 'inline-block',
    width: '100%',
  },
  rootCheckBox: {
    borderColor: '#77b6ed',
    color: '#77b6ed',
    padding: '0px'
  },
  rootCheckBoxLabel: {
    color: '#77b6ed',
    borderColor: '#77b6ed'
  },
  panelWrapper: {
    width: '100%',
    marginTop: '15px', 
    display: 'flex',
    flexDirection:'column',
    alignItems:'center'
  },
  panelWrapperList: {
    // maxHeight: '400px',
    minHeight: '120px',
    // overflowY: 'auto',
    marginLeft: '-15px',
    marginRight: '-15px',
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  dragComponents: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    width: '500px',
    backgroundColor: 'red',
    border: '5px solid red'
  },
  panelSubheader: {
    textAlign: 'center',
    color: '#fff'
  },
  input: {
   
  },
  newComponent: {
    color: '#3d88e3',
    fontSize: '95%',
    marginBottom: '20px'
  },
  inputLabel: {
    fontSize: '1em',
    color: '#77b6ed',
    marginLeft: '10px'
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  addComponentButton: {
    color: '#77b6ed',
    backgroundColor: 'transparent',
    height: '40px',
    width: '100px',
    fontFamily: '"Raleway", sans-serif',
    fontSize: '90%',
    textAlign: 'center',
    margin: '-20px 0px 5px 150px',
    borderStyle: 'none',
    transition: '0.3s',
    borderRadius: '25px',
  },
  rootToggle: {
    color: '#808080',
    fontSize: '0.85rem'
  },
});

export default ComponentPanel;
 {/* // color: 'white',
    borderStyle: 'solid',
    borderRadius: '5px',
    borderColor: 'white',
    // paddingLeft: '15px',
    // paddingRight: '10px',
    marginLeft: '-34px',
    width: '120px',
    height: '30px',
    whiteSpace: 'nowrap', */}