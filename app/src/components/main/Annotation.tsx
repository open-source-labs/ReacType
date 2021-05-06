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
  const [annotation, setAnnotations] = useState(annotations);
  const ref = useRef(null);
  // React hook setting the annotation button modal open/close state
  const [open, setOpen] = React.useState(false);
  const focusIndex = state.canvasFocus.componentId - 1;
  const childrenArray = state.components[focusIndex].children;
  
  // For showing the modal
  const handleOpen = () => {
    setOpen(true);
  };
  
  // For closing the modal
  const handleClose = (event) => {
    const annoId = Number(event.target.ownerDocument.activeElement.lastChild.id);
    const childEle = handleFindAnno(childrenArray, annoId);
    // console.log('annoId', annoId);
    // console.log('childrenArray????', childrenArray);
    // console.log('childElement we are saving state to', childEle);
    // console.log('annotation being saved to state', annotation);
    if (childEle && annotation !== annotations) {
      // console.log('annotation saved to state!!!!!!!!')
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
    setAnnotations(value);
    if (value === '' || value === undefined) {
      ref.current.style.background = '#3ec1ac';
    } else {
      ref.current.style.background = '#cc99ff';
    }
  }

  /**
   * This handler will find the specific anno for the corresponding component on the canvas in the childrenArray - 
   * where the canvas components are placed
   */
  const handleFindAnno = (array, id) => {
    let refElement = '';
    for (let i = 0; i < array.length; i++) {
      const currentElement = array[i];
      if (currentElement.childId === id) {
        return currentElement;
      }
      else if (currentElement.children.length > 0) {
        refElement = handleFindAnno(currentElement.children, id);
        if (refElement !== '') return refElement;
      }
    }
    return refElement;
  };

  const annoRefresh = (array) => {
    for (const element of array) {
      if (element.hasOwnProperty(annotations)) {
        console.log('Somthing here', ref);
      }
      if (element.children.length > 0) return annoRefresh(element.children);
    }
  };

  /**
   * This useEffect allows the annotations to remain persistent when changing between root level components on the right panel
   */
  useEffect(() => {
    annoRefresh(childrenArray);
  }, [state.canvasFocus]);

  const body = (
    <div className='annotate-position'>
      <span className='annotate-textarea-header'>Notes for: {name} ( {id} )</span>
      <textarea className='annotate-textarea' id={id.toString()} onChange={handleAnnoChange}>{annotations}</textarea>
    </div>
  )

  return (
    <div style={{padding: '1px', float: 'right'}}>
      <button className='annotate-button-empty' id={"btn" + id} onClick={() => handleOpen()} ref={ref}>Notes</button>
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
