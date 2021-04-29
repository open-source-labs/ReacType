// CARET
import React, { useState, useContext, useCallback } from "react";
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
import ComponentPanelItem from "./ComponentPanelItem";
import ComponentPanelRoutingItem from "./ComponentPanelRoutingItem";

import TableStateProps from "./TableStateProps";
import { exists } from "node:fs";

const StatePropsPanel = ({ isThemeLight }): JSX.Element => {
  const classes = useStyles();
  const [state, dispatch] = useContext(StateContext);

  const [inputKey, setInputKey] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputType, setInputType] = useState("");

  /*************** TEMPORARY FIX VIA FORCED RENDER ***********/
  // const [, updateState] = useState();
  // const forceUpdate = useCallback(() => updateState({}), []);
  /************************************************************/
  const debug = () => {
    const currentId = state.canvasFocus.componentId;
    const currentComponent = state.components[currentId - 1];
    console.log("currentComponent:", currentComponent);
    console.log("currentComponent.stateProps:", currentComponent.stateProps);
    console.log(
      "currentComponent.useStateCodes:",
      currentComponent.useStateCodes
    );
  };

  const typeConversion = (value, type) => {
    // based on user input for value, convert value to correct type
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

  const submitNewState = (e) => {
    e.preventDefault();
    // currently focused component's id
    const currentId = state.canvasFocus.componentId;
    // current component
    const currentComponent = state.components[currentId - 1];
    const statesArray = currentComponent.stateProps;
    const newState = {
      id: statesArray.length > 0 ? statesArray[statesArray.length-1].id + 1 : 1,
      //  check if array is not empty => true find last elem in array. get id and increment by 1 || else 1
      key: inputKey,
      value: typeConversion(inputValue, inputType),
      type: inputType,
    };    
    console.log('newState {}:', newState)
    // store this newStateProp obj to our Component's stateProps array
    currentComponent.stateProps.push(newState);
    console.log('currentComponent.stateProps []:', currentComponent.stateProps)
    // reset newStateProp to empty for future new state prop entries
    updateUseStateCodes();
    setInputKey("");
    setInputValue("");
    setInputType("");
  };

  const updateUseStateCodes = () => {
    // currently focused component's id
    const currentId = state.canvasFocus.componentId;
    // current component
    const currentComponent = state.components[currentId - 1];

    const localStateCode = [];
    // iterate thru current component's state props to generate code expression for each new state prop entry
    currentComponent.stateProps.forEach((el) => {
      const useStateCode = `const [${el.key}, set${
        el.key.charAt(0).toUpperCase() + el.key.slice(1)
      }] = useState<${el.type} | undefined>(${JSON.stringify(el.value)})`;
      localStateCode.push(useStateCode);
    });
    currentComponent.useStateCodes = localStateCode;
  };
////////////////////////////////////////////////////////////////////////////////////
  const handlerTableSelect = (data) => {
    // currently focused component's id
    const currentId = state.canvasFocus.componentId;
    // current component
    const currentComponent = state.components[currentId - 1];
    //iterate and delete index 
    let exists = false;
    // [ { id, key, value, type } ]
    
    console.log("currentComponent.stateProps: ", currentComponent.stateProps);
    
    currentComponent.stateProps.forEach((element) => {
      console.log('element.id:', element.id);
      if (element.id == data.rows.id) exists = true;
    });

    // if (exists) {
    //   setInputKey(data.row.key);
    //   setInputType(data.row.type);
    //   setInputValue(data.row.value);
    // } else {
    //   setInputKey("");
    //   setInputValue("");
    //   setInputType("");

    // }


    // setInputKey(data.row.key);
    // setInputType(data.row.type);
    // setInputValue(data.row.value);
    // forceUpdate();

    console.log('exists:', exists);
    console.log('data.row:', data.row);
  }

  const handlerDeleteState = (id) => {
    // currently focused component's id
    const currentId = state.canvasFocus.componentId;
    // current component
    const currentComponent = state.components[currentId - 1];
    //iterate and delete index 
    currentComponent.stateProps = currentComponent.stateProps.filter(element => (element.id != id));

    updateUseStateCodes();
    setInputKey("");
    setInputValue("");
    setInputType("");

  }

  return (
    <div style={{ border: `${3}px solid red` }}>
      <div>
        <FormControl>
          <label>Create New State</label>
          <br />
          <br />
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
          <MyButton type="submit" onClick={debug}>
            debug
          </MyButton>
          <br></br>
          <br></br>
          <MyButton type="submit" onClick={submitNewState}>
            Save
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
        {/* CARET - HANGING TABLE STATE PROPS */}
        <div style={{ border: `${3}px solid green` }}>
          <TableStateProps state={state} selectHandler={handlerTableSelect} deleteHandler={handlerDeleteState} />
        </div>
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
      fontFamily: '"Raleway", sans-serif',
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
      color: "#186BB4",
    },
    darkThemeFontColor: {
      color: "#fff",
    },
    // CARET
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
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 24,
  width: 40,
  padding: "0 30px",
});

export default StatePropsPanel;
