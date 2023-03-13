import { AddRoutes } from '../../interfaces/Interfaces'
import React, { useContext, useState, useEffect } from 'react';
import StateContext from '../../context/context';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { InputLabel } from '@mui/material';
import { TextField } from '@mui/material';
import { styleContext } from '../../containers/AppContainer';
import { makeStyles } from '@mui/material/styles'
import {useDispatch, useSelector} from 'react-redux';
import { updateAttributes } from '../../redux/reducers/slice/appStateSlice';

function AddLink({ id, onClickHandler, linkDisplayed }) {
  const { isThemeLight } = useContext(styleContext);
  // const [state, dispatch] = useContext(StateContext);
  const state = useSelector(store => store.appState);
  const dispatch = useDispatch();
  const [link, setLink] = useState('')

  //this function allows the link to be functional when it's nested
  function deepIterate(arr) {
    const output = [];
    for(let i = 0; i < arr.length; i++) {
      if(arr[i].typeId === 1000) continue;
      output.push(arr[i]);
      if(arr[i].children.length) {
        output.push(...deepIterate(arr[i].children));
      }
    }
    return output;
  }

  const handlePageSelect = event => {
    const currComponent = state.components.find(element => element.id === state.canvasFocus.componentId);
    deepIterate(currComponent.children).some(element => {
      if(element.childId === id) {
        const state = JSON.parse(JSON.stringify(element));
        state.childId = id;
        state.attributes.compLink = event.target.value;
        // dispatch({type: 'UPDATE ATTRIBUTES', payload: state})
        dispatch(updateAttributes({attributes: state}))
        return true;
      }
    });
  }


  const pagesItems = state.components.filter(comp => state.rootComponents.includes(comp.id));
  const dropDown = [<MenuItem style={{ color: '#000' }} disabled hidden selected>Pages</MenuItem>].concat(pagesItems.map(comp => <MenuItem style={{ color: '#000' }} value={comp.name}>{comp.name}</MenuItem>));


  return (
    <div style={{float: 'right'}}>
      <FormControl variant='outlined' focused='true' style={ {width: '100%'} }>
      <InputLabel id='page-select-label' style={ {color: isThemeLight? '#000' : '#fff'} }>Pages</InputLabel>
          <Select 
            label='Pages'
            onMouseDown={onClickHandler}
            onChange={handlePageSelect}
            id="page-select"
            value={linkDisplayed}
            style={ isThemeLight
                    ? {backgroundColor: '#eef0f1', color: '#000', border: '1px solid black', height: '28px', width: '200px'}
                    : {backgroundColor: 'gray', color: '#fff', border: '1px solid white', height: '28px', width: '200px'}}
            >
            {dropDown}
          </Select>
      </FormControl>
    </div>
  );
}

export default AddLink;
