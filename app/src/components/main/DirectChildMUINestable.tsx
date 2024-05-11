import React, { useRef } from 'react';
import { ChildElement, MUIType } from '../../interfaces/Interfaces';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';
import { combineStyles } from '../../helperFunctions/combineStyles';
import globalDefaultStyle from '../../public/styles/globalDefaultStyles';
import renderChildren from '../../helperFunctions/renderChildren';
import DeleteButton from './DeleteButton';
import validateNewParent from '../../helperFunctions/changePositionValidation';
import componentNest from '../../helperFunctions/componentNestValidation';
import AddRoute from './AddRoute';
import AddLink from './AddLink';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { emitEvent } from '../../helperFunctions/socket';

import {
  changeFocus,
  changePosition,
  addChild,
  snapShotAction
} from '../../redux/reducers/slice/appStateSlice';

/**
 * Renders a Material-UI nestable component within the application's canvas. This component can be dragged and dropped
 * to reorder or nest within other components. It supports additional functionalities like adding routes or links
 * if applicable. It integrates deeply with the application's state management and real-time collaboration features.
 *
 * @param {Object} props - The component properties.
 * @param {number} props.childId - Unique identifier for the child component instance.
 * @param {string} props.type - Type of the child element, typically related to UI framework components.
 * @param {number} props.typeId - Identifier for the type, linking to specific functionality or styling.
 * @param {Object} props.style - Custom styles applied to the component instance.
 * @param {React.ReactNode} props.children - Nested child components or elements.
 * @param {string} props.name - Display name of the component, used for identification within the UI.
 * @param {Object} props.attributes - Additional attributes that might affect rendering or behavior, like links.
 * @returns {JSX.Element} A styled, interactive component that can be focused, rearranged, or nested within other components.
 */

function DirectChildMUINestable({
  childId,
  type,
  typeId,
  style,
  children,
  name,
  attributes
}: ChildElement): React.JSX.Element {
  const state = useSelector((store: RootState) => store.appState);
  const contextParam = useSelector((store: RootState) => store.contextSlice);

  const dispatch = useDispatch();
  const roomCode = useSelector((store: RootState) => store.roomSlice.roomCode);

  const ref = useRef(null);

  // takes a snapshot of state to be used in UNDO and REDO cases.  snapShotFunc is also invoked in Canvas.tsx
  const snapShotFunc = () => {
    //makes a deep clone of state
    const deepCopiedState = JSON.parse(JSON.stringify(state));
    const focusIndex = state.canvasFocus.componentId - 1;
    //pushes the last user action on the canvas into the past array of Component
    dispatch(
      snapShotAction({
        focusIndex: focusIndex,
        deepCopiedState: deepCopiedState
      })
    );
  };

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
      instanceTypeId: typeId,
      name: name
    },
    canDrag: MUIType.id !== 1000, // dragging not permitted if element is separator
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
    drop: (item: any, monitor: DropTargetMonitor) => {
      const didDrop = monitor.didDrop();
      // takes a snapshot of state to be used in UNDO and REDO cases
      snapShotFunc();
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

            // console.log(
            //   'emit addChildAction event is triggered in DirectChildMUINestable'
            // );
          }
        }
      }
      // if item is not a new instance, change position of element dragged inside div so that the div is the new parent
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

            // console.log(
            //   'emit changePosition event is triggered in DirectChildMUINestable'
            // );
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
    if (roomCode) {
      emitEvent('changeFocusAction', roomCode, {
        componentId: componentId,
        childId: childId
      });
      // console.log('emit focus event from DirectChildMUINestable');
    }
  };

  // onClickHandler is responsible for changing the focused component and child component
  function onClickHandler(event) {
    event.stopPropagation();
    changeFocusFunction(state.canvasFocus.componentId, childId);
  }

  // combine all styles so that higher priority style specifications overrule lower priority style specifications
  // priority order is 1) style directly set for this child (style), 2) style of the referenced MUI element, and 3) default styling
  const defaultNestableStyle = { ...globalDefaultStyle };
  const interactiveStyle = {
    border:
      state.canvasFocus.childId === childId
        ? '2px solid #0671e3'
        : '1px solid #31343A'
  };

  // interactive style to change color when nested element is hovered over
  if (isOver) defaultNestableStyle['#3c59ba'];
  defaultNestableStyle['backgroundColor'] = isOver
    ? '#3c59ba'
    : defaultNestableStyle['backgroundColor'];

  const combinedStyle = combineStyles(
    combineStyles(combineStyles(defaultNestableStyle, MUIType.style), style),
    interactiveStyle
  );

  drag(drop(ref));

  const routeButton = [];
  if (typeId === 17) {
    routeButton.push(<AddRoute id={childId} name={name} />);
  }
  if (typeId === 19) {
    routeButton.push(
      <AddLink
        id={childId}
        onClickHandler={onClickHandler}
        linkDisplayed={
          attributes && attributes.compLink ? `${attributes.compLink}` : null
        }
      />
    );
  }

  return (
    <div
      onClick={onClickHandler}
      style={{
        ...combinedStyle,
        backgroundColor: isOver ? '#3c59ba' : '#1E2024'
      }}
      ref={ref}
      id={`canv${childId}`}
    >
      <span>
        <strong style={{ color: 'white' }}>{MUIType.placeHolderShort}</strong>
        <strong style={{ color: '#0671e3' }}>
          {attributes && attributes.compLink ? ` ${attributes.compLink}` : ''}
        </strong>
        {routeButton}
        <DeleteButton
          id={childId}
          name={name}
          onClickHandler={onClickHandler}
        />
      </span>
      {renderChildren(children)}
    </div>
  );
}

export default DirectChildMUINestable;
