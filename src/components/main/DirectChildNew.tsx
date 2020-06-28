import React, { useMemo, useContext, useRef } from 'react';
import { State, Component, ChildElement } from '../../interfaces/InterfacesNew';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';
import { stateContext } from '../../context/context';

// render a direct child - either a component or standard HTML element
// direct children are draggable and clickable
const renderDirectChild = () => {
  // if type is component, then render the component
  // if type is a
};

// render an HTML element that is both draggable and dropable
const renderNestableDirectChild = () => {};

function CanvasDirectChild({ childId, type, typeId, style }: ChildElement) {
  // changes focus of the canvas to a new component / child
  const [state, dispatch] = useContext(stateContext);
  const ref = useRef(null);

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.INSTANCE,
    // triggered on drop
    drop: (item: any, monitor: DropTargetMonitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      const hoverId = childId;
      // updates state with new instance
      // setContext(updateInstance(hoverId, item, context, pageId));
      console.log('successful drop !');
    },
    collect: (monitor: any) => ({
      isOver: !!monitor.isOver({ shallow: true })
    })
  });

  const [{ isDragging }, drag] = useDrag({
    // setting item attributes to be referenced when updating state with new instance of dragged item
    item: {
      type: ItemTypes.INSTANCE,
      newInstance: false,
      id: childId
    },
    // canDrag: !props.children.length,
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging()
    })
  });

  const changeFocus = (componentId: number, childId: number | null) => {
    dispatch({ type: 'CHANGE FOCUS', payload: { componentId, childId } });
  };

  // onClickHandler is responsible for changing the focus of the "focused" component to be the canvas when the canvas is clicked
  // TODO: stopPropogation is returning a CORS error
  function onClickHandler(event) {
    // console.log(event);
    // event.stopPropogation();

    console.log('You have clicked a DIRECT CHILD COMPONENT: ', childId);
    // keep the component focus the same as the current state, but update the child focus to null
    // a "null" value for the child component signifies that we're solely focusing on the parent component
    // changeFocus(state.canvasFocus.componentId, childId);
  }

  const defaultStyle = {
    // backgroundColor: isOver ? 'lightyellow' : 'white',
    border: '2px Solid black'
    // borderStyle: isOver ? 'dotted' : 'solid'
  };

  drag(drop(ref));
  return (
    <div onClick={() => onClickHandler(event)} style={defaultStyle} ref={ref}>
      {type}
    </div>
  );
}

// function CanvasDirectChild() {
//   return <div>Hello</div>;
// }

export default CanvasDirectChild;
