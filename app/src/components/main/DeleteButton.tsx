import React, { useRef, useState, useContext, useEffect } from 'react';
import { DeleteButtons } from '../../interfaces/Interfaces';
import Modal from '@material-ui/core/Modal';
import StateContext from '../../context/context';

function DeleteButton({ id, name }: DeleteButtons) {
  const [state, dispatch] = useContext(StateContext);

  const deleteHTMLtype = (id: number) => {
    dispatch({
      type: 'DELETE CHILD',
      payload: { id }
    });
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
