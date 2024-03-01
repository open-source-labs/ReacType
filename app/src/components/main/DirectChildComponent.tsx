import React from 'react';
import { Component, ChildElement } from '../../interfaces/Interfaces';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';
import DeleteButton from './DeleteButton';
import { combineStyles } from '../../helperFunctions/combineStyles';
import globalDefaultStyle from '../../public/styles/globalDefaultStyles';
import { useDispatch, useSelector } from 'react-redux';
import { changeFocus } from '../../redux/reducers/slice/appStateSlice';
import { RootState } from '../../redux/store';
import { emitEvent } from '../../helperFunctions/socket';

function DirectChildComponent({ childId, type, typeId, name }: ChildElement) {
  const state = useSelector((store: RootState) => store.appState);
  const roomCode = useSelector((store: RootState) => store.roomSlice.roomCode);

  const dispatch = useDispatch();

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
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  });
  const changeFocusFunction = (componentId: number, childId: number | null) => {
    dispatch(changeFocus({ componentId, childId }));
    if (roomCode) {
      emitEvent('changeFocusAction', roomCode, {
        componentId: componentId,
        childId: childId
      });
      // console.log('emit focus event from DirectChildComponent');
    }
  };

  // onClickHandler is responsible for changing the focused component and child component
  function onClickHandler(event) {
    event.stopPropagation();
    changeFocusFunction(state.canvasFocus.componentId, childId);
  }
  // combine all styles so that higher priority style specifications overrule lower priority style specifications
  // priority order is 1) style directly set for this child (style), 2) style of the referenced component, and 3) default styling
  const interactiveStyle = {
    border:
      state.canvasFocus.childId === childId
        ? '3px solid #0671e3'
        : '1px Solid grey',
    boxShadow:
      state.canvasFocus.childId === childId ? '1px 1px 3px #a7cced' : ''
  };

  const combinedStyle = combineStyles(
    combineStyles(globalDefaultStyle, referencedComponent.style),
    interactiveStyle
  );
  // Renders name and not children of subcomponents to clean up Canvas view when dragging components
  // into the main canvas.  To render html elements on canvas, import and invoke renderChildren
  return (
    <div onClick={onClickHandler} style={combinedStyle} ref={drag}>
      <span>
        {/* render name and delete button X */}
        <strong style={{ color: 'white' }}>{name}</strong>
        <DeleteButton id={childId} name={name} />
      </span>
    </div>
  );
}

export default DirectChildComponent;
