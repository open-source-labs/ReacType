import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { InputLabel } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateAttributes } from '../../redux/reducers/slice/appStateSlice';
import { RootState } from '../../redux/store';

/**
 * `AddLink` is a React component that renders a drop-down menu to select and link to different pages in the app.
 * It helps manage internal routing by associating selected pages with specific elements within the application.
 * The component is primarily used to assign navigation targets for components that act as links.
 *
 * @param {Object} props - The component props.
 * @param {number} props.id - The unique identifier for the link.
 * @param {Function} props.onClickHandler - Function to handle click events on the Select component.
 * @param {string} props.linkDisplayed - The currently displayed link in the Select component.
 *
 * @returns {JSX.Element} A FormControl component containing a Select element with options derived from pages within the application.
 */
function AddLink({ id, onClickHandler, linkDisplayed }): JSX.Element {
  const { state, contextParam, isThemeLight } = useSelector(
    (store: RootState) => ({
      state: store.appState,
      contextParam: store.contextSlice,
      isThemeLight: store.styleSlice
    })
  );
  const dispatch = useDispatch();
  //this function allows the link to be functional when it's nested
  function deepIterate(arr) {
    const output = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].typeId === 1000) continue;
      output.push(arr[i]);
      if (arr[i].children.length) {
        output.push(...deepIterate(arr[i].children));
      }
    }
    return output;
  }

  const handlePageSelect = (event) => {
    const currComponent = state.components.find(
      (element) => element.id === state.canvasFocus.componentId
    );
    deepIterate(currComponent.children).some((element) => {
      if (element.childId === id) {
        const state = JSON.parse(JSON.stringify(element));
        state.childId = id;
        state.attributes.compLink = event.target.value;
        dispatch(
          updateAttributes({ attributes: state, contextParam: contextParam })
        );
        return true;
      }
    });
  };

  const pagesItems = state.components.filter((comp) =>
    state.rootComponents.includes(comp.id)
  );
  const dropDown = [
    <MenuItem style={{ color: '#000' }} disabled hidden selected>
      Pages
    </MenuItem>
  ].concat(
    pagesItems.map((comp) => (
      <MenuItem style={{ color: '#000' }} value={comp.name}>
        {comp.name}
      </MenuItem>
    ))
  );

  return (
    <div style={{ float: 'right' }}>
      <FormControl variant="outlined" focused={true} style={{ width: '100%' }}>
        <InputLabel
          id="page-select-label"
          style={{ color: isThemeLight ? '#000' : '#fff' }}
        >
          Pages
        </InputLabel>
        <Select
          label="Pages"
          onMouseDown={onClickHandler}
          onChange={handlePageSelect}
          id="page-select"
          value={linkDisplayed}
          style={
            isThemeLight
              ? {
                  backgroundColor: '#eef0f1',
                  color: '#000',
                  border: '1px solid black',
                  height: '28px',
                  width: '200px'
                }
              : {
                  backgroundColor: 'gray',
                  color: '#fff',
                  border: '1px solid white',
                  height: '28px',
                  width: '200px'
                }
          }
        >
          {dropDown}
        </Select>
      </FormControl>
    </div>
  );
}

export default AddLink;
