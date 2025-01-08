/* eslint-disable max-len */
import React from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { ChildElement, MUIType } from '../../interfaces/Interfaces';
import { ItemTypes } from '../../constants/ItemTypes';
import { combineStyles } from '../../helperFunctions/combineStyles';
import globalDefaultStyle from '../../public/styles/globalDefaultStyles';
import DeleteButton from './DeleteButton';
import { changeFocus } from '../../redux/reducers/slice/appStateSlice';
import { RootState } from '../../redux/store';
import { emitEvent } from '../../helperFunctions/socket';

/**
 * A draggable component representing an instance of a Material-UI element. This component allows for interaction
 * within a design canvas environment, supporting actions such as focus change and element deletion.
 * The component is styled according to both inherited and directly provided styles, and it communicates with a collaborative
 * environment via socket connections when changes occur.
 *
 * @param {ChildElement} props - The properties passed to the component.
 * @param {number} props.childId - The unique identifier for this instance of the component.
 * @param {string} props.name - The display name of the component.
 * @param {string} props.type - The type of the component as defined in the application's constants.
 * @param {number} props.typeId - The unique identifier linking this instance to its base type information.
 * @param {React.CSSProperties} props.style - Custom styles applied to the component to override or complement default and type-specific styles.
 * @returns {JSX.Element} A draggable, interactable component displayed within the canvas.
 */
function DirectChildMUI({
  childId,
  name,
  type,
  typeId,
  style
}: ChildElement): JSX.Element {
  const state = useSelector((store: RootState) => store.appState);

  const roomCode = useSelector((store: RootState) => store.roomSlice.roomCode);

  const dispatch = useDispatch();

  // find the MUI element corresponding with this instance of an MUI element
  // find the current component to render on the canvas
  const MUIType: MUIType = state.MUITypes.find(
    (type: MUIType) => type.id === typeId
  );
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

  const changeFocusFunction = (componentId: number, childId: number | null) => {
    dispatch(changeFocus({ componentId, childId }));
    if (roomCode) {
      emitEvent('changeFocusAction', roomCode, {
        componentId: componentId,
        childId: childId
      });
    }
  };

  // onClickHandler is responsible for changing the focused component and child component
  function onClickHandler(event) {
    event.stopPropagation();
    changeFocusFunction(state.canvasFocus.componentId, childId);
  }

  // combine all styles so that higher priority style specifications overrule lower priority style specifications
  // priority order is 1) style directly set for this child (style), 2) style of the referenced HTML element, and 3) default styling
  const interactiveStyle = {
    border:
      state.canvasFocus.childId === childId
        ? '2px solid #f88e16'
        : '1px solid #31343A'
  };

  const combinedStyle = combineStyles(
    combineStyles(combineStyles(globalDefaultStyle, MUIType.style), style),
    interactiveStyle
  );

  return (
    <div
      onClick={onClickHandler}
      style={{ ...combinedStyle, backgroundColor: '#1E2024' }}
      ref={drag}
      id={`canv${childId}`}
    >
      <span>
        <strong style={{ color: 'white' }}>{MUIType.placeHolderShort}</strong>
        <DeleteButton
          id={childId}
          name={name[0].toLowerCase() + name.slice(1)}
          onClickHandler={onClickHandler}
        />
      </span>
    </div>
  );
}

export default DirectChildMUI;
