import { AddRoutes } from '../../interfaces/Interfaces'
import React, { useContext } from 'react';
import StateContext from '../../context/context';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { InputLabel } from '@material-ui/core';


function AddLink({ id }: AddRoutes) {
  const [, dispatch] = useContext(StateContext);

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

  return (
    <div style={{ padding: '1px', float: 'right' }}>
      <FormControl size='small'>
            <Select
              variant="outlined"
            >
              <MenuItem>Classic React</MenuItem>
              <MenuItem>Gatsby.js</MenuItem>
              <MenuItem>Next.js</MenuItem>
            </Select>
          </FormControl>
    </div>
  );
}

export default AddLink;
