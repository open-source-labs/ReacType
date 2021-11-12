import React, {useRef, useState, useContext, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import StateContext from '../../context/context';
import TableStateProps from '../right/TableStateProps';

// TODO: typescript interface or type check
function UseStateModal({ updateAttributeWithState, attributeToChange, childId }) {
  const [state, dispatch] = useContext(StateContext);
  const [open, setOpen] = useState(false);

  // make buttons to choose which component to get state from
  const [componentProviderId, setComponentProviderId] = useState(1) // for now set to App
  const components = [];
  for (let i = 0; i < state.components.length; i ++) {
    components.push(<button onClick={() => setComponentProviderId(i+1)}>{state.components[i].name}</button>)
  }

  // return the selected state's ID back so the value of it can be updated in the customizationpanel.  to the assign the value of selected state to attribute tied to useState button (currently just text)
  // attribute to change as parameter for 
  const body = (
    <div className="useState-position">
      <div className="useState-header">
        <span>Choose State Source</span>
        <button
          style={{ margin: '5px 5px' ,padding: '1px', float: 'right' }}
          onClick={() => setOpen(false)}
        >
          X
        </button>
      </div>
      <div className="useState-window">
        <div className="useState-dropdown">
          {components}
        </div>
        <div className="useState-stateDisplay">
          <TableStateProps
            providerId = {componentProviderId}
            selectHandler={(table) => {
              updateAttributeWithState(attributeToChange, componentProviderId, table.row.id);
              setOpen(false);
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
      <button className="useState-btn" onClick={() => setOpen(true)}>USE STATE</button>
      <Modal open={open}>{body}</Modal>
    </div>
  );
}

export default UseStateModal;