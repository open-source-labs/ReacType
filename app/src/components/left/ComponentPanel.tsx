import React, { useState, useContext } from 'react';
import { stateContext } from '../../context/context';
import ImageIcon from '@material-ui/icons/Image';
import ParagraphIcon from '@material-ui/icons/LocalParking';
import FormIcon from '@material-ui/icons/Description';
import Grid from '@material-ui/core/Grid';
import ComponentPanelItem from './ComponentPanelItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  inputField: {
    marginTop: '15px'
  },
  inputWrapper: {
    height: '115px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: '35px',
    marginBottom: '15px'
  },
  panelWrapper: {
    width: '100%',
    marginTop: '15px'
  },
  panelWrapperList: {
    maxHeight: '400px',
    minHeight: '120px',
    overflowY: 'auto',
    marginLeft: '-15px',
    marginRight: '-15px'
  },
  input: {
    color: '#fff',
    borderRadius: '5px',
    paddingLeft: '15px',
    paddingRight: '10px',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    border: '1px solid rgba(51,235,145,0.75)',
    backgroundColor: 'rgba(255,255,255,0.15)'
  },
  inputLabel: {
    fontSize: '14px',
    zIndex: '20',
    color: '#fff',
    marginTop: '-10px'
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '10px',
    marginLeft: '10px'
  },
  button: {
    fontSize: '1rem'
  },
  rootToggle: {
    color: '#01d46d',
    fontSize: '0.85rem'
  }
});

const ComponentPanel = (): JSX.Element => {
  const classes = useStyles();
  const [state, dispatch] = useContext(stateContext);
  //state hooks for inputted component name, component id and array of components
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [compName, setCompName] = useState('');
  const [isRoot, setIsRoot] = useState(false);

  // const [appState, setAppState] = useState(initialState);

  const triggerError = (type: String) => {
    setErrorStatus(true);
    if (type === 'empty') {
      setErrorMsg('Component name cannot be blank.');
    } else if (type === 'dupe') {
      setErrorMsg('Component name already exists.');
    }
  };

  const resetError = () => {
    setErrorStatus(false);
  };

  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetError();
    console.log(e.target.value);
    setCompName(e.target.value);
  };

  const checkNameDupe = (inputName: String) => {
    let checkList = state.components.slice();
    // checks to see if inputted comp name already exists
    let dupe = false;
    checkList.forEach(comp => {
      if (comp.name.toLowerCase() === inputName.toLowerCase()) {
        dupe = true;
      }
    });
    return dupe;
  };
  const toggleRootStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRoot(isRoot ? false : true);
  };

  const addComponent = (componentName: string, root: boolean) => {
    dispatch({ type: 'ADD COMPONENT', payload: { componentName, root } });
  };

  const createOption = (inputName: String) => {
    // create temporary component object,
    // assigning id to nextComponentId
    const formattedName =
      inputName.charAt(0).toUpperCase() + inputName.slice(1);

    addComponent(formattedName, isRoot);
    // reset root toggle
    setIsRoot(false);
    // reset name field
    setCompName('');
  };

  const handleNameSubmit = () => {
    if (compName.trim() === '') {
      //window.alert('Please specify a name for your component');
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

  const setFocus = (targetId: Number) => {
    const focusTarget = state.components.filter(comp => {
      return comp.id === targetId;
    });
    //placeholder for switching focus
    console.log('FOCUSING ON COMPONENT: ');
    console.log(focusTarget[0]);
  };

  return (
    <div className={classes.panelWrapper}>
      <div className={classes.inputWrapper}>
        <TextField
          color={'primary'}
          label="Component Name"
          variant="outlined"
          className={classes.inputField}
          InputProps={{ className: classes.input }}
          InputLabelProps={{ className: classes.inputLabel }}
          value={compName}
          error={errorStatus}
          helperText={errorStatus ? errorMsg : ''}
          onChange={handleNameInput}
        />
        <div className={classes.btnGroup}>
          <Button
            className={classes.button}
            color="primary"
            onClick={handleNameSubmit}
          >
            ADD
          </Button>
          <FormControlLabel
            control={
              <Switch
                checked={isRoot}
                onChange={toggleRootStatus}
                color="primary"
              />
            }
            className={classes.rootToggle}
            label="ROOT"
          />
        </div>
      </div>
      <div className={classes.panelWrapperList}>
        <Grid container direction="row" justify="center" alignItems="center">
          {state.components.map(comp => (
            <ComponentPanelItem
              isFocus={isFocus(comp.id)}
              key={`comp-${comp.id}`}
              name={comp.name}
              id={comp.id}
              root={state.rootComponents.includes(comp.id)}
              focusClick={() => setFocus(comp.id)}
            />
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default ComponentPanel;
