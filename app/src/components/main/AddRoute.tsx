import { AddRoutes } from '../../interfaces/Interfaces'
import React, { useContext } from 'react';
import StateContext from '../../context/context';
import {useDispatch, useSelector} from 'react-redux'
import { addChild} from '../../redux/reducers/slice/appStateSlice';

function AddRoute({
  id
}: AddRoutes) {
  // const [, dispatch] = useContext(StateContext);
const dispatch = useDispatch();

  const handleClick = (id) => {
    dispatch(addChild({
      type: 'HTML Element',
      typeId: -1,
      childId: id // this is the id of the parent to attach it to
    }))
    // dispatch({
    //   type: 'ADD CHILD',
    //   payload: {
    //     type: 'HTML Element',
    //     typeId: -1,
    //     childId: id // this is the id of the parent to attach it to
    //   }
    // });
  }

  return (
    <div style={{ padding: '1px', float: 'right' }}>
      <button id={'routeBtn' + id} onClick={() => handleClick(id)}>+</button>
    </div>
  );
}

export default AddRoute;
