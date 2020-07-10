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
import globalDefaultStyle from '../../globalDefaultStyles';
import { blue } from '@material-ui/core/colors';

function RouteLink({ childId, type, typeId, style, attributes }: ChildElement) {
  const [state, dispatch] = useContext(stateContext);
  const ref = useRef(null);

  // find the name of the Component corresponding with this link
  const routeName: string = state.components.find(
    (comp: Component) => comp.id === typeId
  ).name;

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
      children: []
    },
    // canDrag: !props.children.length,
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging()
    })
  });

  const changeFocus = (componentId: number, childId: number | null) => {
    dispatch({ type: 'CHANGE FOCUS', payload: { componentId, childId } });
  };

  // onClickHandler is responsible for changing the focused component and child component
  function onClickHandlerFocus(event) {
    event.stopPropagation();
    changeFocus(state.canvasFocus.componentId, childId);
  }

  //   the route handler will change the focus of the canvas to the component referenced in the route link when the text is selected
  function onClickHandlerRoute(event) {
    event.stopPropagation();
    changeFocus(typeId, null);
  }

  // combine all styles so that higher priority style specifications overrule lower priority style specifications
  // priority order is 1) style directly set for this child (style), 2) style for the routeLink component, and 3) default styling
  const routeStyle = {
    color: 'blue'
  };

  const interactiveStyle = {
    border:
      state.canvasFocus.childId === childId
        ? '3px solid rgb(11,212,112)'
        : '1px Solid grey',
    boxShadow:
      state.canvasFocus.childId === childId ? '1px 1px 3px rgb(11,212,112)' : ''
  };
  const combinedStyle = combineStyles(
    combineStyles(combineStyles(globalDefaultStyle, routeStyle), style),
    interactiveStyle
  );

  return (
    <div onClick={onClickHandlerFocus} style={combinedStyle} ref={drag}>
      <div onClick={onClickHandlerRoute}>{routeName}</div>
    </div>
  );
}

export default RouteLink;
