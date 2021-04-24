import React, { useContext, useRef } from 'react';
import { ChildElement, HTMLType } from '../../interfaces/Interfaces';
import { ItemTypes } from '../../constants/ItemTypes';
import StateContext from '../../context/context';
import { combineStyles } from '../../helperFunctions/combineStyles';
import globalDefaultStyle from '../../public/styles/globalDefaultStyles';
import Modal from '@material-ui/core/Modal';

function Annotation({
  childId,
  type,
  typeId,
  style,
  children
}: ChildElement) {
  const [state, dispatch] = useContext(StateContext);
  const ref = useRef(null);

  // find the HTML element corresponding with this instance of an HTML element
  // find the current component to render on the canvas
  const HTMLType: HTMLType = state.HTMLTypes.find(
    (type: HTMLType) => type.id === typeId
  );

  // hook that allows component to be draggable

  // combine all styles so that higher priority style specifications overrule lower priority style specifications
  // priority order is 1) style directly set for this child (style), 2) style of the referenced HTML element, and 3) default styling
  const defaultNestableStyle = { ...globalDefaultStyle };
  const separatorStyle = {
    padding: '5px 10px',
    margin: '1px 10px',
  };


  const combinedStyle = combineStyles(
    combineStyles(combineStyles(defaultNestableStyle, HTMLType.style), style),
    separatorStyle
  );

  const [open, setOpen] = React.useState(false);

  const handleAnnoOpen = (id) => {
    setOpen(true);
    //annotateOpen(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAnnoChange = (event) => {
    const { value } = event.target;

    console.log("ID ", event.target.id)
    console.log(event.target);
    if(value === '') {
      document.getElementById("btn" + event.target.id).style.background = '#3ec1ac';
      document.getElementById("btn" + event.target.id).id = 'btn' + event.target.id;
    } else {
      document.getElementById("btn" + event.target.id).style.background = '#cc99ff';
      document.getElementById("btn" + event.target.id).id = 'btn' + event.target.id;
    }
  }

  return (
    <div>
      {/* Caret start */}
      <button className='annotate-button-empty' id={"btn" + childId} onClick={() => handleAnnoOpen(childId)}>DIRECT CHILD HTML NESTABLE HERE</button>
      <Modal 
        open={open}
        onClose={handleClose}
        keepMounted={true}
      >
        <textarea className='annotate-textarea' id={state.canvasFocus.childId} onChange={handleAnnoChange}></textarea>
      </Modal>
      {/* Caret end */}
    </div>
  );
}

export default Annotation;
