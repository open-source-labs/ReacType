import { AddRoutes } from '../../interfaces/Interfaces'
import React, { useContext } from 'react';
import StateContext from '../../context/context';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { InputLabel } from '@material-ui/core';

import { styleContext } from '../../containers/AppContainer';

function AddLink({ id }: AddRoutes) {
  const { isThemeLight } = useContext(styleContext);
  const [state, dispatch] = useContext(StateContext);
  console.log('AddLink\'s state', state);
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
    const selectedPageName = event.target.value;
    console.log('selectedPages State: ', selectedPageName);
    console.log('page state', state.components[0].children);
    state.components[0].children.forEach(element => {
      if(element.childId === id) {
        element.attributes.compLink = event.target.value;
      }
    });
    // selectedPageName.compLink = event.target.value;
    // dispatch({ type: 'HREF TO', payload: });
  }

  console.log('state', state);
  let pagesItems = state.components.filter(comp => state.rootComponents.includes(comp.id));
  let dropDown = pagesItems.map(comp => <MenuItem value={comp.name}>{comp.name}</MenuItem>);
  return (
    <div style={{ padding: '1px', float: 'right' }}>
      <FormControl size='small'>
        <InputLabel style={ { color: isThemeLight? '#000' : '#fff'} }>Pages</InputLabel>
        <Select variant="outlined"
          onChange={handlePageSelect}
          id="page-select"
          style={ isThemeLight? {backgroundColor: '#eef0f1', color: '#000', border: '1px solid black'} : {backgroundColor: 'gray', color: '#fff', border: '1px solid white'}}
        >
          {dropDown}
        </Select>
      </FormControl>
    </div>
  );
}

export default AddLink;
