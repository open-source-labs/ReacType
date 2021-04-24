import React, { useContext, useEffect, useRef } from 'react';
import { ChildElement, HTMLType } from '../../interfaces/Interfaces';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';
import StateContext from '../../context/context';
import { combineStyles } from '../../helperFunctions/combineStyles';
import globalDefaultStyle from '../../public/styles/globalDefaultStyles';
import renderChildren from '../../helperFunctions/renderChildren';
import Modal from '@material-ui/core/Modal';
import Annotation from './Annotation'
// Caret
import { makeStyles } from '@material-ui/core';
// Caret
import TextField from '@material-ui/core/TextField';
import uniqid from 'uniqid';

function DirectChildHTMLNestable({
  childId,
  type,
  typeId,
  style,
  children,
  name,
}: ChildElement) {
  const [state, dispatch] = useContext(StateContext);
  const ref = useRef(null);

// takes a snapshot of state to be used in UNDO and REDO cases.  snapShotFunc is also invoked in Canvas.tsx
const snapShotFunc = () => {
  //makes a deep clone of state
  const deepCopiedState = JSON.parse(JSON.stringify(state));
  const focusIndex = state.canvasFocus.componentId - 1;
  //pushes the last user action on the canvas into the past array of Component
  state.components[focusIndex].past.push(deepCopiedState.components[focusIndex].children);
};

  // find the HTML element corresponding with this instance of an HTML element
  // find the current component to render on the canvas
  const HTMLType: HTMLType = state.HTMLTypes.find(
    (type: HTMLType) => type.id === typeId
  );

  // hook that allows component to be draggable
  const [{ isDragging }, drag] = useDrag({
    // setting item attributes to be referenced when updating state with new instance of dragged item
    item: {
      type: ItemTypes.INSTANCE,
      newInstance: false,
      childId: childId,
      instanceType: type,
      instanceTypeId: typeId,
      name: name //added code <--
    },
    canDrag: HTMLType.id !== 1000, // dragging not permitted if element is separator
    collect: (monitor: any) => {
      return {
        isDragging: !!monitor.isDragging()
      };
    }
  });

  // both useDrop and useDrag used here to allow canvas components to be both a drop target and drag source
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.INSTANCE,
    // triggered on drop
    drop: (item: any, monitor: DropTargetMonitor) => {
      const didDrop = monitor.didDrop();
      // takes a snapshot of state to be used in UNDO and REDO cases
      snapShotFunc();
      if (didDrop) {
        return;
      }
      // updates state with new instance
      // if item dropped is going to be a new instance (i.e. it came from the left panel), then create a new child component
      if (item.newInstance) {
        dispatch({
          type: 'ADD CHILD',
          payload: {
            type: item.instanceType,
            typeId: item.instanceTypeId,
            childId: childId,
          }
        });
      }
      // if item is not a new instance, change position of element dragged inside div so that the div is the new parent
      else {
        dispatch({
          type: 'CHANGE POSITION',
          payload: {
            currentChildId: item.childId,
            newParentChildId: childId,
          }
        });
      }
    },
    
    collect: (monitor: any) => {
      return {
        isOver: !!monitor.isOver({ shallow: true })
      };
    }
  });

  const changeFocus = (componentId: number, childId: number | null) => {
    dispatch({ type: 'CHANGE FOCUS', payload: { componentId, childId } });
  };

  // onClickHandler is responsible for changing the focused component and child component
  function onClickHandler(event) {
    event.stopPropagation();
    changeFocus(state.canvasFocus.componentId, childId);
  }

  // Caret Start
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
  /*
  const annotateOpen = (id) => {
    let annotateTextArea = document.getElementById("txt" + id);
    console.log(annotateTextArea);
    console.log('*********')
    console.log("USING ID " , id);
    console.log("TEXT ID HERE: ", "txt" + id);
    
    annotateTextArea.addEventListener("change", function(event) {
      let annotateText = (this as HTMLInputElement).value
      console.log(annotateText)
      if(annotateText === '') {
        document.getElementById("btn" + id).style.background = '#cc99ff';
        document.getElementById("btn" + id).id = 'btn' + id;
      } else {
        document.getElementById("btn" + id).id = 'btn' + id;
        document.getElementById("btn" + id).style.background = '#3ec1ac';
      }
    });
  }
  */
  // Caret End

  // combine all styles so that higher priority style specifications overrule lower priority style specifications
  // priority order is 1) style directly set for this child (style), 2) style of the referenced HTML element, and 3) default styling
  const defaultNestableStyle = { ...globalDefaultStyle };
  const interactiveStyle = {
    border:
      state.canvasFocus.childId === childId
        ? '1px solid #186BB4'
        : '1px solid grey',
  };

  defaultNestableStyle['backgroundColor'] = isOver ? 'yellow' : 'rgba(0, 0, 255, 0.0)';

  const combinedStyle = combineStyles(
    combineStyles(combineStyles(defaultNestableStyle, HTMLType.style), style),
    interactiveStyle
  );
  //<textarea className='annotate-textarea' id={state.canvasFocus.childId}></textarea>
  //<button className='annotate-button-empty' onClick={() => annotateOpen(state.canvasFocus.childId)}  id={state.canvasFocus.childId + 1000}>DIRECT CHILD HTML NESTABLE HERE</button>
  
  /*
        <button className='annotate-button-empty' id={"btn" + childId} onClick={() => handleAnnoOpen(childId)}>DIRECT CHILD HTML NESTABLE HERE</button>
      <Modal 
        open={open}
        onClose={handleClose}
        keepMounted={true}
      >
        <textarea className='annotate-textarea' id={state.canvasFocus.childId} onChange={handleAnnoChange}></textarea>
      </Modal>
  */
  
  
  drag(drop(ref));
  return (
    <div onClick={onClickHandler} style={combinedStyle} ref={ref}>
      {HTMLType.placeHolderShort}
      {renderChildren(children)}
      {/* Caret start */}
      <Annotation
        childId={childId}
        typeId={typeId}
        type={type}
        name={name}
        style={style}
      >

      </Annotation>
    
      {/* Caret end */}
    </div>
  );
}

export default DirectChildHTMLNestable;
