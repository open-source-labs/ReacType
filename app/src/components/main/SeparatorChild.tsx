import React, { useRef } from 'react';
import {
  ChildElement,
  HTMLType,
  MUIType,
  DragItem
} from '../../interfaces/Interfaces';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';
import { combineStyles } from '../../helperFunctions/combineStyles';
import globalDefaultStyle from '../../public/styles/globalDefaultStyles';
import renderChildren from '../../helperFunctions/renderChildren';
import validateNewParent from '../../helperFunctions/changePositionValidation';
import componentNest from '../../helperFunctions/componentNestValidation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  changeFocus,
  changePosition,
  addChild
} from '../../redux/reducers/slice/appStateSlice';
import { emitEvent } from '../../helperFunctions/socket';

/**
 * Renders a draggable and droppable separator child component within the canvas. 
 * This component is capable of being both a drag source and a drop target, allowing nested structures.
 * It also displays a dynamic style change when being hovered over to indicate it can accept drop items.
 * 
 * @param {Object} props - Component props.
 * @param {number} props.childId - Unique identifier for the child component.
 * @param {string} props.type - The type of the component (e.g., HTML element, custom component).
 * @param {number} props.typeId - Identifier for the specific type of component.
 * @param {Object} props.style - Custom styles applied to the separator.
 * @param {Object[]} props.children - Child components to be rendered within this separator.
 * @returns {JSX.Element} A styled, interactive separator that responds to drag and drop operations.
 */
function SeparatorChild({
  childId,
  type,
  typeId,
  style,
  children
}: ChildElement): JSX.Element {
  const state = useSelector((store: RootState) => store.appState);
  const contextParam = useSelector((store: RootState) => store.contextSlice);

  const roomCode = useSelector((store: RootState) => store.roomSlice.roomCode);

  const dispatch = useDispatch();
  const ref = useRef(null);

  // find the HTML element corresponding with this instance of an HTML element
  // find the current component to render on the canvas
  const HTMLType: HTMLType = state.HTMLTypes.find(
    (type: HTMLType) => type.id === typeId
  );

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
    canDrag: HTMLType.id !== 1000 || MUIType.id !== 1000, // dragging not permitted if element is separator
    collect: (monitor: any) => {
      return {
        isDragging: !!monitor.isDragging()
      };
    }
  });

  // both useDrop and useDrag used here to allow canvas components to be both a drop target and drag source
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.INSTANCE,
    // triggered on drop
    drop: (item: DragItem, monitor: DropTargetMonitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      // updates state with new instance
      // if item dropped is going to be a new instance (i.e. it came from the left panel), then create a new child component
      if (item.newInstance) {
        if (
          (item.instanceType === 'Component' &&
            componentNest(
              state.components[item.instanceTypeId - 1].children,
              childId
            )) ||
          item.instanceType !== 'Component'
        ) {
          dispatch(
            addChild({
              type: item.instanceType,
              typeId: item.instanceTypeId,
              childId: childId,
              contextParam: contextParam
            })
          );
          if (roomCode) {
            emitEvent('addChildAction', roomCode, {
              type: item.instanceType,
              typeId: item.instanceTypeId,
              childId: childId,
              contextParam: contextParam
            });
          }
        }
      }
      // if item is not a new instance, change position of element dragged inside separator so that separator is new parent (until replacement)
      else {
        // check to see if the selected child is trying to nest within itself
        if (validateNewParent(state, item.childId, childId) === true) {
          dispatch(
            changePosition({
              currentChildId: item.childId,
              newParentChildId: childId,
              contextParam: contextParam
            })
          );
          if (roomCode) {
            emitEvent('changePositionAction', roomCode, {
              currentChildId: item.childId,
              newParentChildId: childId,
              contextParam: contextParam
            });
          }
        }
      }
    },

    collect: (monitor: any) => {
      return {
        isOver: !!monitor.isOver({ shallow: true })
      };
    }
  });

  const changeFocusFunction = (componentId: number, childId: number | null) => {
    dispatch(changeFocus({ componentId, childId }));
  };

  // onClickHandler is responsible for changing the focused component and child component
  function onClickHandler(event) {
    event.stopPropagation();
    changeFocusFunction(state.canvasFocus.componentId, childId);
  }

  // combine all styles so that higher priority style specifications overrule lower priority style specifications
  // priority order is 1) style directly set for this child (style), 2) style of the referenced HTML element, and 3) default styling
  const defaultNestableStyle = { ...globalDefaultStyle };
  const separatorStyle = {
    padding: isOver ? '40px 10px' : '2px 10px',
    margin: '1px 10px',
    transition: 'padding 1s ease-out'
  };

  defaultNestableStyle['backgroundColor'] = isOver
    ? 'rgb(53, 78, 156)'
    : 'rgba(0, 0, 255, 0.0)';

  const combinedStyle = combineStyles(
    combineStyles(combineStyles(defaultNestableStyle, HTMLType.style), style),
    separatorStyle
  );

  drag(drop(ref));
  return (
    <div onClick={onClickHandler} style={combinedStyle} ref={ref}>
      {renderChildren(children)}
    </div>
  );
}

export default SeparatorChild;
