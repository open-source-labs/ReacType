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
import IndirectChild from './IndirectChild';
import HTMLTypes from '../../context/HTMLTypes';
import globalDefaultStyle from '../../public/styles/globalDefaultStyles';

function DirectChildHTML({
  childId,
  type,
  typeId,
  style,
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
    },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging()
    })
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
  const interactiveStyle = {
    border:
      state.canvasFocus.childId === childId
        ? '3px solid rgb(11,212,112)'
        : '1px Solid grey',
    boxShadow:
      state.canvasFocus.childId === childId ? '1px 1px 3px rgb(11,212,112)' : ''
  };
  const combinedStyle = combineStyles(
    combineStyles(combineStyles(globalDefaultStyle, HTMLType.style), style),
    interactiveStyle
  );

  return (
    <div onClick={onClickHandler} style={combinedStyle} ref={drag}>
      {HTMLType.placeHolderShort}
    </div>
  );
}

export default DirectChildHTML;
