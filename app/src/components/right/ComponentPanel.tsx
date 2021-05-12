// Future developers: This file needs to move to right folder: src/components/right

import React, { useState, useContext, useEffect, useCallback } from 'react';
import StateContext from '../../context/context';
import { makeStyles, styled } from '@material-ui/core/styles';
import {
  Button,
  Checkbox,
  FormControlLabel,
  InputLabel,
  TextField,
} from "@material-ui/core";

// The component panel section of the left panel displays all components and has the ability to add new components
const ComponentPanel = ({isThemeLight}): JSX.Element => {
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

  const keyBindCreateComponent = useCallback((e) => {

    // Caret
    if(e.key === 'Enter' && e.target.tagName !== "TEXTAREA") {
      e.preventDefault();
      document.getElementById('addComponentButton').click();
    }
  }, []);
  
  useEffect(() => {
    document.addEventListener('keydown', keyBindCreateComponent);
    return () => {
      document.removeEventListener('keydown', keyBindCreateComponent)
    }
  }, []);

  const isFocus = (targetId: Number) => {
    return state.canvasFocus.componentId === targetId ? true : false;
  };

  return (
    <div className={classes.panelWrapper}>
      {/* Add a new component*/}
      <div className={classes.addComponentWrapper}>
          <h4 
            className={isThemeLight ? `${classes.newComponent} ${classes.lightThemeFontColor}` : `${classes.newComponent} ${classes.darkThemeFontColor}`}
          >
            New Component
          </h4>
          {/* input for new component */}
          <div style={{display: 'flex', justifyContent:'space-evenly', marginTop: '20px', alignItems:'baseline'}}>
            <div style={{alignSelf:'center'}}>
              <InputLabel className={isThemeLight ? `${classes.inputLabel} ${classes.lightThemeFontColor}` : `${classes.inputLabel} ${classes.darkThemeFontColor}`}>
                Name:
              </InputLabel>
                <div className={classes.inputWrapper}>
                    <TextField
                    color={'primary'}
                    variant="outlined"
                    className={isThemeLight ? `${classes.inputField} ${classes.lightThemeFontColor}` : `${classes.inputField} ${classes.darkThemeFontColor}`}
                    // Caret inputprops and helpertext must be lowercase
                    inputProps={{ className: classes.input }}
                    value={compName}
                    // Doesn't accept boolean value needs to be a string
                    error={errorStatus}
                    // Updated
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
                    className={isThemeLight ? `${classes.rootCheckBox} ${classes.lightThemeFontColor}` : `${classes.rootCheckBox} ${classes.darkThemeFontColor}`}
                    color="primary"
                    checked={isRoot}
                    onChange={toggleRootStatus}
                    
                  />
                }
                label={state.projectType === 'Next.js'  || state.projectType === 'Gatsby.js' ? 'Page' : 'Root'} // name varies depending on mode
                className={isThemeLight ? `${classes.rootCheckBoxLabel} ${classes.lightThemeFontColor}` : `${classes.rootCheckBoxLabel} ${classes.darkThemeFontColor}`}
                labelPlacement="top"
              />
            </div>
          </div>
          <div>
            <br/>
            <CreateButton
              className={isThemeLight ? `${classes.addComponentButton} ${classes.lightThemeFontColor}` : `${classes.addComponentButton} ${classes.darkThemeFontColor}`}
              id="addComponentButton"
              onClick={handleNameSubmit}
            >
              Create
            </CreateButton>
          </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  inputField: {
    marginTop: '10px',
    borderRadius: '5px',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    backgroundColor: 'rgba(255,255,255,0.15)',
    margin: '0px 0px 0px 10px',
    width: '140px',
    height: '30px',
    borderColor: 'grey',
    border: '2px solid grey'
  },
  inputWrapper: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },
  panelWrapper: {
    display: 'flex',
    flexDirection:'column',
    alignItems:'center',
    flexGrow : 1,
    backgroundColor: '#F9F9F9',
    color: '#000000',
  },
  addComponentWrapper: {
    padding: 'auto',
    marginLeft: '21px',
    display: 'inline-block',
    width: '100%',
  },
  rootCheckBox: {
    borderColor: '#186BB4',
    padding: '0px'
  },
  rootCheckBoxLabel: {
    borderColor: '#186BB4'
  },
  newComponent: {
    color: '#155084',
    fontSize: '95%',
    marginBottom: '20px'
  },
  inputLabel: {
    fontSize: '1em',
    marginLeft: '10px'
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  addComponentButton: {
    backgroundColor: 'transparent',
    height: '40px',
    width: '100px',
    fontFamily: 'Roboto, Raleway, sans-serif',
    fontSize: '90%',
    textAlign: 'center',
    margin: '-20px 0px 5px 150px',
    borderStyle: 'none',
    transition: '0.3s',
    borderRadius: '25px',
  },
  rootToggle: {
    color: '#696969',
    fontSize: '0.85rem'
  },
  lightThemeFontColor: {
    color: '#155084'
  },
  darkThemeFontColor: {
    color: '#fff'
  }
});

const CreateButton = styled(Button)({
  background: "#0099E6",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 0px 0px 2px #1a1a1a",
  color: "white",
  height: 24,
  width: 60,
  padding: "0 30px",
});

export default ComponentPanel;
