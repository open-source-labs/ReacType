import React, { useState, useContext } from 'react';
import { stateContext } from '../../context/context';
import ImageIcon from '@material-ui/icons/Image';
import ParagraphIcon from '@material-ui/icons/LocalParking';
import FormIcon from '@material-ui/icons/Description';
import Grid from '@material-ui/core/Grid';
import ComponentPanelItem from './ComponentPanelItem';
import ComponentPanelRoutingItem from './ComponentPanelRoutingItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  inputField: {
    marginTop: '15px'
  },
  inputWrapper: {
    // height: '115px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingLeft: '35px',
    marginBottom: '15px'
  },
  addComponentWrapper: {
    border: '1px solid rgba(70,131,83)',
    padding: '20px',
    margin: '20px'
  },
  rootCheckBox: {},
  rootCheckBoxLabel: {
    color: 'white'
  },
  projectTypeWrapper: {
    paddingLeft: '20px',
    paddingRight: '20px',
    marginBottom: '15px',
    width: '100%'
  },
  projectSelector: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    width: '317px',
    color: '#fff'
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
  panelSubheader: {
    textAlign: 'center',
    color: '#fff'
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
    fontSize: '1rem',
    height: '40px',
    maginTop: '10px',
    width: '100%',
    // border: '1px solid rgba(70,131,83)',
    backgroundColor: 'rgba(1,212,109,0.1)'
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

  const handleProjectChange = event => {
    const projectType = event.target.value;
    dispatch({ type: 'CHANGE PROJECT TYPE', payload: { projectType } });
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
      <div className={classes.projectTypeWrapper}>
        <FormControl>
          {/* <InputLabel id="project-type-label" className={classes.inputLabel}>
      Project Type
    </InputLabel> */}
          <Select
            variant="outlined"
            labelId="project-type-label"
            id="demo-simple-select"
            className={classes.projectSelector}
            value={state.projectType}
            onChange={handleProjectChange}
          >
            <MenuItem value={'Next.js'}>Next.js</MenuItem>
            <MenuItem value={'Classic React'}>Classic React</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className={classes.addComponentWrapper}>
        <div>
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
              <FormControlLabel
                value="top"
                control={
                  <Checkbox color="primary" onChange={toggleRootStatus} />
                }
                label={state.projectType === 'Next.js' ? 'Page' : 'Root'}
                className={classes.rootCheckBoxLabel}
                labelPlacement="top"
              />
            </div>
          </div>
          <Button
            className={classes.button}
            color="primary"
            onClick={handleNameSubmit}
          >
            ADD
          </Button>
        </div>
      </div>
      <div className={classes.panelWrapperList}>
        <h4>{state.projectType === 'Next.js' ? 'Pages' : 'Root components'}</h4>
        <Grid container direction="row" justify="center" alignItems="center">
          {state.components
            .filter(comp => state.rootComponents.includes(comp.id))
            .map(comp => (
              <ComponentPanelItem
                isFocus={isFocus(comp.id)}
                key={`comp-${comp.id}`}
                name={comp.name}
                id={comp.id}
                root={true}
                focusClick={() => setFocus(comp.id)}
              />
            ))}
        </Grid>
        <h4>Reusable components</h4>
        <Grid container direction="row" justify="center" alignItems="center">
          {state.components
            .filter(comp => !state.rootComponents.includes(comp.id))
            .map(comp => (
              <ComponentPanelItem
                isFocus={isFocus(comp.id)}
                key={`comp-${comp.id}`}
                name={comp.name}
                id={comp.id}
                root={false}
                focusClick={() => setFocus(comp.id)}
              />
            ))}
        </Grid>
        {state.projectType === 'Next.js' ? (
          <React.Fragment>
            <h4>Next.js components</h4>
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

export default ComponentPanel;
