
import React, { useState, useContext, useCallback, useEffect } from "react";
import {
  createStyles,
  makeStyles,
  styled,
  Theme,
  createTheme,
  ThemeProvider,
  withStyles
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
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
  TextField,
} from "@material-ui/core";
import StateContext from "../../../../context/context";
import TableStateProps from "./TableStateProps";
import TableParentProps from "./TableParentProps";

const StatePropsPanel = ({ isThemeLight, data}): JSX.Element => {
  const [state, dispatch] = useContext(StateContext);
  const classes = useStyles();
  const [inputKey, setInputKey] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputType, setInputType] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const currentId = state.canvasFocus.componentId;
  const currentComponent = state.components[currentId - 1];
  const [parentProps, setParentProps] = useState([]);
  const [parentName, setParentName] = useState('No Parents');
  const [parentComponent, setParentComponent] = useState({});
  const [rows1, setRows1] = useState(currentComponent.stateProps);
  // convert value to correct type based on user input
  const typeConversion = (value, type) => {
    switch (type) {
      case "string":
        return String(value);
      case "number":
        return Number(value);
      case "boolean":
        return Boolean(value);
      case "array":
        return JSON.parse(value);
      case "object": 
        return JSON.parse(value);
      default:
        return value;
    }
  };

  // clears the input key, value, and type on Form
  const clearForm = () => {
    setInputKey("");
    setInputValue("");
    setInputType("");
  };
  //reset error warning
  const resetError = () => {
    setErrorStatus(false);
  };
  // submit new stateProps entries to state context
  let currKey;
  const submitNewState = (e) => {
    e.preventDefault();
    const statesArray = currentComponent.stateProps;
    //loop though array, access each obj at key property
    let keyToInt = parseInt(inputKey[0]);
    if(!isNaN(keyToInt)) {
      setErrorStatus(true);
      setErrorMsg('Key name can not start with int.');
      return;
    }
    const newState = {
      // check if array is not empty => true find last elem in array. get id and increment by 1 || else 1
      id: statesArray.length > 0 ? statesArray[statesArray.length-1].id + 1 : 1,
      key: inputKey,
      value: typeConversion(inputValue, inputType),
      type: inputType,
    };

    dispatch({
      type: 'ADD STATE',
      payload: {newState: newState}
    }); 
    setRows1([...rows1, newState])
    resetError();
    clearForm();
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
      setInputValue(table.row.value);
    } else clearForm();
  };
 //use effect to populate parent props table on load and every time canvas focus changes
  useEffect(() => {
    const parentInfo = findParent(currentId)
    
    setParentProps(parentInfo.parentProps);
    setParentName(parentInfo.parentName);
    setParentComponent(parentInfo.parentComponent);
  }, [currentId]);

  const findParent = (childId) => {
    let arr = [];
    
    for (let i = 0; i < data.length; i++){
      let currComponent = data[i]
      for (let j = 0; j < currComponent.children.length; j++) {
        let currChild = currComponent.children[j];
        if (currChild.typeId === childId) {
          console.log('the parent is component:', currComponent);
          console.log('the parents state props are:', currComponent.stateProps);
          const currComponentCopy = JSON.parse(JSON.stringify(currComponent));
          // currComponentCopy.stateProps.map((el) => {
          //   console.log(el)
          //   el['id'] = el['id'] + 0.01; 
          // })
          return {parentProps: currComponentCopy.stateProps, 
                  parentName: currComponentCopy.name,
                  parentComponent: currComponentCopy
                }
        }
      }
    }
    return {parentProps: [], 
      parentName: ''
    }
  }

  return (
    <div className={'state-panel'}>
      <div>
        <FormControl>
          <h4 className={isThemeLight ? classes.lightThemeFontColor : classes.darkThemeFontColor}>Create New State</h4>
          <TextField
            id="textfield-key"
            label="key:"
            variant="outlined"
            value={inputKey}
            error={errorStatus}
            onChange={(e) => setInputKey(e.target.value)}
            className={isThemeLight ? `${classes.rootLight} ${classes.inputTextLight}` : `${classes.rootDark} ${classes.inputTextDark}`}
            />
          <TextField
            id="textfield-value"
            label="value:"
            variant="outlined"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={isThemeLight ? `${classes.rootLight} ${classes.inputTextLight}` : `${classes.rootDark} ${classes.inputTextDark}`}
            />
          <FormControl required className={isThemeLight ? `${classes.formControl} ${classes.lightThemeFontColor}` : `${classes.formControl} ${classes.darkThemeFontColor}`}>
            <InputLabel
              id="select-required-label"
              className={isThemeLight ? classes.greyThemeFontColor : classes.darkThemeFontColor}>
                Type
            </InputLabel>
            <Select
              labelId="select-required-label"
              id="type-input"
              className={isThemeLight ? `${classes.selectEmpty} ${classes.rootUnderlineLight} ${classes.inputTextLight}` : `${classes.selectEmpty} ${classes.rootUnderlineDark} ${classes.inputTextDark}`}
              value={inputType}
              onChange={(event, index) => setInputType(index.props.value)}
              style={ isThemeLight
                ? {backgroundColor: '#eef0f1', color: '#000', border: '1px solid black', height: '28px', width: '200px'}
                : {backgroundColor: 'gray', color: '#fff', border: '1px solid white', height: '28px', width: '200px'}}
            >
              <MenuItem value="" style={{ color: 'black' }}>
                <em>Types</em>
              </MenuItem>
              <MenuItem id="type-selector" value={"string"} style={{ color: 'black' }}>
                String
              </MenuItem>
              <MenuItem id="type-selector" value={"number"} style={{ color: 'black' }}>
                Number
              </MenuItem>
              <MenuItem id="type-selector" value={"boolean"} style={{ color: 'black' }}>
                Boolean
              </MenuItem>
              <MenuItem id="type-selector" value={"array"} style={{ color: 'black' }}>
                Array
              </MenuItem>
              <MenuItem id="type-selector" value={"object"} style={{ color: 'black' }}>
                Object
              </MenuItem>
              <MenuItem id="type-selector" value={"undefined"} style={{ color: 'black' }}>
                Undefined
              </MenuItem>
              <MenuItem id="type-selector" value={"any"} style={{ color: 'black' }}>
                Any
              </MenuItem>
            </Select>
            <FormHelperText
              className={isThemeLight ? classes.greyThemeFontColor : classes.darkThemeFontColor}>
                Required
            </FormHelperText>
          </FormControl>
          <br></br>
          <MyButton
          type="submit"
          onClick={submitNewState}
          className={isThemeLight ? `${classes.addComponentButton} ${classes.lightThemeFontColor}` : `${classes.addComponentButton} ${classes.darkThemeFontColor}`}
          >
            Save
          </MyButton>
          <br></br>
        </FormControl>
      </div>
      <br></br>
      <div>
        <h4  className={isThemeLight ? classes.lightThemeFontColor : classes.darkThemeFontColor}>
          Current Component State: {state.components[state.canvasFocus.componentId - 1].name}
        </h4>
        <TableStateProps rows1={rows1} setRows1={setRows1} canDeleteState = {true} selectHandler={handlerRowSelect} isThemeLight={isThemeLight} data={data}/>
    
          
            <h4  className={isThemeLight ? classes.lightThemeFontColor : classes.darkThemeFontColor}>
              Props from Parent: {parentName ? parentName : 'No Parents'}
            </h4>
        
            <TableParentProps parentComponent ={parentComponent} parentProps={parentProps} canDeleteState = {true} selectHandler={handlerRowSelect} isThemeLight={isThemeLight} data={data}/>
        
       

      </div>
    </div>
  );
};
const useStyles = makeStyles((theme: Theme) =>
  ({
    inputField: {
      marginTop: "10px",
      borderRadius: "5px",
      whiteSpace: "nowrap",
      overflowX: "hidden",
      textOverflow: "ellipsis",
      backgroundColor: "rgba(255,255,255,0.15)",
      margin: "0px 0px 0px 10px",
      width: "140px",
      height: "30px",
      borderColor: "white",
    },
    inputWrapper: {
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "15px",
    },
    addComponentWrapper: {
      padding: "auto",
      marginLeft: "21px",
      display: "inline-block",
      width: "100%",
    },
    rootCheckBox: {
      borderColor: "#186BB4",
      padding: "0px",
    },
    rootCheckBoxLabel: {
      borderColor: "#186BB4",
    },
    panelWrapper: {
      width: "100%",
      marginTop: "15px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    panelWrapperList: {
      minHeight: "120px",
      marginLeft: "-15px",
      marginRight: "-15px",
      width: "300px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    dragComponents: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      width: "500px",
      backgroundColor: "#186BB4",
      border: "5px solid #186BB4",
    },
    panelSubheader: {
      textAlign: "center",
      color: "#fff",
    },
    input: {},
    newComponent: {
      color: "#155084",
      fontSize: "95%",
      marginBottom: "20px",
    },
    inputLabel: {
      fontSize: "1em",
      marginLeft: "10px",
    },
    btnGroup: {
      display: "flex",
      flexDirection: "column",
    },
    addComponentButton: {
      backgroundColor: "transparent",
      height: "40px",
      width: "100px",
      fontFamily: 'Roboto, Raleway, sans-serif',
      fontSize: "90%",
      textAlign: "center",
      margin: "-20px 0px 5px 150px",
      borderStyle: "none",
      transition: "0.3s",
      borderRadius: "25px",
    },
    rootToggle: {
      color: "#696969",
      fontSize: "0.85rem",
    },
    lightThemeFontColor: {
      color: "#155084",
    },
    darkThemeFontColor: {
      color: "#fff",
    },
    greyThemeFontColor: {
      color: 'rgba(0,0,0,0.54)',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    color: {
      color: '#fff',
    },
    rootLight: {
      '& .MuiFormLabel-root': {
        color: 'rgba(0,0,0,0.54)'
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
        color: '#fff',
      },
      '&::before': {
        borderBottom: '1px solid #fff'
      }
    },
    rootUnderlineLight: {
      '& .-icon': {
        color: 'rgba(0,0,0,0.54)',
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
        color: 'rgba(0,0,0,0.54)'
      }
    }
  })
);
const MyButton = styled(Button)({
  background: "#0099E6",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 0px 0px 2px #1a1a1a",
  color: "white",
  height: 24,
  width: 40,
  padding: "0 30px",
});
export default StatePropsPanel;
