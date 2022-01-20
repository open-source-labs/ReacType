import { AddRoutes } from '../../interfaces/Interfaces'
import React, { useContext } from 'react';
import StateContext from '../../context/context';

function AddRoute({
  id
}: AddRoutes) {
  const [, dispatch] = useContext(StateContext);

  const handleClick = (id) => {
    dispatch({
      type: 'ADD CHILD',
      payload: {
        type: 'HTML Element',
        typeId: -1,
        childId: id // this is the id of the parent to attach it to
      }
    });
  }

  return (
    <div style={{ padding: '1px', float: 'right' }}>
      <button id={'routeBtn' + id} onClick={() => handleClick(id)}>+</button>
    </div>
  );
}

export default AddRoute;
