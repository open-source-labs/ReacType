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
  annotations,
}: Annotations) {
  const [state, dispatch] = useContext(StateContext);
  const [annotation, setAnnotations] = useState('');
  const ref = useRef(null);
  // React hook setting the annotation button modal open/close state
  const [open, setOpen] = React.useState(false);
  const focusIndex = state.canvasFocus.componentId - 1;
  const childrenArray = state.components[focusIndex].children;
  
  // For showing the modal
  const handleOpen = (id) => {
    const childEle = handleFindAnno(childrenArray, id);
    setOpen(true);
  };

  // For closing the modal
  const handleClose = (id) => {
    const focusIndex = state.canvasFocus.componentId - 1;
    const childrenArray = state.components[focusIndex].children;
    const childEle = handleFindAnno(childrenArray, id);
    
    if(childEle) {
      childEle.annotations = annotation;
    }

    setOpen(false);
  };

  /**
   * Handles when text exists in the textarea of the modal. 
   * If text exists/does not exist, corresponding button changes colors.
   */ 
  const handleAnnoChange = (event) => {
    const { value } = event.target;

    if(value === '' || value === undefined) {
      ref.current.style.background = '#3ec1ac';
      ref.current.id = 'btn' + event.target.id;
      setAnnotations(value);
    } else {
      ref.current.style.background = '#cc99ff';
      ref.current.id = 'btn' + event.target.id;
      setAnnotations(value);
    }
  }

  /**
   * This handler will find the specific anno for the corresponding component on the canvas in the childrenArray - 
   * where the canvas components are placed
   */
  const handleFindAnno = (array, id) => {
    for(let i = 0; i < array.length; i++) {
      if(array[i].childId === Number(id)) {
        return array[i];
      }

      if(array[i].children.length > 0) {
        return handleFindAnno(array[i], id);
      }
    }
  }

  /**
   * This useEffect allows the annotations to remain persistent when changing between root level components on the right panel
   */
  useEffect(() => {
    const event = {
      target : { value: handleFindAnno(childrenArray, id).annotations},
      id : id,
    }

    handleAnnoChange(event);
  }, [state.canvasFocus])

  const body = (
    <div className='annotate-position'>
      <span className='annotate-textarea-header'>Notes for: {name} ( {id} )</span>
      <textarea className='annotate-textarea' id={id.toString()} onChange={handleAnnoChange}>{handleFindAnno(childrenArray, id).annotations}</textarea>
    </div>
  )

  return (
    <div style={{padding: '1px', float: 'right'}}>
      <button className='annotate-button-empty' id={"btn" + id} onClick={() => handleOpen(id)} ref={ref}>Notes</button>
      <Modal 
        open={open}
        onClose={() => handleClose(id)}
        keepMounted={true}
      >
        {body}
      </Modal>
    </div>
  );
}

export default Annotation;
// Caret End
