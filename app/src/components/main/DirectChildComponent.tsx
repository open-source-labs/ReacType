import React, {  useContext, } from 'react';
import {
  Component,
  ChildElement,
  HTMLType
} from '../../interfaces/Interfaces';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';
import StateContext from '../../context/context';
import { combineStyles } from '../../helperFunctions/combineStyles';
import globalDefaultStyle from '../../public/styles/globalDefaultStyles';
import renderChildren from '../../helperFunctions/renderChildren'

function DirectChildComponent({ childId, type, typeId, style }: ChildElement) {
  const [state, dispatch] = useContext(StateContext);

  // find the top-level component corresponding to this instance of the component
  // find the current component to render on the canvas

  const referencedComponent: Component = state.components.find(
    (elem: Component) => elem.id === typeId
  );

  const [{ isDragging }, drag] = useDrag({
    // setting item attributes to be referenced when updating state with new instance of dragged item
    item: {
      type: ItemTypes.INSTANCE,
      newInstance: false,
      childId: childId,
      instanceType: type,
      instanceTypeId: typeId
    },
    collect: monitor => ({
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
  // priority order is 1) style directly set for this child (style), 2) style of the referenced component, and 3) default styling
  const interactiveStyle = {
    border:
      state.canvasFocus.childId === childId
        ? '3px solid #186BB4'
        : '1px Solid grey',
    boxShadow:
      state.canvasFocus.childId === childId ? '1px 1px 3px #a7cced' : ''
  };

  const combinedStyle = combineStyles(
    combineStyles(
      combineStyles(globalDefaultStyle, referencedComponent.style),
      style
    ),
    interactiveStyle
  );

  return (
    <div
      onClick={onClickHandler}
      style={combinedStyle}
      ref={drag}
    >
      {renderChildren(referencedComponent.children)}
    </div>
  );
}

export default DirectChildComponent;
