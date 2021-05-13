
import React, { useState, useContext, useCallback, useEffect } from "react";
import {
  createStyles,
  makeStyles,
  styled,
  Theme,
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

import StateContext from "../../context/context";
import TableStateProps from "./TableStateProps";

const StatePropsPanel = ({ isThemeLight }): JSX.Element => {
  const classes = useStyles();
  const [state] = useContext(StateContext);

  const [inputKey, setInputKey] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputType, setInputType] = useState("");

  const [stateProps, setStateProps] = useState([]);

  // get currentComponent by using currently focused component's id
  const currentId = state.canvasFocus.componentId;
  const currentComponent = state.components[currentId - 1];

  // convert value to correct type based on user input
  const typeConversion = (value, type) => {
    switch (type) {
      case "String":
        return String(value);
      case "Number":
        return Number(value);
      case "Boolean":
        return Boolean(value);
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

  // submit new stateProps entries to state context
  const submitNewState = (e) => {
    e.preventDefault();
    const statesArray = currentComponent.stateProps;
    const newState = {
      // check if array is not empty => true find last elem in array. get id and increment by 1 || else 1
      id: statesArray.length > 0 ? statesArray[statesArray.length-1].id + 1 : 1,
      key: inputKey,
      value: typeConversion(inputValue, inputType),
      type: inputType,
    };    
    // store this newStateProp obj to our Component's stateProps array
    currentComponent.stateProps.push(newState);
    // reset newStateProp to empty for future new state prop entries
    updateUseStateCodes();
    clearForm();
  };
  
  // generates React Hook code snippets for each new stateProp entry
  const updateUseStateCodes = () => {
    // array of snippets of state prop codes
    const localStateCode = [];

    currentComponent.stateProps.forEach((stateProp) => {
      const useStateCode = `const [${stateProp.key}, set${
        stateProp.key.charAt(0).toUpperCase() + stateProp.key.slice(1)
      }] = useState<${stateProp.type} | undefined>(${JSON.stringify(stateProp.value)})`;
      localStateCode.push(useStateCode);
    });
    // store localStateCodes in global state context
    currentComponent.useStateCodes = localStateCode;
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
  
  // find & delete table row using its id
  const handlerRowDelete = (id:any) => {
    // iterate and filter out stateProps with matching row id 
    currentComponent.stateProps = currentComponent.stateProps.filter(element => element.id !== id);
    updateUseStateCodes();
    setStateProps(currentComponent.stateProps.slice());
  };
  
  return (
    <div className={'state-panel'}>
      <div>
        <FormControl>
          <h4>Create New State</h4>
          <TextField
            id="textfield-key"
            label="key:"
            variant="outlined"
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
          />
          <TextField
            id="textfield-value"
            label="value:"
            variant="outlined"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <FormControl required className={classes.formControl}>
            <InputLabel id="select-required-label">Type</InputLabel>
            <Select
              labelId="select-required-label"
              id="type-input"
              className={classes.selectEmpty}
              value={inputType}
              onChange={(event, index) => setInputType(index.props.value)}
            >
              <MenuItem value="">
                <em>Types</em>
              </MenuItem>
              <MenuItem id="type-selector" value={"string"}>
                String
              </MenuItem>
              <MenuItem id="type-selector" value={"number"}>
                Number
              </MenuItem>
              <MenuItem id="type-selector" value={"boolean"}>
                Boolean
              </MenuItem>
              <MenuItem id="type-selector" value={"array"}>
                Array
              </MenuItem>
              <MenuItem id="type-selector" value={"undefined"}>
                Undefined
              </MenuItem>
              <MenuItem id="type-selector" value={"any"}>
                Any
              </MenuItem>
            </Select>
            <FormHelperText>Required</FormHelperText>
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
        <h4>Current State Name: {state.components[state.canvasFocus.componentId - 1].name}</h4>
        <TableStateProps selectHandler={handlerRowSelect} deleteHandler={handlerRowDelete} />
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
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
