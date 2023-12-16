import { Component, DragItem } from '../../interfaces/Interfaces';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import React, { useEffect, useState } from 'react';
import {
  addChild,
  changeFocus,
  snapShotAction
} from '../../redux/reducers/slice/appStateSlice';
import { useDispatch, useSelector } from 'react-redux';

import MouseMovement from './MouseMovement';

import Arrow from './Arrow';
import { ItemTypes } from '../../constants/ItemTypes';
import { RootState } from '../../redux/store';
import { combineStyles } from '../../helperFunctions/combineStyles';
import renderChildren from '../../helperFunctions/renderChildren';
import { emitEvent } from '../../helperFunctions/socket';

function Canvas(props: {}): JSX.Element {
  const state = useSelector((store: RootState) => store.appState);
  const contextParam = useSelector((store: RootState) => store.contextSlice);

  const roomCode = useSelector((store: RootState) => store.roomSlice.roomCode);
  // console.log('roomCode:', roomCode);
  // console.log('canavs is rendered');

  // find the current component based on the canvasFocus component ID in the state
  const currentComponent: Component = state.components.find(
    (elem: Component) => elem.id === state.canvasFocus.componentId
  );
  // console.log(' state.components:', state.components);
  // console.log('canvasFocus.componentId: ', state.canvasFocus.componentId);

  Arrow.deleteLines();

  const dispatch = useDispatch();
  // changes focus of the canvas to a new component / child
  const changeFocusFunction = (
    componentId?: number,
    childId?: number | null
  ) => {
    dispatch(changeFocus({ componentId, childId }));
  };

  // onClickHandler is responsible for changing the focused component and child component
  function onClickHandler(event: React.MouseEvent) {
    event.stopPropagation();
    changeFocusFunction(state.canvasFocus.componentId, null);
  }

  // stores a snapshot of state into the past array for UNDO. snapShotFunc is also invoked for nestable elements in DirectChildHTMLNestable.tsx
  const snapShotFunc = () => {
    // make a deep clone of state
    const deepCopiedState = JSON.parse(JSON.stringify(state));
    const focusIndex = state.canvasFocus.componentId - 1;
    dispatch(
      snapShotAction({
        focusIndex: focusIndex,
        deepCopiedState: deepCopiedState
      })
    );
  };

  // This hook will allow the user to drag items from the left panel on to the canvas
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.INSTANCE,
    drop: (item: DragItem, monitor: DropTargetMonitor) => {
      const didDrop = monitor.didDrop();
      // takes a snapshot of state to be used in UNDO and REDO cases
      snapShotFunc();
      // returns false for direct drop target
      if (didDrop) {
        return;
      }
      // if item dropped is going to be a new instance (i.e. it came from the left panel), then create a new child component
      if (item.newInstance && item.instanceType !== 'Component') {
        dispatch(
          //update state
          addChild({
            type: item.instanceType,
            typeId: item.instanceTypeId,
            childId: null,
            contextParam: contextParam
          })
        );

        //emit the socket event
        if (roomCode) {
          emitEvent('addChildAction', roomCode, {
            type: item.instanceType,
            typeId: item.instanceTypeId,
            childId: null,
            contextParam: contextParam
          });

          console.log('emit addChildAction event is triggered in canvas');
        }
      } else if (item.newInstance && item.instanceType === 'Component') {
        let hasDiffParent = false;
        const components = state.components;
        let newChildName = '';
        // loop over componenets array
        for (let i = 0; i < components.length; i++) {
          const comp = components[i];
          //loop over each componenets child
          for (let j = 0; j < comp.children.length; j++) {
            const child = comp.children[j];
            if (child.name === 'separator') continue;
            // check if the item.instanceTypeId matches and child ID
            if (item.instanceTypeId === child.typeId) {
              // check if the name of the parent matches the canvas focus name
              // comp is the parent component
              // currentComponent is the canvas.focus component
              if (comp.name === currentComponent.name) {
                i = components.length;
                break;
              } else {
                // if false
                // setCopiedComp(child);
                hasDiffParent = true;
                newChildName = child.name;
                i = components.length;
                break;
              }
            }
          }
        }
        // if (!hasDiffParent) {
        dispatch(
          addChild({
            type: item.instanceType,
            typeId: item.instanceTypeId,
            childId: null,
            contextParam: contextParam
          })
        );
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  });

  // Styling for Canvas
  const defaultCanvasStyle: React.CSSProperties = {
    width: '100%',
    minHeight: '100%',
    backgroundColor: isOver ? '#242323' : '#191919',
    // borderStyle: isOver ? 'dotted' : 'solid',
    aspectRatio: 'auto 774 / 1200',
    boxSizing: 'border-box'
  };

  // Combine the default styles of the canvas with the custom styles set by the user for that component
  // The renderChildren function renders all direct children of a given component
  // Direct children are draggable/clickable

  const canvasStyle: React.CSSProperties = combineStyles(
    defaultCanvasStyle,
    currentComponent.style
  );

  return (
    <div className={'mouseTracking'}>
      <MouseMovement />
      <div
        className={'componentContainer'}
        ref={drop}
        data-testid="drop"
        style={canvasStyle}
        onClick={onClickHandler}
      >
        {renderChildren(currentComponent.children)}
      </div>
    </div>
  );
}

export default Canvas;
