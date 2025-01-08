/* eslint-disable max-len */
import React from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Component, ChildElement } from '../../interfaces/Interfaces';
import { ItemTypes } from '../../constants/ItemTypes';
import { combineStyles } from '../../helperFunctions/combineStyles';
import globalDefaultStyle from '../../public/styles/globalDefaultStyles';
import { changeFocus } from '../../redux/reducers/slice/appStateSlice';
import { RootState } from '../../redux/store';

/**
 * Renders a RouteLink component that allows navigation within the application by changing the focus
 * to the component associated with the route. The component is draggable and interactive,
 * highlighting when focused.
 *
 * @param {Object} props - The component properties.
 * @param {number} props.childId - Unique identifier for the child component.
 * @param {string} props.type - The type of the component (always "RouteLink" here).
 * @param {number} props.typeId - Identifier for the type of the linked component.
 * @param {Object} props.style - Custom styles applied to the RouteLink.
 * @returns {JSX.Element} A styled, interactive RouteLink that changes the focus in the application canvas.
 */

function RouteLink({
  childId,
  type,
  typeId,
  style,
}: ChildElement): JSX.Element {
  const state = useSelector((store: RootState) => store.appState);
  const dispatch = useDispatch();

  // find the name of the Component corresponding with this link
  const routeName: string = state.components.find(
    (comp: Component) => comp.id === typeId,
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
    },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  const changeFocusFunction = (componentId: number, childId: number | null) => {
    dispatch(changeFocus({ componentId, childId }));
  };
  // onClickHandler is responsible for changing the focused component and child component
  function onClickHandlerFocus(event) {
    event.stopPropagation();
    changeFocusFunction(state.canvasFocus.componentId, childId);
  }
  //   the route handler will change the focus of the canvas to the component referenced in the route link when the text is selected
  function onClickHandlerRoute(event) {
    event.stopPropagation();
    changeFocusFunction(typeId, null);
  }
  // combine all styles so that higher priority style specifications overrule lower priority style specifications
  // priority order is 1) style directly set for this child (style), 2) style for the routeLink component, and 3) default styling
  const routeStyle = {
    color: 'blue',
  };
  const interactiveStyle = {
    border:
      state.canvasFocus.childId === childId
        ? '3px solid #a7cced'
        : '1px Solid grey',
    boxShadow:
      state.canvasFocus.childId === childId ? '1px 5px 3px rgb(11,212,112)' : '',
  };
  const combinedStyle = combineStyles(
    combineStyles(combineStyles(globalDefaultStyle, routeStyle), style),
    interactiveStyle,
  );
  return (
    <div onClick={onClickHandlerFocus} style={combinedStyle} ref={drag}>
      <div onClick={onClickHandlerRoute}>{routeName}</div>
    </div>
  );
}

export default RouteLink;
