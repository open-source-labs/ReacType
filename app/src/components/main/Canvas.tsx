import React, { useContext } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';
import StateContext from '../../context/context';
import { Component, DragItem } from '../../interfaces/Interfaces';
import { combineStyles } from '../../helperFunctions/combineStyles';
import renderChildren from '../../helperFunctions/renderChildren';

const findNestedChild = (curr, components) => {
  components.forEach((comp, i) => {
    comp.children.forEach(child => {
      if (child.name === curr.name) {};
    });
    if (comp.children.length !== 0) findNestedChild(curr, comp.children);
  });
};

function Canvas() {
  const [state, dispatch] = useContext(StateContext);
  // find the current component to render on the canvas
  const currentComponent: Component = state.components.find(
    (elem: Component) => elem.id === state.canvasFocus.componentId
  );

  findNestedChild(currentComponent, state.components);

  // changes focus of the canvas to a new component / child
  const changeFocus = (componentId: number, childId: number | null) => {
    dispatch({ type: 'CHANGE FOCUS', payload: { componentId, childId } });
  };

  // onClickHandler is responsible for changing the focused component and child component
  function onClickHandler(event) {
    event.stopPropagation();
    // note: a null value for the child id means that we are focusing on the top-level component rather than any child
    changeFocus(state.canvasFocus.componentId, null);
  }

  // This hook will allow the user to drag items from the left panel on to the canvas
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.INSTANCE,
    drop: (item: DragItem, monitor: DropTargetMonitor) => {
      const didDrop = monitor.didDrop(); // returns false for direct drop target
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
      // if item is not a new instance, change position of element dragged inside div so that the div is the new parent
      else {
        dispatch({
          type: 'CHANGE POSITION',
          payload: {
            currentChildId: item.childId,
            newParentChildId: null
          }
        });
      }
    },
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  });

  const defaultCanvasStyle = {
    width: '100%',
    minHeight: '100%',
    backgroundColor: isOver ? 'lightyellow' : 'white',
    border: '3px solid #01d46d',
    borderStyle: isOver ? 'dotted' : 'solid'
  };

  // Combine the default styles of the canvas with the custom styles set by the user for that component
  // The render children function renders all direct children of a given component
  // Direct children are draggable/clickable

  const canvasStyle = combineStyles(defaultCanvasStyle, currentComponent.style);
  return (
    <div ref={drop} style={canvasStyle} onClick={onClickHandler}>
      {renderChildren(currentComponent.children)}
    </div>
  );
}

export default Canvas;
