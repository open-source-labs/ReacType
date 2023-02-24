import React, { useRef, useState, useContext, useEffect } from 'react';
import { DeleteButtons } from '../../interfaces/Interfaces';
import Modal from '@material-ui/core/Modal';
import StateContext from '../../context/context';

function DeleteButton({ id, name }: DeleteButtons) {
  const [state, dispatch] = useContext(StateContext);

  // -------------------------------- NEW CODE for DELETE BUTTONS, REPLACING ANNOTATIONS ---------------------------------------

  const deleteHTMLtype = (id: number) => {
    dispatch({
      type: 'DELETE CHILD',
      payload: { id }
    });
  };

  return (
    <div style={{ padding: '1px', float: 'right' }}>
      <button
        className="annotate-button-empty" // NOTE:  This className no longer accurate --> to update to delete button, same w/ Annotation export throughout
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
