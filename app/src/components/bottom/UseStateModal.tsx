import React, {useRef, useState, useContext, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import StateContext from '../../context/context';
import TableStateProps from '../right/TableStateProps';

// TODO: typescript interface or type check
function UseStateModal({ updateAttributeWithState, attributeToChange, childId }) {
  const [open, setOpen] = useState(false);

  // TODO: choose state source
  const componentProviderId = 1; // for now set to App

  // selectHandler function to pass into TableStateProps
  // get id of selected component
  // access the ChildElement

  // return the selected state's ID back so the value of it can be updated in the customizationpanel.  to the assign the value of selected state to attribute tied to useState button (currently just text)
  // attribute to change as parameter for UseStateModal
  const body = (
    <div className="useState-position">
      <div className="useState-header">
        <span>Choose State Source</span>
        <button
          style={{ padding: '1px', float: 'right' }}
          onClick={() => setOpen(false)}
        >
          X
        </button>
      </div>
      <div className="useState-window">
        <div className="useState-dropdown">
          <button>Choose Stateful Component</button>
          <div>
            <a href="#">component 1</a>
            <a href="#">component 2</a>
          </div>
        </div>
        <div className="useState-stateDisplay">
          <TableStateProps
            selectHandler={(table) => {
              console.log('table.row.id',table.row.id);
              updateAttributeWithState(attributeToChange, componentProviderId, table.row.id)
            }}
            deleteHandler={() => func()}
            isThemeLight={true}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <button onClick={() => setOpen(true)}>Use State</button>
      <Modal open={open}>{body}</Modal>
    </div>
  );
}

export default UseStateModal;