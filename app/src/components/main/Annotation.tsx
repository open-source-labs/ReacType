import React, { useRef, useState, useContext, useEffect } from 'react';
import { Annotations } from '../../interfaces/Interfaces';
import Modal from '@material-ui/core/Modal';
import StateContext from '../../context/context';

function Annotation({ id, name, annotations }: Annotations) {
  const [state, dispatch] = useContext(StateContext);
  // const [annotation, setAnnotations] = useState(annotations);
  // React hook setting the annotation button modal open/close state
  // const [open, setOpen] = React.useState(false);
  // const ref = useRef(null);

  // focusIndex and childrenArray are used to find the array of all elements on the canvas
  const focusIndex = state.canvasFocus.componentId - 1;
  const childrenArray = state.components[focusIndex].children; //  ADDING SLICE HERE CAUSES STATE to NOT CHANGE...

  // ---------------------------------------------- NEW CODE for DELETE BUTTONS (start) ---------------------------------------
  const deleteHTMLtype = (id: number) => {
    dispatch({
      type: 'DELETE CHILD',
      payload: { id }
    });

    // console.log(id, childrenArray);
    // let arrIndex: number = -1;
    // let arrOfAllChildIDs: number[] = [];
    // recurseAllChildren(childrenArray);
    // function recurseAllChildren(childArray) {
    //   // console.log('Full Array: ', childArray, arrOfAllChildIDs);
    //   for (let index in childArray) {
    //     // console.log(index);
    //     if (childArray[index].children.length) {
    //       // console.log('In Recurse - non-endpoint: ', childArray[index].childId);
    //       arrOfAllChildIDs.push(childArray[index].childId); // Use this only to pull all non-endpoint childIds, document out breaks
    //       if (childArray[index].childId === id) {
    //         arrIndex = Number(index);
    //         // Remove BOTH element & preceding separator spacing objects from array if NOT nested
    //         childArray.splice(arrIndex - 1, 2);
    //         break;
    //       }
    //       recurseAllChildren(childArray[index].children);
    //     } else if (childArray[index].childId < 1000)
    //       // FILTER OUT separators...
    //       // console.log('In Recurse - endpoint: ', childArray[index].childId);
    //       arrOfAllChildIDs.push(childArray[index].childId); // Use this only to pull all endpoint childIds, document out breaks
    //     if (childArray[index].childId === id) {
    //       arrIndex = Number(index);
    //       // Remove BOTH element & preceding separator spacing objects from array if NOT nested
    //       childArray.splice(arrIndex - 1, 2);
    //       // console.log(index, arrIndex, 'ultimate', childArray[index]);
    //       break;
    //     }
    //   }
    // }
    // console.log(arrIndex);
    // console.log('arrOfAllChildIDs: ', arrOfAllChildIDs);
  };
  // ---------------------------------------------- NEW CODE for DELETE BUTTONS (end) ---------------------------------------

  // ---------------------------------------------- LEGACY CODE (start) ---------------------------------------
  // // For showing the modal
  // const handleOpen = () => {
  //   setOpen(true);
  // };
  // // For closing the modal and setting the global annotation value to the hook value
  // const handleClose = (id) => {
  //   const childEle = handleFindAnno(childrenArray, id);
  //   if (childEle) {
  //     // set global annotation value for this component to it's hook value
  //     childEle.annotations = annotation;
  //   }
  //   setOpen(false);
  // };
  // /**
  //  * Handles when text exists in the textarea of the modal.
  //  * If text exists/does not exist, corresponding button changes colors.
  //  * Sets hook value to what is contained in the textarea
  //  */
  // const handleAnnoChange = (event) => {
  //   const { value } = event.target;
  //   if (value === '' || value === undefined) {
  //     ref.current.style.background = '#0CD34C';
  //   } else {
  //     ref.current.style.background = '#D59DFF';
  //   }
  //   if (value != annotation) {
  //     setAnnotations(value);
  //   }
  // };
  // /**
  //  * This handler will find the specific anno for the corresponding component on the canvas in the childrenArray -
  //  * where the canvas components are placed
  //  */
  // const handleFindAnno = (array, id) => {
  //   for (let i = 0; i < array.length; i++) {
  //     const currentElement = array[i];
  //     if (currentElement.childId === id) {
  //       return currentElement;
  //       // finds nested element if nested within canvas
  //     } else if (currentElement.children.length > 0) {
  //       // temp is to prevent a return of empty string since canvas element should always exist and allows the
  //       // recursion to continue
  //       const temp = handleFindAnno(currentElement.children, id);
  //       if (temp != '') {
  //         return temp;
  //       }
  //     }
  //   }
  //   return '';
  // };
  // /**
  //  * This useEffect allows the annotations to remain persistent when changing between root level components on the right panel
  //  */
  // useEffect(() => {
  //   const event = {
  //     target: { value: annotation },
  //     id: id
  //   };
  //   handleAnnoChange(event);
  // }, []);

  // const body = (
  //   <div className="annotate-position">
  //     <span className="annotate-textarea-header">
  //       {' '}
  //       Notes for: {name} ( {id} )
  //     </span>
  //     <textarea
  //       className="annotate-textarea"
  //       id={id.toString()}
  //       onChange={handleAnnoChange}
  //     >
  //       {annotations}
  //     </textarea>
  //   </div>
  // );
  // ---------------------------------------------- LEGACY CODE (end) ---------------------------------------

  return (
    <div style={{ padding: '1px', float: 'right' }}>
      <button
        className="annotate-button-empty" // NOTE:  This class name no longer accurate
        id={'btn' + id}
        onClick={() => deleteHTMLtype(id)}
        // ref={ref}
      >
        x
      </button>
      {/* <Modal
        open={open}
        onClose={() => handleClose(id)}
        keepMounted={true}
      >
        {body}
      </Modal> */}
    </div>
  );
}

export default Annotation;
