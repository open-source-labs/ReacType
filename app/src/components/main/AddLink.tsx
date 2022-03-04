import { AddRoutes } from '../../interfaces/Interfaces'
import React, { useContext, useState } from 'react';
import StateContext from '../../context/context';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { InputLabel } from '@material-ui/core';

import { styleContext } from '../../containers/AppContainer';

function AddLink({ id, onClickHandler }) {
  const { isThemeLight } = useContext(styleContext);
  const [state, dispatch] = useContext(StateContext);

  const handleClick = (id) => {
    dispatch({
      type: 'ADD CHILD',
      payload: {
        type: 'HTML Element',
        typeId: 19,
        childId: id // this is the id of the parent to attach it to
      }
    });
  }

  const handlePageSelect = event => {
    const currComponent = state.components.find(element => element.id === state.canvasFocus.componentId);
    currComponent.children.some(element => {
      if(element.childId === id) {
        const state = JSON.parse(JSON.stringify(element));
        state.childId = id;
        state.attributes.compLink = event.target.value;
        dispatch({type: 'UPDATE ATTRIBUTES', payload: state})
        return true;
      }
    });
  }

  const pagesItems = state.components.filter(comp => state.rootComponents.includes(comp.id));
  const dropDown = pagesItems.map(comp => <MenuItem style={{ color: 'black' }} value={comp.name}>{comp.name}</MenuItem>);

  return (
    <div style={{padding: '1px', float: 'right', display: 'flex', border: '2px solid red', alignSelf: 'center'}}>
      <FormControl size='medium' style={{display: 'flex'}}>
          {/* <InputLabel style={ { color: isThemeLight? '#fff' : '#000'} }>Pages</InputLabel> */}
          <Select label='pages'
            variant="outlined"
            onMouseDown={onClickHandler}
            onChange={handlePageSelect}
            id="page-select"
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
