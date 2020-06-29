import React, { useState, useContext } from 'react';
import { stateContext } from '../../context/context';
import ImageIcon from '@material-ui/icons/Image';
import ParagraphIcon from '@material-ui/icons/LocalParking';
import FormIcon from '@material-ui/icons/Description';
import Grid from '@material-ui/core/Grid';
import ComponentPanelItem from './ComponentPanelItemNew';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  inputField: {
    marginRight: '10px',
    borderColor: 'white'
  },
  inputWrapper: {
    height: '120px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  panelWrapper: {
    marginTop: '35px',
    width: '100%'
  },
  panelWrapperList: {
    height: '850px',
    overflowY: 'scroll'
  },
  input: {
    color: '#fff',
    marginBottom: '10px',
    borderRadius: '5px',
    paddingLeft: '15px',
    paddingTop: '5px',
    paddingBottom: '5px',
    paddingRight: '10px',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    border: '1px solid #33eb91'
  },
  inputLabel: {
    fontSize: '14px',
    zIndex: '20',
    color: '#fff',
    marginTop: '-10px'
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    fontSize: '1rem'
  },
  rootToggle: {
    color: '#01d46d',
    fontSize: '0.85rem'
  },
  compPanelItem: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: 'red'
    }
  }
});

const initialState: any = {
  components: [
    {
      id: 1,
      name: 'index',
      style: {},
      nextChildId: 1,
      children: []
    },
    {
      id: 2,
      name: 'Article',
      style: {},
      nextChildId: 1,
      children: []
    },
    {
      id: 3,
      name: 'Section',
      style: {},
      nextChildId: 1,
      children: []
    }
  ],
  rootComponents: [1],
  canvasFocus: { componentId: 1, childId: null },
  nextComponentId: 4
};

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

  // const reportFocus = (targetId: Number) => {
  //   const focusTarget = state.components.filter(comp => {
  //     return comp.id === targetId;
  //   });
  //   console.log('FOCUSING ON COMPONENT: ');
  //   console.log(focusTarget[0]);
  // };

  return (
    <div className={classes.panelWrapper}>
      <div className={classes.inputWrapper}>
        <TextField
          color={'primary'}
          label="COMPONENT NAME"
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
            CREATE
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
              className={classes.compPanelItem}
              key={`comp-${comp.id}`}
              name={comp.name}
              id={comp.id}
              root={state.rootComponents.includes(comp.id)}
              focusClick={() => reportFocus(comp.id)}
            />
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default ComponentPanel;
