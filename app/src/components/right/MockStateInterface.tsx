// from ComponentPanel.tsx
import React, {
  Component,
  useState,
  useContext,
  useEffect,
  useCallback
} from 'react';
import {
  createStyles,
  makeStyles,
  styled,
  Theme
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  Input,
  InputLabel,
  Select,
  TextField
} from '@material-ui/core';

import StateContext from '../../context/context';
import ComponentPanelItem from './ComponentPanelItem';
import ComponentPanelRoutingItem from './ComponentPanelRoutingItem';

const MockStateInterface = ({ isThemeLight }): JSX.Element => {
  const classes = useStyles();
  const [state, dispatch] = useContext(StateContext);
  const [compName, setCompName] = useState('');

  const [newStateProp, setNewStateProp] = useState({});

  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState('');

  const [isRoot, setIsRoot] = useState(false);

  const debug = () => {
    console.log('state:', state);
    console.log('state.canvasFocus:', state.canvasFocus);
    const currentId = state.canvasFocus.componentId;
    console.log(
      'state.canvasFocus.components[currentId-1]:',
      state.components[currentId - 1]
    );
    console.log('key', document.getElementById('key-input').value);
    console.log('value', document.getElementById('value-input').value);
    console.log('type', document.getElementById('select-required-label').value);
  };

  const handleKeyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKey(e.target.value);
  };
  const handleValueInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // we need to value
    setValue(e.target.value);
  };
  const handleType = (e: React.ChangeEvent<{ value: unknown }>) => {
    // if (e.target.value === 'string') setType(e.target.value as string);

    console.log('handleType: e.target.value: ', e.target.value);

    // CARET: based on event's type value, setType with correct type
    switch (e.target.value) {
      case 'string':
        setType(e.target.value as string);
        break;
      case 'number':
        setType(e.target.value);
        setValue(value as type);
        console.log('value:', value);
        console.log('typeof value:', typeof value);
        break;
      case 'boolean':
        setType(e.target.value as boolean);
        break;
      case 'array':
        setType(e.target.value as Array);
        break;
      case 'undefined':
        setType(e.target.value as undefined);
        break;
      default:
        setType(e.target.value as any);
    }
  };

  const submitMockState = () => {
    // currently focused component's id
    const currentId = state.canvasFocus.componentId;

    // current component
    const currentComponent = state.components[currentId - 1];

    const key = document.getElementById('key-input').value;
    const value = document.getElementById('value-input').value;

    newstateProp.key = value;

    currentComponent.stateProps.push(newStateProp);
  };

  return (
    <div style={{ border: `${3}px solid red` }}>
      <div>
        <FormControl>
          <label>Create New State</label>
          {/* <TextField
            id="outlined-basic"
            label="key:"
            variant="outlined"
            value={key}
          />
          <TextField
            id="outlined-basic"
            label="value:"
            variant="outlined"
            value={value}
          />
          <TextField
            id="outlined-basic"
            label="type:"
            variant="outlined"
            value={typeName}
          /> */}
          <div className={classes.inputWrapper}>
            <input
              id="key-input"
              color={'primary'}
              className={
                isThemeLight
                  ? `${classes.inputField} ${classes.lightThemeFontColor}`
                  : `${classes.inputField} ${classes.darkThemeFontColor}`
              }
              // InputProps={{ className: classes.input }}
              // value={key}
              // onChange={handleKeyInput}
            />
          </div>
          <div className={classes.inputWrapper}>
            <input
              id="value-input"
              color={'primary'}
              className={
                isThemeLight
                  ? `${classes.inputField} ${classes.lightThemeFontColor}`
                  : `${classes.inputField} ${classes.darkThemeFontColor}`
              }
              // InputProps={{ className: classes.input }}
              // value={value}
              // onChange={handleValueInput}
            />
          </div>
          <FormControl required className={classes.formControl}>
            <InputLabel id="select-required-label">Type</InputLabel>
            <Select
              labelId="select-required-label"
              id="type-input"
              // value={type}
              // onChange={handleType}
              className={classes.selectEmpty}
            >
              <MenuItem value="">
                <em>Types</em>
              </MenuItem>
              <MenuItem id="type-string" value={`string`}>
                String
              </MenuItem>
              <MenuItem id="type-number" value={`number`}>
                Number
              </MenuItem>
              <MenuItem id="type-boolean" value={`boolean`}>
                Boolean
              </MenuItem>
              <MenuItem id="type-array" value={`array`}>
                Array
              </MenuItem>
              <MenuItem id="type-undefined" value={`undefined`}>
                Undefined
              </MenuItem>
              <MenuItem id="type-any" value={`any`}>
                Any
              </MenuItem>
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
          <div>
            {/* <FormControlLabel
              value="top"
              control={
                <Checkbox
                  className={
                    isThemeLight
                      ? `${classes.rootCheckBox} ${classes.lightThemeFontColor}`
                      : `${classes.rootCheckBox} ${classes.darkThemeFontColor}`
                  }
                  color="primary"
                />
              }
              className={
                isThemeLight
                  ? `${classes.rootCheckBoxLabel} ${classes.lightThemeFontColor}`
                  : `${classes.rootCheckBoxLabel} ${classes.darkThemeFontColor}`
              }
              labelPlacement="top"
            /> */}
          </div>
          <MyButton type="submit" onClick={debug}>
            debug
          </MyButton>
          <br></br>
          <br></br>
          <MyButton type="submit" onClick={submitMockState}>
            create
          </MyButton>
          <br></br>
          <br></br>
        </FormControl>
      </div>
      <hr></hr>
      <br></br>
      <br></br>
      <div>
        <label>Current State</label>
        <br></br>
        <label>
          Name: {state.components[state.canvasFocus.componentId - 1].name}
        </label>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
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
      borderColor: 'white'
    },
    inputWrapper: {
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '15px'
    },
    addComponentWrapper: {
      padding: 'auto',
      marginLeft: '21px',
      display: 'inline-block',
      width: '100%'
    },
    rootCheckBox: {
      borderColor: '#186BB4',
      padding: '0px'
    },
    rootCheckBoxLabel: {
      borderColor: '#186BB4'
    },
    panelWrapper: {
      width: '100%',
      marginTop: '15px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    panelWrapperList: {
      minHeight: '120px',
      marginLeft: '-15px',
      marginRight: '-15px',
      width: '300px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    dragComponents: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      width: '500px',
      backgroundColor: '#186BB4',
      border: '5px solid #186BB4'
    },
    panelSubheader: {
      textAlign: 'center',
      color: '#fff'
    },
    input: {},
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
      flexDirection: 'column'
    },
    addComponentButton: {
      backgroundColor: 'transparent',
      height: '40px',
      width: '100px',
      fontFamily: '"Raleway", sans-serif',
      fontSize: '90%',
      textAlign: 'center',
      margin: '-20px 0px 5px 150px',
      borderStyle: 'none',
      transition: '0.3s',
      borderRadius: '25px'
    },
    rootToggle: {
      color: '#696969',
      fontSize: '0.85rem'
    },
    lightThemeFontColor: {
      color: '#186BB4'
    },
    darkThemeFontColor: {
      color: '#fff'
    },
    // CARET
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  });
});

const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 24,
  width: 40,
  padding: '0 30px'
});

export default MockStateInterface;
