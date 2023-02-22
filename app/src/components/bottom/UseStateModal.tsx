import React, {useState, useContext} from 'react';
import { Modal, Button } from '@material-ui/core';
import StateContext from '../../context/context';
import TableStateProps from './TableStateProps';


function UseStateModal({ updateAttributeWithState, attributeToChange, childId }) {
  const [state, dispatch] = useContext(StateContext);
  const [open, setOpen] = useState(false);
  const [stateKey, setStateKey] = useState('');
  const [statePropsId, setStatePropsId] = useState(-1);
  const [componentProviderId, setComponentProviderId] = useState(1);  

  // table to choose state from
  const body = (
    <div className="useState-position">
      <div className="useState-header">
        <span>Choose State</span>
        <button
          style={{ margin: '5px 5px' ,padding: '1px', float: 'right' }}
          onClick={() => {
            setStateKey('');
            setStatePropsId(-1);
            setOpen(false)}}
        >
          X
        </button> 
      </div>
      <div className="useState-window">
        <div className="useState-stateDisplay">
          <TableStateProps
            providerId = {componentProviderId}
            canDeleteState = {false}
            selectHandler={(table) => {
                updateAttributeWithState(attributeToChange, componentProviderId, statePropsId > 0 ? statePropsId : table.row.id, table.row, stateKey + table.row.key);
                setStateKey('')
                setStatePropsId(-1);
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
      <Button 
        variant='contained'
        color='primary'
        className="useState-btn" onClick={() => setOpen(true)}>USE STATE</Button>
      <Modal open={open}>{body}</Modal>
    </div>
  );
}

export default UseStateModal;
