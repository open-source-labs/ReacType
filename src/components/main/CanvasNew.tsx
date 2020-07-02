import React, { useMemo, useContext } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';
import { stateContext } from '../../context/context';
import { State, Component, ChildElement } from '../../interfaces/InterfacesNew';
import { combineStyles } from '../../helperFunctions/combineStyles';
import renderChildren from '../../helperFunctions/renderChildren';

function Canvas() {
  // TODO: figure out how to set types on destructured array
  const [state, dispatch] = useContext(stateContext);
  console.log('state is ', state);
  // find the current component to render on the canvas
  const currentComponent: Component = state.components.find(
    (elem: Component) => elem.id === state.canvasFocus.componentId
  );

  // function to add a new child to the canvas
  const addChild = (
    instanceType: string,
    instanceTypeId: number,
    childId: number
  ) => {
    dispatch({
      type: 'ADD CHILD',
      payload: { type: instanceType, typeId: instanceTypeId, childId: childId }
    });
  };

  // changes focus of the canvas to a new component / child
  const changeFocus = (componentId: number, childId: number | null) => {
    dispatch({ type: 'CHANGE FOCUS', payload: { componentId, childId } });
  };

  // function to change position of element dragged inside div, so that the canvas is the new parent
  const changePosition = (
    instanceType: string,
    instanceTypeId: number,
    currentChildId: number,
    newParentChildId: number | null,
    style: object,
    attributes: object
  ) => {
    dispatch({
      type: 'CHANGE POSITION',
      payload: {
        type: instanceType,
        typeId: instanceTypeId,
        currentChildId: currentChildId,
        newParentChildId: newParentChildId,
        style: style,
        attributes: attributes
      }
    });
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
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop(); // returns false for direct drop target
      if (didDrop) {
        return;
      }
      // if item dropped is going to be a new instance (i.e. it came from the left panel), then create a new child component
      if (item.newInstance) {
        addChild(item.instanceType, item.instanceTypeId, null);
      }
      // if item is not a new instance, change position of element dragged inside div so that the div is the new parent
      else {
        changePosition(
          item.instanceType,
          item.instanceTypeId,
          item.childId,
          null,
          item.style,
          item.attributes
        );
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
  const canvasStyle = combineStyles(defaultCanvasStyle, currentComponent.style);
  return (
    <div ref={drop} style={canvasStyle} onClick={onClickHandler}>
      {renderChildren(currentComponent.children)}
    </div>
  );
}

export default Canvas;



