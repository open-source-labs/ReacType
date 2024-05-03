import React, { useState } from 'react';
import { Button, TextField } from "@mui/material";
import { Send } from "@mui/icons-material";
import MUITypes from "../../redux/MUITypes";
import { MUIType } from '../../interfaces/Interfaces';
import { emitEvent } from '../../helperFunctions/socket';
import { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';



const MUIProps = (props): JSX.Element => {
  const dispatch = useDispatch();
  const propState = useSelector((store: RootState) => store.MUIpropsSlice);
  const state = useSelector((store: RootState) => store.appState);
  const currFocus = getFocus().child;

  

  function getFocus() {
    // find and store component's name based on canvasFocus.componentId
    // note: deep clone here to make sure we don't end up altering state
    const focusTarget = JSON.parse(
      JSON.stringify(
        state.components.find(
          (comp) => comp.id === state.canvasFocus.componentId
        )
      )
    );
    delete focusTarget.child;
    // checks if canvasFocus references a childId
    const childInstanceId = state.canvasFocus.childId;
    let focusChild;
    // if so, breadth-first search through focusTarget's descendants to find matching child
    if (childInstanceId) {
      focusTarget.child = {};
      focusTarget.child.id = childInstanceId;
      focusChild = {}; // child instance being referenced in canvasFocus
      const searchArray = [...focusTarget.children];
      while (searchArray.length > 0) {
        const currentChild = searchArray.shift();
        // if a match is found, set focusChild to the matched child and break out of the loop
        if (currentChild.childId === childInstanceId) {
          focusChild = currentChild;
          focusTarget.child.style = focusChild.style;
          focusTarget.child.events = focusChild.events;
          focusTarget.child.attributes = focusChild.attributes;
          break;
        }
        if (currentChild.name !== 'input' && currentChild.name !== 'img')
          currentChild.children.forEach((child) => searchArray.push(child));
      }

      // if type is Component, use child's typeId to search through state components and find matching component's name
      if (focusChild.type === 'Component') {
        focusTarget.child.type = 'component';
        focusTarget.child.name = state.components.find(
          (comp) => comp.id === focusChild.typeId
        ).name;
        // if type is HTML Element, search through HTML types to find matching element's name
      } else if (focusChild.type === 'MUI Component') {
        focusTarget.child.type = 'MUI Component';
        focusTarget.child.name = state.MUITypes.find(
          (elem) => elem.id === focusChild.typeId
        ).name;
      }
    }
    return focusTarget;
  }

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {MUITypes[2].propOptions.map((propOption) => (
          <Button
            key={propOption}
            // onClick={() => handleComponentSelect(propOption)}
            sx={{ marginBottom: "0.5rem" }}
          >
            {propOption}
          </Button>
        ))}
      </div>
      <Button
        onClick={() => console.log("Save button clicked")}
        variant="contained"
        endIcon={<Send />}
        sx={{ marginTop: "1rem" }}
      >
        Save
      </Button>
    </div>
  );
}

export default MUIProps;

// return (
//   <div style={{ display: "flex", flexDirection: "column" }}>
//     {currFocus.child.properties ? (
//       currFocus.child.properties.map((prop) => (
//         <div key={prop.name}>
//           <label>{prop.name}:</label>
//           <input
//             type="text"
//             value={prop.value}
//             style={{ marginBottom: '0.5rem' }}
//           />
//         </div>
//       ))
//     ) : (
//       <p>No properties available. Please select a MUI component.</p>
//     )}
//     <Button
//       variant="contained"
//       endIcon={<Send />}
//       sx={{ marginTop: "1rem" }}
//     >
//       Save
//     </Button>
//   </div>
// );
// };