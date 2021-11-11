import React, {useRef, useState, useContext, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import StateContext from '../../context/context';
import TableStateProps from '../right/TableStateProps';

function UseStateModal() {

  const [open, setOpen] = useState(false);

  // choose state source

  // state table

  const body = (
    <div className="useState-position">
      <div className="useState-header">
        <span>Choose State Source</span>
        <button style={{ padding: '1px', float: 'right' }} onClick={() => setOpen(false)}>X</button>
      </div>
      <div className="useState-window">
        <div className="useState-dropdown">
          <button >Choose Stateful Component</button>
          <div>
            <a href="#">component 1</a>
            <a href="#">component 2</a>
          </div>
        </div>
        <div className="useState-stateDisplay">
          <TableStateProps selectHandler={() => console.log('selectHandler')} deleteHandler={() => console.log('deleteHandler')} isThemeLight={true}/>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <button onClick={() => setOpen(true)}>Use State</button>
      <Modal
        open={open}
      >
        {body}
      </Modal>
    </div>
  )
}

export default UseStateModal;