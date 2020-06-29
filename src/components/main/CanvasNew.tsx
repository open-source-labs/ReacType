import React, { useMemo, useContext } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';
import { stateContext } from '../../context/context';
import { updateInstance } from '../../helperFunctions/instances';
import CanvasComponent from './CanvasComponentNew';
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
  const addChild = (instanceType: string, instanceTypeId: number) => {
    dispatch({
      type: 'ADD CHILD',
      payload: { type: instanceType, typeId: instanceTypeId }
    });
  };

  // changes focus of the canvas to a new component / child
  const changeFocus = (componentId: number, childId: number | null) => {
    dispatch({ type: 'CHANGE FOCUS', payload: { componentId, childId } });
  };

  // onClickHandler is responsible for changing the focus of the "focused" component to be the canvas when the canvas is clicked
  const onClickHandler = () => {
    console.log('You have clicked the CANVAS!');
    // keep the component focus the same as the current state, but update the child focus to null
    // a "null" value for the child component signifies that we're solely focusing on the parent component
    changeFocus(state.canvasFocus.componentId, null);
  };

  // This hook will allow the user to drag items from the left panel on to the canvas
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.INSTANCE,
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop(); // returns false for direct drop target
      if (didDrop) {
        return;
      }
      console.log('Item dropped on the canvas: ', item);
      // if item dropped is going to be a new instance (i.e. it came from the left panel), then create a new child component
      if (item.newInstance) addChild(item.instanceType, item.instanceId);
    },
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  });

  const defaultCanvasStyle = {
    width: '90%',
    height: '100%',
    backgroundColor: isOver ? 'lightyellow' : 'white',
    border: '2px Solid black',
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
