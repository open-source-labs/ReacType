import React, { useMemo, useContext, useRef } from 'react';
import {
  State,
  Component,
  ChildElement,
  HTMLType
} from '../../interfaces/InterfacesNew';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';
import { stateContext } from '../../context/context';
import { combineStyles } from '../../helperFunctions/combineStyles';
import HTMLTypes from '../../HTMLTypes';
import globalDefaultStyle from '../../globalDefaultStyles';
import renderChildren from '../../helperFunctions/renderChildren';

function DirectChildHTMLNestable({
  childId,
  type,
  typeId,
  style,
  children,
  attributes
}: ChildElement) {
  const [state, dispatch] = useContext(stateContext);
  const ref = useRef(null);

  // find the HTML element corresponding with this instance of an HTML element
  // find the current component to render on the canvas
  const HTMLType: HTMLType = HTMLTypes.find(
    (type: HTMLType) => type.id === typeId
  );

  // hook that allows component to be draggable
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

  // both useDrop and useDrag used here to allow canvas components to be both a drop target and drag source
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.INSTANCE,
    // triggered on drop
    drop: (item: any, monitor: DropTargetMonitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      //   const hoverId = id;
      // updates state with new instance
      console.log('Item was dropped here: ', item);
    },
    collect: (monitor: any) => ({
      isOver: !!monitor.isOver({ shallow: true })
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

  // combine all styles so that higher priority style specifications overrule lower priority style specifications
  // priority order is 1) style directly set for this child (style), 2) style of the referenced HTML element, and 3) default styling
  const defaultNestableStyle = { ...globalDefaultStyle };
  defaultNestableStyle['backgroundColor'] = isOver ? 'yellow' : 'white';

  const combinedStyle = combineStyles(
    combineStyles(defaultNestableStyle, HTMLType.style),
    style
  );

  drag(drop(ref));
  return (
    <div onClick={() => onClickHandler(event)} style={combinedStyle} ref={ref}>
      {renderChildren(children)}
    </div>
  );
}

export default DirectChildHTMLNestable;
