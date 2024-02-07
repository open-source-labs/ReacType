import { Component, DragItem } from '../../interfaces/Interfaces';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import React, { useEffect, useState } from 'react';
import {
  addChild,
  changeFocus,
  snapShotAction
} from '../../redux/reducers/slice/appStateSlice';
import { useDispatch, useSelector } from 'react-redux';
import { debounce, throttle } from 'lodash';

import Arrow from './Arrow';
import { ItemTypes } from '../../constants/ItemTypes';
import { RootState } from '../../redux/store';
import { combineStyles } from '../../helperFunctions/combineStyles';
import renderChildren from '../../helperFunctions/renderChildren';
import { emitEvent, getSocket } from '../../helperFunctions/socket';
import { FaMousePointer } from 'react-icons/fa';

const Canvas = (props: {}): JSX.Element => {
  const state = useSelector((store: RootState) => store.appState);
  const contextParam = useSelector((store: RootState) => store.contextSlice);
  const roomCode = useSelector((store: RootState) => store.roomSlice.roomCode);
  const userName = useSelector((store: RootState) => store.roomSlice.userName);
  const userList = useSelector((store: RootState) => store.roomSlice.userList);

  const [remoteCursors, setRemoteCursors] = useState([]);
  const [toggleSwitch, setToggleSwitch] = useState(true);
  const [toggleText, setToggleText] = useState('off');
  const toggleButton = () => {
    setToggleText(toggleText === 'on' ? 'off' : 'on');
  };

  const debounceSetPosition = debounce((newX, newY) => {
    if (userList.length > 1)
      emitEvent('cursorData', roomCode, { x: newX, y: newY, userName });
  }, 500);

  const handleMouseMove = (e) => {
    debounceSetPosition(e.clientX, e.clientY);
  };

  const handleCursorDataFromServer = (remoteData) => {
    setRemoteCursors((prevState) => {
      const cursorIdx = prevState.findIndex(
        (cursor) => cursor.remoteUserName === remoteData.userName
      );
      if (cursorIdx >= 0) {
        if (
          prevState[cursorIdx].x !== remoteData.x ||
          prevState[cursorIdx].y !== remoteData.y
        ) {
          const updatedCursors = [...prevState];
          updatedCursors[cursorIdx] = {
            ...prevState[cursorIdx],
            x: remoteData.x,
            y: remoteData.y
          };
          return updatedCursors;
        } else {
          return prevState;
        }
      } else {
        return [
          ...prevState,
          {
            x: remoteData.x,
            y: remoteData.y,
            remoteUserName: remoteData.userName,
            isVisible: true
          }
        ];
      }
    });
  };

  const handleCursorDeleteFromServer = () => {
    setRemoteCursors((prevRemoteCursors) =>
      prevRemoteCursors.filter((cursor) =>
        userList.includes(cursor.remoteUserName)
      )
    );
  };

  const handleToggleSwitch = () => {
    setToggleSwitch(!toggleSwitch);
    if (toggleSwitch) {
      socket.off('remote cursor data from server');
      setRemoteCursors((prevState) => {
        const newState = prevState.map((cursor) => ({
          ...cursor,
          isVisible: false
        }));
        return newState;
      });
    } else {
      socket.on('remote cursor data from server', (remoteData) =>
        handleCursorDataFromServer(remoteData)
      );
      setRemoteCursors((prevState) =>
        prevState.map((cursor) => ({
          ...cursor,
          isVisible: true
        }))
      );
    }
  };

  const multipleClicks = () => {
    handleToggleSwitch();
    toggleButton();
  };

  const socket = getSocket();

  useEffect(() => {

    if (socket) {
      socket.on('remote cursor data from server', (remoteData) =>
        handleCursorDataFromServer(remoteData)
      );
    }

    return () => {
      if (socket) socket.off('remote cursor data from server');
    };
  }, [socket]);

  useEffect(() => {
    handleCursorDeleteFromServer();
  }, [userList]);

  const currentComponent: Component = state.components.find(
    (elem: Component) => elem.id === state.canvasFocus.componentId
  );

  Arrow.deleteLines();

  const dispatch = useDispatch();
  const changeFocusFunction = (
    componentId?: number,
    childId?: number | null
  ) => {
    dispatch(changeFocus({ componentId, childId }));
    if (roomCode) {
      emitEvent('changeFocusAction', roomCode, {
        componentId: componentId,
        childId: childId
      });
    }
  };

  function onClickHandler(event: React.MouseEvent) {
    event.stopPropagation();
    changeFocusFunction(state.canvasFocus.componentId, null);
  }

  const snapShotFunc = () => {
    const deepCopiedState = JSON.parse(JSON.stringify(state));
    const focusIndex = state.canvasFocus.componentId - 1;
    dispatch(
      snapShotAction({
        focusIndex: focusIndex,
        deepCopiedState: deepCopiedState
      })
    );
  };

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.INSTANCE,
    drop: (item: DragItem, monitor: DropTargetMonitor) => {
      const didDrop = monitor.didDrop();
      snapShotFunc();
      if (didDrop) {
        return;
      }

      if (item.newInstance && item.instanceType !== 'Component') {
        dispatch(
          addChild({
            type: item.instanceType,
            typeId: item.instanceTypeId,
            childId: null,
            contextParam: contextParam
          })
        );

        if (roomCode) {
          emitEvent('addChildAction', roomCode, {
            type: item.instanceType,
            typeId: item.instanceTypeId,
            childId: null,
            contextParam: contextParam
          });
        }
      } else if (item.newInstance && item.instanceType === 'Component') {
        let hasDiffParent = false;
        const components = state.components;
        let newChildName = '';
        for (let i = 0; i < components.length; i++) {
          const comp = components[i];
          for (let j = 0; j < comp.children.length; j++) {
            const child = comp.children[j];
            if (child.name === 'separator') continue;
            if (item.instanceTypeId === child.typeId) {
              if (comp.name === currentComponent.name) {
                i = components.length;
                break;
              } else {
                hasDiffParent = true;
                newChildName = child.name;
                i = components.length;
                break;
              }
            }
          }
        }

        dispatch(
          addChild({
            type: item.instanceType,
            typeId: item.instanceTypeId,
            childId: null,
            contextParam: contextParam
          })
        );
        if (roomCode) {
          emitEvent('addChildAction', roomCode, {
            type: item.instanceType,
            typeId: item.instanceTypeId,
            childId: null,
            contextParam: contextParam
          });

        }
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  });

  const defaultCanvasStyle: React.CSSProperties = {
    width: '100%',
    minHeight: '100%',
    backgroundColor: isOver ? '#242323' : '#191919',
    // borderStyle: isOver ? 'dotted' : 'solid',
    aspectRatio: 'auto 774 / 1200',
    boxSizing: 'border-box'
  };

  const canvasStyle: React.CSSProperties = combineStyles(
    defaultCanvasStyle,
    currentComponent.style
  );

  const userColors = [
    '#FC00BD',
    '#D0FC00',
    '#00DBFC',
    '#FD98B8',
    '#FCAA00',
    '#9267FF'
  ];

  return (
    <div
      className={'componentContainer'}
      ref={drop}
      data-testid="drop"
      style={canvasStyle}
      onClick={onClickHandler}
      onMouseMove={handleMouseMove}
    >
      {renderChildren(currentComponent.children)}

      {remoteCursors.map(
        (cursor, idx) =>
          cursor.isVisible && (
            <div
              key={idx}
              className="remote-cursor"
              style={{
                position: 'absolute',
                left: cursor.x + 'px',
                top: cursor.y - 68 + 'px',
                fontSize: '1em',
                color: userColors[userList.indexOf(cursor.remoteUserName)]
              }}
            >
              {<FaMousePointer />}
              {cursor.remoteUserName}
            </div>
          )
      )}
      <label className="switch">
        {userList.length > 1 && (
          <button
            className="btn-toggle"
            onClick={multipleClicks}
            style={{
              position: 'fixed',
              width: 'max-content',
              height: 'max-content',
              bottom: '100px',
              left: '51vw',
              textAlign: 'center',
              color: '#FFFFFF',
              backgroundColor: '#151515',
              zIndex: 0,
              padding: '5px',
              borderColor: '#46C0A5',
              borderRadius: '5px'
            }}
          >
            {toggleText === 'on' ? 'View Cursors' : 'Hide Cursors'}
          </button>
        )}
      </label>
    </div>
  );
}

export default Canvas;
