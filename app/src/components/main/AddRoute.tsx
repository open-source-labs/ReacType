import { AddRoutes } from '../../interfaces/Interfaces';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addChild } from '../../redux/reducers/slice/appStateSlice';
import { RootState } from '../../redux/store';
import { emitEvent } from '../../helperFunctions/socket';

function AddRoute({ id }: AddRoutes): JSX.Element {
  const roomCode = useSelector((store: RootState) => store.roomSlice.roomCode);
  const dispatch = useDispatch();
  const contextParam = useSelector((store: RootState) => store.contextSlice);
  const handleClick = (id: number): void => {
    dispatch(
      addChild({
        type: 'HTML Element',
        typeId: -1,
        childId: id, // this is the id of the parent to attach it to
        contextParam: contextParam
      })
    );
    if (roomCode) {
      emitEvent('addChildAction', roomCode, {
        type: 'HTML Element',
        typeId: -1,
        childId: id,
        contextParam: contextParam
      });

      console.log('emit addChildAction event is triggered in AddRoute!');
    }
  };

  return (
    <div style={{ padding: '1px', float: 'right' }}>
      <button id={'routeBtn' + id} onClick={() => handleClick(id)}>
        +
      </button>
    </div>
  );
}

export default AddRoute;
