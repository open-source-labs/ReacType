import { AddRoutes } from '../../interfaces/Interfaces'
import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { addChild} from '../../redux/reducers/slice/appStateSlice';

function AddRoute({
  id
}: AddRoutes) {
const dispatch = useDispatch();
const contextParam = useSelector(store => store.contextSlice)
  const handleClick = (id) => {
    dispatch(addChild({
      type: 'HTML Element',
      typeId: -1,
      childId: id, // this is the id of the parent to attach it to
      contextParam: store.contextSlice
    }))
 
  }

  return (
    <div style={{ padding: '1px', float: 'right' }}>
      <button id={'routeBtn' + id} onClick={() => handleClick(id)}>+</button>
    </div>
  );
}

export default AddRoute;
