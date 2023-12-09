import React, { useState, useEffect } from 'react';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { useDispatch, useSelector } from 'react-redux';
import { addState } from '../../../../redux/reducers/slice/appStateSlice';
import {
  FormControl,
  FormHelperText,
  MenuItem,
  InputLabel,
  Select,
  TextField,
  Button
} from '@mui/material';
import TableStateProps from './TableStateProps';
import TableParentProps from './TableParentProps';
import TablePassedInProps from './TablePassedInProps';
import { RootState } from '../../../../redux/store';

const StatePropsPanel = ({ isThemeLight, data }): JSX.Element => {
  const { state, contextParam } = useSelector((store: RootState) => ({
    state: store.appState,
    contextParam: store.contextSlice
  }));
  const dispatch = useDispatch();
  const classes = useStyles();
  const [inputKey, setInputKey] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [inputType, setInputType] = useState('');
  const [errorStatus, setErrorStatus] = useState(false);
  const [inputTypeError, setInputTypeError] = useState('');
  const [newVal, setNewVal] = useState('test');
  const [errorMsg, setErrorMsg] = useState('');
  const currentId = state.canvasFocus.componentId;
  const currentComponent = state.components[currentId - 1];
  const [parentProps, setParentProps] = useState([]);
  const [parentPassedInProps, setParentPassedInProps] = useState([]);
  const [parentName, setParentName] = useState('No Parents');
  const [parentComponent, setParentComponent] = useState({});
  const [rows1, setRows1] = useState(currentComponent.stateProps);
  const [propNum, setPropNum] = useState(1);

  // convert value to correct type based on user input
  const typeConversion = (value: string, type: string) => {
    switch (type) {
      case 'string': {
        setInputTypeError('');
        return String(value);
      }
      case 'number': {
        setInputTypeError('');
        return Number(value);
      }
      case 'boolean': {
        setInputTypeError('');
        return value === 'true';
      }
      case 'array':
        try {
          let retVal = JSON.parse(value);
          if (Array.isArray(retVal)) {
            setInputTypeError('');
            return retVal;
          } else {
            throw new Error('Input was not an array!');
          }
        } catch {
          setInputTypeError(type);
          return null;
        }
      case 'object': {
        try {
          let retVal = JSON.parse(value);

          if (typeof retVal === 'object' && !Array.isArray(retVal)) {
            setInputTypeError('');
            return retVal;
          } else {
            throw new Error('Input was not an object (excluding Arrays)!');
          }
        } catch {
          setInputTypeError(type);
          return null;
        }
      }
      default: {
        setInputTypeError('');
        return value;
      }
    }
  };

  // clears the input key, value, and type on Form
  const clearForm = () => {
    setInputKey('');
    setInputValue('');
    setInputType('');
  };

  useEffect(() => {
    setNewVal(typeConversion(inputValue, inputType));
  }, [inputType, inputValue]);

  // submit new stateProps entries to state context
  const submitNewState = (e) => {
    e.preventDefault();

    // don't allow them to submit state without all fields
    if (!inputKey || !inputType || !inputValue) {
      setErrorStatus(true);
      setErrorMsg('All fields are required');
      return;
    }

    const statesArray = currentComponent.stateProps;
    //loop though array, access each obj at key property
    let keyToInt = parseInt(inputKey[0]);
    if (!isNaN(keyToInt)) {
      setErrorStatus(true);
      setErrorMsg('Key name can not start with int.');
      return;
    }

    // check here to see if state has already been created with the submitted key
    for (let i = 0; i < state.components.length; i++) {
      for (let j = 0; j < state.components[i].stateProps.length; j++) {
        if (inputKey === state.components[i].stateProps[j]['key']) {
          setErrorStatus(true);
          setErrorMsg('Key name already in use.');
          return;
        } else {
          setErrorStatus(false);
          setErrorMsg('');
        }
      }
    }
    setPropNum((prev) => prev + 1);
    const newState = {
      // id name of state will be the parent component name concated with propNum. it will start at 1 and increase by 1 for each new state added
      id: `${currentComponent.name}-${inputKey}`,
      key: inputKey,
      value: newVal,
      type: inputType
    };

    const setNewState = {
      // id name of state will be the parent component name concated with propNum. it will start at 1 and increase by 1 for each new state added
      id: `${currentComponent.name}-set${inputKey
        .slice(0, 1)
        .toUpperCase()}${inputKey.slice(1)}`,
      key: `set${inputKey.slice(0, 1).toUpperCase()}${inputKey.slice(1)}`,
      value: '',
      type: 'func'
    };
    if (!inputTypeError) {
      dispatch(
        addState({
          newState: newState,
          setNewState: setNewState,
          contextParam: contextParam
        })
      );
      setRows1([...rows1, newState]);
      setErrorStatus(false);
      clearForm();
    }
  };

  // find table row using its id and if it exists, populate form with its details
  const handlerRowSelect = (table) => {
    let exists = false;
    currentComponent.stateProps.forEach((stateProp) => {
      // if stateProp id matches current row's id (table.row.id), flip exists to true
      if (stateProp.id === table.row.id) exists = true;
    });
    // if row id exists, populate form with corresponding inputs (key, value, type) from table row
    if (exists) {
      setInputKey(table.row.key);
      setInputType(table.row.type);
      setInputValue(table.row.value ? JSON.stringify(table.row.value) : '');
    } else clearForm();
  };
  //use effect to populate parent props table on load and every time canvas focus changes
  useEffect(() => {
    const parentInfo = findParent(currentId);

    setParentProps(parentInfo.parentProps);
    setParentName(parentInfo.parentName);
    setParentComponent(parentInfo.parentComponent);
    setParentPassedInProps(parentInfo.parentPassedInProps);
  }, [currentId]);

  const findParent = (childId) => {
    let arr = [];

    for (let i = 0; i < data.length; i++) {
      let currComponent = data[i];
      for (let j = 0; j < currComponent.children.length; j++) {
        let currChild = currComponent.children[j];
        if (currChild.typeId === childId) {
          const currComponentCopy = JSON.parse(JSON.stringify(currComponent));

          return {
            parentProps: currComponentCopy.stateProps,
            parentName: currComponentCopy.name,
            parentComponent: currComponentCopy,
            parentPassedInProps: currComponentCopy.passedInProps
          };
        }
      }
    }
    return { parentProps: [], parentName: '' };
  };

  return (
    <div className={'state-panel'}>
      <div>
        <FormControl>
          <h4
            className={
              isThemeLight
                ? classes.lightThemeFontColor
                : classes.darkThemeFontColor
            }
          >
            Create New State
          </h4>
          <TextField
            id="textfield-key"
            label="key:"
            variant="outlined"
            value={inputKey}
            error={errorStatus}
            onChange={(e) => setInputKey(e.target.value)}
            helperText={errorStatus ? errorMsg : ''}
            className={
              isThemeLight
                ? `${classes.rootLight} ${classes.inputTextLight}`
                : `${classes.rootDark} ${classes.inputTextDark}`
            }
          />
          <TextField
            id="textfield-value"
            label="initial value"
            variant="outlined"
            value={inputValue}
            error={errorStatus}
            onChange={(e) => setInputValue(e.target.value)}
            className={
              isThemeLight
                ? `${classes.rootLight} ${classes.inputTextLight}`
                : `${classes.rootDark} ${classes.inputTextDark}`
            }
          />
          <FormControl
            required
            className={
              isThemeLight
                ? `${classes.formControl} ${classes.lightThemeFontColor}`
                : `${classes.formControl} ${classes.darkThemeFontColor}`
            }
            error={inputTypeError != '' || errorStatus}
          >
            <InputLabel id="select-required-label" style={{ color: 'white' }}>
              Type
            </InputLabel>
            <Select
              data-testid="type-select"
              labelId="select-required-label"
              id="type-input"
              className={
                isThemeLight
                  ? `${classes.selectEmpty} ${classes.rootUnderlineLight} ${classes.inputTextLight}`
                  : `${classes.selectEmpty} ${classes.rootUnderlineDark} ${classes.inputTextDark}`
              }
              value={inputType === 'func' ? '' : inputType}
              onChange={(event) => setInputType(event.target.value)}
              MenuProps={{ disablePortal: true }}
              style={{
                backgroundColor: 'gray',
                color: '#fff',
                border: '1px solid white',
                height: '28px',
                width: '200px'
              }}
            >
              <MenuItem value="" style={{ color: 'black' }}>
                <em>Types</em>
              </MenuItem>
              <MenuItem
                id="type-selector"
                value={'string'}
                style={{ color: 'black' }}
              >
                String
              </MenuItem>
              <MenuItem
                id="type-selector"
                value={'number'}
                style={{ color: 'black' }}
              >
                Number
              </MenuItem>
              <MenuItem
                id="type-selector"
                value={'boolean'}
                style={{ color: 'black' }}
              >
                Boolean
              </MenuItem>
              <MenuItem
                id="type-selector"
                value={'array'}
                style={{ color: 'black' }}
              >
                Array
              </MenuItem>
              <MenuItem
                id="type-selector"
                value={'object'}
                style={{ color: 'black' }}
              >
                Object
              </MenuItem>
              <MenuItem
                id="type-selector"
                value={'undefined'}
                style={{ color: 'black' }}
              >
                Undefined
              </MenuItem>
              <MenuItem
                id="type-selector"
                value={'any'}
                style={{ color: 'black' }}
              >
                Any
              </MenuItem>
            </Select>
            <FormHelperText
              className={
                isThemeLight
                  ? classes.greyThemeFontColor
                  : classes.darkThemeFontColor
              }
            >
              {inputTypeError === 'object'
                ? 'JSON object form: {"key": value}'
                : inputTypeError === 'array'
                ? 'Array form: [value]'
                : 'Required'}
            </FormHelperText>
          </FormControl>
          <br />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={submitNewState}
            className={
              isThemeLight
                ? `${classes.addComponentButton} ${classes.lightThemeFontColor}`
                : `${classes.addComponentButton} ${classes.darkThemeFontColor}`
            }
          >
            Save
          </Button>
          <br />
        </FormControl>
      </div>
      <br />
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h4
            className={
              isThemeLight
                ? classes.lightThemeFontColor
                : classes.darkThemeFontColor
            }
          >
            Current Component State:{' '}
            {state.components[state.canvasFocus.componentId - 1].name}
          </h4>
          <TableStateProps
            rows1={rows1}
            setRows1={setRows1}
            canDeleteState={true}
            selectHandler={handlerRowSelect}
            isThemeLight={isThemeLight}
            data={data}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h4
            className={
              isThemeLight
                ? classes.lightThemeFontColor
                : classes.darkThemeFontColor
            }
          >
            Available Props from Parent:{' '}
            {parentName ? parentName : 'No Parents'}
          </h4>
          <TableParentProps
            parentPassedInProps={parentPassedInProps}
            parentComponent={parentComponent}
            parentProps={parentProps}
            canDeleteState={true}
            selectHandler={handlerRowSelect}
            isThemeLight={isThemeLight}
            data={data}
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: `${40}px`,
            color: 'black',
            justifyContent: 'center'
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            className="bi bi-arrow-right-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
          </svg>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h4
            className={
              isThemeLight
                ? classes.lightThemeFontColor
                : classes.darkThemeFontColor
            }
          >
            Passed in Props from Parent:{' '}
            {parentName ? parentName : 'No Parents'}
          </h4>
          <TablePassedInProps
            canDeleteState={true}
            selectHandler={handlerRowSelect}
            isThemeLight={isThemeLight}
            data={data}
          />
        </div>
      </div>
    </div>
  );
};
const useStyles = makeStyles((theme: Theme) => ({
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
    borderColor: '#46C0A5',
    padding: '0px'
  },
  rootCheckBoxLabel: {
    borderColor: '#46C0A5'
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
    backgroundColor: '#46C0A5',
    border: '5px solid #46C0A5'
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
    fontFamily: 'Roboto, Raleway, sans-serif',
    fontSize: '90%',
    textAlign: 'center',
    margin: '-20px 0px 5px 150px',
    border: ' 1px solid #46C0A5',
    transition: '0.3s'
  },
  rootToggle: {
    color: '#696969',
    fontSize: '0.85rem'
  },
  lightThemeFontColor: {
    color: 'white'
  },
  darkThemeFontColor: {
    color: '#fff'
  },
  greyThemeFontColor: {
    color: 'white'
  },
  formControl: {
    margin: '8px',
    minWidth: 120
  },
  selectEmpty: {
    marginTop: '16px'
  },
  color: {
    color: '#fff'
  },
  rootLight: {
    '& .MuiFormLabel-root': {
      color: 'white'
    }
  },
  rootDark: {
    '& .MuiFormLabel-root': {
      color: '#fff'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#fff'
    }
  },
  underlineDark: {
    borderBottom: '1px solid white'
  },
  rootUnderlineDark: {
    '& .-icon': {
      color: '#fff'
    },
    '&::before': {
      borderBottom: '1px solid #fff'
    }
  },
  rootUnderlineLight: {
    '& .-icon': {
      color: 'rgba(0,0,0,0.54)'
    },
    '&::before': {
      borderBottom: '1px solid rgba(0,0,0,0.54)'
    }
  },
  inputTextDark: {
    '& .MuiInputBase-input': {
      color: 'white'
    }
  },
  inputTextLight: {
    '& .MuiInputBase-input': {
      color: 'white'
    }
  }
}));

export default StatePropsPanel;
