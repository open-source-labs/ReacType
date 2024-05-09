import React, { useState, useRef } from 'react';
import Modal from '@mui/material/Modal';
import TableStateProps from '../StateManagement/CreateTab/components/TableStateProps';

/**
 * A React component that provides a modal interface for linking state properties to component attributes.
 * It displays a list of available state properties in a table format and allows the user to select one to associate
 * with a specified attribute of a component. The modal can be opened by clicking a button and closed using a dedicated close button.
 *
 * @param {Object} props - Component props.
 * @param {Function} props.updateAttributeWithState - Function to update the component attribute with the selected state property.
 * @param {string} props.attributeToChange - The name of the attribute in the component to which the state is to be linked.
 *
 * State:
 * - `open`: Boolean to control the visibility of the modal.
 * - `stateKey`: Stores the key part of the state property being linked.
 * - `statePropsId`: Stores the ID of the state property being linked.
 * - `componentProviderId`: Stores the ID of the component that provides the state. Set initially to 1 and can be changed as needed.
 *
 * @returns {JSX.Element} A React element that renders a button to open the modal and the modal itself containing the TableStateProps component.
 */
function UseStateModal({
  updateAttributeWithState,
  attributeToChange
}): JSX.Element {
  const [open, setOpen] = useState(false);
  const [stateKey, setStateKey] = useState('');
  const [statePropsId, setStatePropsId] = useState(-1);
  const [componentProviderId, setComponentProviderId] = useState(1);
  const container = useRef(null);
  // table to choose state from
  const body = (
    <div className="useState-position">
      <div className="useState-header">
        <span>Choose State</span>
        <button
          style={{ margin: '5px 5px', padding: '1px', float: 'right' }}
          onClick={() => {
            setStateKey('');
            setStatePropsId(-1);
            setOpen(false);
          }}
        >
          X
        </button>
      </div>
      <div className="useState-window">
        <div className="useState-stateDisplay">
          <TableStateProps
            providerId={componentProviderId}
            canDeleteState={false}
            selectHandler={(table) => {
              updateAttributeWithState(
                attributeToChange,
                componentProviderId,
                statePropsId > 0 ? statePropsId : table.row.id,
                table.row,
                stateKey + table.row.key
              );
              setStateKey('');
              setStatePropsId(-1);
              setOpen(false);
            }}
            isThemeLight={true}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div ref={container}>
      <button className="useState-btn" onClick={() => setOpen(true)}>
        Use State
      </button>
      <Modal open={open} container={container.current}>
        {body}
      </Modal>
    </div>
  );
}

export default UseStateModal;
