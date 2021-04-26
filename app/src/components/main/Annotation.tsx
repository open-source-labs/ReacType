// Caret Start
import React, { useRef } from 'react';
import { Annotations } from '../../interfaces/Interfaces';
import Modal from '@material-ui/core/Modal';

function Annotation({
  id,
  name,
}: Annotations) {
  const ref = useRef(null);

  // React hook setting the annotation button modal open/close state
  const [open, setOpen] = React.useState(false);

  // For showing the modal
  const handleOpen = (id) => {
    setOpen(true);
  };

  // For closing the modal
  const handleClose = () => {
    setOpen(false);
  };

  // Handles when text exists in the textarea of the modal. If text exists/does not exist, corresponding button changes colors.
  const handleAnnoChange = (event) => {
    const { value } = event.target;

    if(value === '') {
      ref.current.style.background = '#3ec1ac';
      ref.current.id = 'btn' + event.target.id;
    } else {
      ref.current.style.background = '#cc99ff';
      ref.current.id = 'btn' + event.target.id;
    }
  }

  const body = (
    <div>
      <p className='annotate-textarea-header'>Notes for: {name} ( {id} )</p>
      <textarea className='annotate-textarea' id={id.toString()} onChange={handleAnnoChange}></textarea>
    </div>
  )

  return (
    <div style={{padding: '1px', float: 'right'}}>
      <button className='annotate-button-empty' id={"btn" + id} onClick={() => handleOpen(id)} ref={ref}>Notes</button>
      <Modal 
        open={open}
        onClose={handleClose}
        keepMounted={true}
      >
        {body}
       
      </Modal>
    </div>
  );
}

export default Annotation;
// Caret End
