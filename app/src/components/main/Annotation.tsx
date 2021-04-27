// Caret Start
import React, {
  useRef, useState, useContext, useEffect,
} from 'react';
import { Annotations } from '../../interfaces/Interfaces';
import Modal from '@material-ui/core/Modal';
import StateContext from '../../context/context';

function Annotation({
  id,
  name,
}: Annotations) {
  const [annotations, setAnnotations] = useState('');
  const [state, dispatch] = useContext(StateContext);
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
    const focusIndex = state.canvasFocus.componentId - 1;
    const childrenArray = state.components[focusIndex].children;

    if(value === '') {
      ref.current.style.background = '#3ec1ac';
      ref.current.id = 'btn' + event.target.id;
    } else {
      ref.current.style.background = '#cc99ff';
      ref.current.id = 'btn' + event.target.id;
      setAnnotations(value);

      let childEle = handleSaveAnno(childrenArray, event.target.id);
      
      if(childEle) {
        childEle.annotations = annotations;
        setState(childEle.annotations);
      }
    }
  }


  const handleSaveAnno = (array, id) => {
    for(let i = 0; i < array.length; i++) {
      if(array[i].childId === id) {
        return array[i];
      }
      if(array[i].children.length > 0) {
        return handleSaveAnno(array[i], id);
      }
    }
  }

  /*
  <span className='annotate-textarea-footer'>
        <button className='annotate-textarea-savebutton'>Save Notes</button>
  </span>
  */
  const body = (
    <div className='annotate-position'>
      <span className='annotate-textarea-header'>Notes for: {name} ( {id} )</span>
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
