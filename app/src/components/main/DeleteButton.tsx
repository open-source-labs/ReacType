import React, { useRef, useState, useContext, useEffect } from 'react';
import { DeleteButtons } from '../../interfaces/Interfaces';
import Modal from '@mui/material/Modal';
import StateContext from '../../context/context';
import { useDispatch, useSelector } from 'react-redux';
import { deleteChild } from '../../redux/reducers/slice/appStateSlice';

function DeleteButton({ id, name }: DeleteButtons) {
  // const [state, dispatch] = useContext(StateContext);
  const { state, contextParam } = useSelector((store) => ({
    state: store.appState,
    contextParam: store.contextSlice,
  }));

  const dispatch = useDispatch();

  const deleteHTMLtype = (id: number) => {
    // dispatch({
    //   type: 'DELETE CHILD',
    //   payload: { id }
    // });
    dispatch(deleteChild({ id:id, contextParam:contextParam }));
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
