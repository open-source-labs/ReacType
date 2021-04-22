// from ComponentPanel.tsx
import React, {
  Component,
  useState,
  useContext,
  useEffect,
  useCallback
} from 'react';
import StateContext from '../../context/context';
import Grid from '@material-ui/core/Grid';
import ComponentPanelItem from './ComponentPanelItem';
import ComponentPanelRoutingItem from './ComponentPanelRoutingItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles, styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputLabel
} from '@material-ui/core';

// type ClockState = {
//   name: string;
//   time: Date; // <-- date is a type 'Date' it just knows an actual Date (e.g. 2021-04-21T14:33:00PDT)
// };

// export class Clock extends Component<{}, ClockState> {
//   componentWillMount() {
//     this.tick();
//   }
//   componentDidMount() {
//     setInterval(() => this.tick(), 30000);
//   }
//   tick() {
//     this.setState({
//       time: new Date()
//     });
//   }
//   render() {
//     return <p>current time is {this.state.time.toLocaleTimeString()}</p>;
//   }
// }

// const initialState: State = {
//   name: '',
//   isLoggedIn: false,
//   components: [
//     {
//       id: 1,
//       name: 'App',
//       style: {},
//       code: '<div>Drag in a component or HTML element into the canvas!</div>',
//       children: [],
//       isPage: true,
//       past: [],
//       future: [],
//     },
//   ],
//   projectType: 'Classic React',
//   rootComponents: [1],
//   canvasFocus: { componentId: 1, childId: null },
//   nextComponentId: 2,
//   nextChildId: 1,
//   nextTopSeparatorId: 1000,
//   HTMLTypes,
// };

// state/props that we are adding in the 'new component'
// this is

const MockStateInterface = ({ isThemeLight }): JSX.Element => {
  const classes = useStyles();
  const [state, dispatch] = useContext(StateContext);
  const [compName, setCompName] = useState('');
  const [keyName, setKeyName] = useState('');
  const [valueName, setValueName] = useState('');
  const [typeName, setTypeName] = useState('');
  const [isRoot, setIsRoot] = useState(false);

  // const createOption = (inputName: String) => {
  //   let inputNameClean = inputName.replace(/\s+/g, ''); // removes spaces
  //   const formattedName =
  //     inputNameClean.charAt(0).toUpperCase() + inputNameClean.slice(1); // capitalizes first letter
  //   dispatch({
  //     type: 'ADD COMPONENT',
  //     payload: { componentName: formattedName, root: isRoot }
  //   });
  //   setIsRoot(false);
  //   setCompName('');
  // };
  // const keyBindCreateComponent = useCallback(e => {
  //   if (e.key === 'Enter') {
  //     e.preventDefault();
  //     document.getElementById('addComponentButton').click();
  //   }
  // }, []);
  // useEffect(() => {
  //   document.addEventListener('keydown', keyBindCreateComponent);
  //   return () => {
  //     document.removeEventListener('keydown', keyBindCreateComponent);
  //   };
  // }, []);
  // const isFocus = (targetId: Number) => {
  //   return state.canvasFocus.componentId === targetId ? true : false;
  // };

  // state components isPage: true indicates root-ness of component

  // we need to be able to add mockState objects into the root components
  // display the mockState objects of selected root component

  //   State = {
  //     name: '',
  //     isLoggedIn: false,
  //     components: [
  //       {
  //         id: 1,
  //         name: 'App',
  //         style: {},
  //         code: '<div>Drag in a component or HTML element into the canvas!</div>',
  //         children: [],
  //         isPage: true,
  //         past: [],
  //         future: [],
  //         mockState: {} // property can be mutated; only available in parent component
  //       }
  //     ],
  // };

  const debug = () => {
    console.log('state:', state);
    console.log('state.canvasFocus:', state.canvasFocus);
    const currentId = state.canvasFocus.componentId;
    console.log(
      'state.canvasFocus.components[currentId-1]:',
      state.components[currentId - 1]
    );
    console.log('keyName:', keyName);
    console.log('valueName:', valueName);
    console.log('typeName:', typeName);
  };

  const handleKeyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyName(e.target.value);
  };
  const handleValueInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueName(e.target.value);
  };
  const handleTypeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypeName(e.target.value);
  };
  const submitMockState = () => {
    const currentId = state.canvasFocus.componentId;
    state.components[currentId - 1].mockState.props[keyName] = valueName;
    state.components[currentId - 1].mockState.type = typeName;

    // mockState: {
    //   props: {},
    //   type: ''
    // }
  };

  return (
    <div style={{ border: 3 + 'px solid red' }}>
      <div>
        <FormControl>
          <label>Create New State</label>
          {/* <TextField
            id="outlined-basic"
            label="key:"
            variant="outlined"
            value={keyName}
          />
          <TextField
            id="outlined-basic"
            label="value:"
            variant="outlined"
            value={valueName}
          />
          <TextField
            id="outlined-basic"
            label="type:"
            variant="outlined"
            value={typeName}
          /> */}
          <div className={classes.inputWrapper}>
            <input
              color={'primary'}
              className={
                isThemeLight
                  ? `${classes.inputField} ${classes.lightThemeFontColor}`
                  : `${classes.inputField} ${classes.darkThemeFontColor}`
              }
              // InputProps={{ className: classes.input }}
              value={keyName}
              onChange={handleKeyInput}
            />
          </div>
          <div className={classes.inputWrapper}>
            <input
              color={'primary'}
              className={
                isThemeLight
                  ? `${classes.inputField} ${classes.lightThemeFontColor}`
                  : `${classes.inputField} ${classes.darkThemeFontColor}`
              }
              // InputProps={{ className: classes.input }}
              value={valueName}
              onChange={handleValueInput}
            />
          </div>
          <div className={classes.inputWrapper}>
            <input
              color={'primary'}
              className={
                isThemeLight
                  ? `${classes.inputField} ${classes.lightThemeFontColor}`
                  : `${classes.inputField} ${classes.darkThemeFontColor}`
              }
              // InputProps={{ className: classes.input }}
              value={typeName}
              onChange={handleTypeInput}
            />
          </div>
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
  }
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
