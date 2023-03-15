import React, { useContext } from 'react';
import { Component, ChildElement } from '../../interfaces/Interfaces';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';
import StateContext from '../../context/context';
import { combineStyles } from '../../helperFunctions/combineStyles';
import globalDefaultStyle from '../../public/styles/globalDefaultStyles';
import { useDispatch, useSelector } from 'react-redux';
import { changeFocus } from '../../redux/reducers/slice/appStateSlice';

function RouteLink({ childId, type, typeId, style }: ChildElement) {
  // const [state, dispatch] = useContext(StateContext);
  const state = useSelector(store => store.appState);
  const dispatch = useDispatch();

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
      instanceTypeId: typeId
    },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging()
    })
  });
  // const changeFocus = (componentId: number, childId: number | null) => {
  //   dispatch({ type: 'CHANGE FOCUS', payload: { componentId, childId } });
  // };
  // onClickHandler is responsible for changing the focused component and child component
  function onClickHandlerFocus(event) {
    event.stopPropagation();
    // changeFocus(state.canvasFocus.componentId, childId);
    dispatch(changeFocus({ componentId: state.canvasFocus.componentId, childId: state.canvasFocus.childId}));
  }
  //   the route handler will change the focus of the canvas to the component referenced in the route link when the text is selected
  function onClickHandlerRoute(event) {
    event.stopPropagation();
    // changeFocus(typeId, null);
    // dispatch(changeFocus({ componentId:typeId, childId: null}));
    dispatch(changeFocus(typeId));
  }
  // combine all styles so that higher priority style specifications overrule lower priority style specifications
  // priority order is 1) style directly set for this child (style), 2) style for the routeLink component, and 3) default styling
  const routeStyle = {
    color: 'blue'
  };
  const interactiveStyle = {
    border:
      state.canvasFocus.childId === childId
        ? '3px solid #a7cced'
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
