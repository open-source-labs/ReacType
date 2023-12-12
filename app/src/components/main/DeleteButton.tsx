import React from 'react';
import { DeleteButtons } from '../../interfaces/Interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { deleteChild } from '../../redux/reducers/slice/appStateSlice';
import { RootState } from '../../redux/store';

function DeleteButton({ id, name }: DeleteButtons) {
  const contextParam = useSelector((store: RootState) => store.contextSlice);

  const dispatch = useDispatch();

  const deleteHTMLtype = (id: number) => {
    dispatch(deleteChild({ id: id, contextParam: contextParam }));
  };

  return (
    <div style={{ padding: '1px', float: 'right' }}>
      <button
        className="delete-button-empty"
        id={'btn' + id}
        onClick={(event) => {
          event.stopPropagation();
          deleteHTMLtype(id);
        }}
      >
        x
      </button>
    </div>
  );
}

export default DeleteButton;
