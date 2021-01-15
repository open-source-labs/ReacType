import React, { useContext, useRef } from 'react';
import { ChildElement, HTMLType } from '../../interfaces/Interfaces';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';
import StateContext from '../../context/context';
import { combineStyles } from '../../helperFunctions/combineStyles';
import globalDefaultStyle from '../../public/styles/globalDefaultStyles';
import renderChildren from '../../helperFunctions/renderChildren';
import initialState from '../../context/initialState'
const {separator} = initialState;
function DirectChildHTMLNestable({
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
  const [{ isDragging }, drag] = useDrag({
    // setting item attributes to be referenced when updating state with new instance of dragged item
    item: {
      type: ItemTypes.INSTANCE,
      newInstance: false,
      childId: childId,
      instanceType: type,
      instanceTypeId: typeId
    },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging()
    })
  });

  // both useDrop and useDrag used here to allow canvas components to be both a drop target and drag source
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.INSTANCE,
    // triggered on drop
    drop: (item: any, monitor: DropTargetMonitor) => {
      const didDrop = monitor.didDrop();
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
            childId: childId
          }
        });
      }
      // if item is not a new instance, change position of element dragged inside div so that the div is the new parent
      else {
        dispatch({
          type: 'CHANGE POSITION',
          payload: {
            currentChildId: item.childId,
            newParentChildId: childId
          }
        });
      }
    },
    collect: (monitor: any) => {
      console.log('monitor', monitor)
      return ({
      isOver: !!monitor.isOver({ shallow: true })
    })}
  });

  const changeFocus = (componentId: number, childId: number | null) => {
    dispatch({ type: 'CHANGE FOCUS', payload: { componentId, childId } });
  };

  // onClickHandler is responsible for changing the focused component and child component
  function onClickHandler(event) {
    event.stopPropagation();
    changeFocus(state.canvasFocus.componentId, childId);
  }

  // combine all styles so that higher priority style specifications overrule lower priority style specifications
  // priority order is 1) style directly set for this child (style), 2) style of the referenced HTML element, and 3) default styling
  const defaultNestableStyle = { ...globalDefaultStyle };
  const interactiveStyle = {
    border:
      state.canvasFocus.childId === childId
        ? '3px solid rgb(11,212,112)'
        : '1px Solid gray', 
    boxShadow:
      state.canvasFocus.childId === childId ? '1px 1px 3px rgb(11,212,112)' : ''
  };

  defaultNestableStyle['backgroundColor'] = isOver ? 'yellow' : 'white';
  
  const combinedStyle = combineStyles(
    combineStyles(combineStyles(defaultNestableStyle, HTMLType.style), style),
    interactiveStyle
  );

  drag(drop(ref));
  return (
    <div onClick={onClickHandler} style={combinedStyle} ref={ref}>
      {renderChildren(children)}
    </div>
  );
}

export default DirectChildHTMLNestable;
