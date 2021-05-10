import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';
import StateContext from '../../context/context';
import { Component, DragItem } from '../../interfaces/Interfaces';
import { combineStyles } from '../../helperFunctions/combineStyles';
import renderChildren from '../../helperFunctions/renderChildren';
// Caret start
import Arrow from './Arrow';

function Canvas() {
  const [state, dispatch] = useContext(StateContext);
  // Caret start
  Arrow.deleteLines();
  // find the current component to render on the canvas
  const currentComponent: Component = state.components.find(
    (elem: Component) => elem.id === state.canvasFocus.componentId
    );
    
    // changes focus of the canvas to a new component / child
    const changeFocus = (componentId?: number, childId?: number | null) => {
      dispatch({ type: 'CHANGE FOCUS', payload: { componentId, childId } });
    };
    // onClickHandler is responsible for changing the focused component and child component
    function onClickHandler(event) {
      event.stopPropagation();
      // note: a null value for the child id means that we are focusing on the top-level component rather than any child
      changeFocus(state.canvasFocus.componentId, null);
    };
    
    // stores a snapshot of state into the past array for UNDO. snapShotFunc is also invoked for nestable elements in DirectChildHTMLNestable.tsx
    const snapShotFunc = () => {
      // make a deep clone of state
        const deepCopiedState = JSON.parse(JSON.stringify(state));
        const focusIndex = state.canvasFocus.componentId - 1;
        //pushes the last user action on the canvas into the past array of Component
        state.components[focusIndex].past.push(deepCopiedState.components[focusIndex].children);
    };

  // This hook will allow the user to drag items from the left panel on to the canvas
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.INSTANCE,
    drop: (item: DragItem, monitor: DropTargetMonitor) => {
      const didDrop = monitor.didDrop();
      // takes a snapshot of state to be used in UNDO and REDO cases
      snapShotFunc();
      // returns false for direct drop target
      if (didDrop) {
        return;
      }
      // if item dropped is going to be a new instance (i.e. it came from the left panel), then create a new child component
      if (item.newInstance) {
        dispatch({
          type: 'ADD CHILD',
          payload: {
            type: item.instanceType,
            typeId: item.instanceTypeId,
            childId: null
          }
        });
      }
      // Caret Start - This code is never used. Adding a new child element to an existing element
      // or moving existing element to nest in another element is handled by DirectChildHTMLNestable
      //
      //if item is not a new instance, change position of element dragged inside div so that the div is the new parent
      // else {
      //   console.log("Changed Position, this is not doing shit");
      //   dispatch({
      //     type: 'CHANGE POSITION',
      //     payload: {
      //       // name: item.name,
      //       currentChildId: item.childId,
      //       newParentChildId: null
      //     }
      //   });
      // }
      // Caret End
    },
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  });

  // Styling for Canvas
  const defaultCanvasStyle = {
    width: '100%',
    minHeight: '100%',
    backgroundColor: isOver ? 'lightyellow' : '#F5F5F5',
    backgroundImage: "url('https://www.transparenttextures.com/patterns/diagonal-noise.png')",
    border: '1px solid #FBFBF2',
    borderStyle: isOver ? 'dotted' : 'solid'
  };
  // Combine the default styles of the canvas with the custom styles set by the user for that component
  // The render children function renders all direct children of a given component
  // Direct children are draggable/clickable
  const canvasStyle = combineStyles(defaultCanvasStyle, currentComponent.style);
  return (
    <div ref={drop} style={canvasStyle} onClick={onClickHandler}>
      {/* currentComponent is the selected component on Left Panel (eg: App or Index with green dot to the left)  */}
      {renderChildren(currentComponent.children)}
    </div>
  );
}

export default Canvas;
