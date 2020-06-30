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
import HTMLTypes from '../../context/HTMLTypes';
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
      childId: childId,
      instanceType: type,
      instanceTypeId: typeId,
      style: style,
      attributes: attributes,
      children: children
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
      // if item dropped is going to be a new instance (i.e. it came from the left panel), then create a new child component
      if (item.newInstance) {
        addChild(item.instanceType, item.instanceTypeId, childId);
      }
      // if item is not a new instance, change position of element dragged inside div so that the div is the new parent
      else {
        changePosition(
          item.instanceType,
          item.instanceTypeId,
          item.childId,
          childId,
          item.style,
          item.attributes
        );
      }
    },
    collect: (monitor: any) => ({
      isOver: !!monitor.isOver({ shallow: true })
    })
  });

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

  // function to change position of element dragged inside div, so that the div is the new parent
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
  defaultNestableStyle['backgroundColor'] = isOver ? 'yellow' : 'white';

  const combinedStyle = combineStyles(
    combineStyles(defaultNestableStyle, HTMLType.style),
    style
  );

  drag(drop(ref));
  return (
    <div onClick={onClickHandler} style={combinedStyle} ref={ref}>
      {renderChildren(children)}
    </div>
  );
}

export default DirectChildHTMLNestable;
