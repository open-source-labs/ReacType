import { BreakfastDiningOutlined } from '@mui/icons-material';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
/* eslint-disable */
const CONTEXT_MENU_WIDTH = 225;
const CONTEXT_MENU_HEIGHT = 380;

const CONTEXT_MENU_PADDING = 3.5;

const ELEMENT_HEIGHT_SIZE = '15px';

function ContextMenu({
  mouseXState,
  mouseYState,
  selectedItem,
  targetColor,
  PanRef
}) {
  const dispatch = useDispatch();

  const [openMenu, setOpenMenu] = useState('none');
  // const [editTextOpen, setEditTextOpen] = useState(false);
  const [editTextValue, setEditTextValue] = useState('');

  // const [editBackgroundColorOpen, setEditBackgroundColorOpen] = useState(false);
  const [editBackgroundColorValue, setEditBackgroundColorValue] = useState('');

  const [editClassnameValue, setEditClassnameValue] = useState('');

  const appState = useSelector((store: RootState) => store.appState);
  const contextParam = useSelector((store: RootState) => store.contextSlice); // this is literally just passed in on everything else, i have no idea what it does, you can look it up, but other files are literally just taking it and passing it back in.

  const MenuTypeRef = useRef('?');

  let selectedItemId = useRef(-1); // dont trigger rerenders cause this shouldent change.
  // attach key listener

  // The below is for all key events

  function keyStrokeFunction(key) {
    if (openMenu === 'editText') {
      switch (key.key) {
        case 'Enter': {
          setOpenMenu('none');
          break;
        }
      }
    }
    if (openMenu === 'editBackgroundColor') {
      switch (key.key) {
        case 'Enter': {
          setOpenMenu('none');
          break;
        }
      }
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', keyStrokeFunction);
  }, [openMenu, editTextValue]);

  // set the focus
  useEffect(() => {
    dispatch({
      type: 'appState/changeFocus',
      payload: {
        componentId: appState.canvasFocus.componentId,
        childId: selectedItemId.current
      }
    });
  }, [mouseXState, mouseYState]); // re trigger if the position of the context menu changes.

  // remove the keystroke listener on unmount.
  useEffect(
    // the next line is intentional, im not an idiot, do not remove.
    () => () => {
      document.removeEventListener('keydown', keyStrokeFunction); // remove old one first if we have
    },
    [openMenu, editTextValue]
  );
  //////////////////// the above ensures we clean up old key listeners to prevent data leak //////////////////////

  function editTextChange(event) {
    setEditTextValue(event.target.value);
    let correctChild = searchChildren(
      appState.components[0].children,
      selectedItemId.current
    ); // helper function below
    let fullAttributes = correctChild.attributes;
    if (fullAttributes === undefined) fullAttributes = '';
    dispatch({
      type: 'appState/updateAttributes',
      payload: {
        attributes: {
          ...fullAttributes,
          comptext: event.target.value
        },
        contextParam: contextParam
      }
    });
  }

  function editBackgroundColorChange(event) {
    setEditBackgroundColorValue(event.target.value);

    let correctChild = searchChildren(
      appState.components[0].children,
      selectedItemId.current
    ); // helper function below
    let fullStyle = correctChild.style;
    if (fullStyle === undefined) fullStyle = '';

    dispatch({
      type: 'appState/updateCss',
      payload: {
        style: {
          ...fullStyle,
          backgroundColor: event.target.value
        },
        contextParam: contextParam
      }
    });
  }

  function editClassnameChange(event) {
    setEditClassnameValue(event.target.value);

    let correctChild = searchChildren(
      appState.components[0].children,
      selectedItemId.current
    ); // helper function below
    let fullAttributes = correctChild.attributes;
    if (fullAttributes === undefined) fullAttributes = '';

    dispatch({
      type: 'appState/updateAttributes',
      payload: {
        attributes: {
          ...fullAttributes,
          cssclasses: event.target.value
        },
        contextParam: contextParam
      }
    });
  }

  let xOff = mouseXState + 2;
  if (mouseXState > window.innerWidth - CONTEXT_MENU_WIDTH) {
    xOff -= CONTEXT_MENU_WIDTH; // move it "flip" it back
    xOff -= 4;
  }

  let yOff = mouseYState + 2;
  if (mouseYState > window.innerHeight - CONTEXT_MENU_HEIGHT) {
    yOff -= CONTEXT_MENU_HEIGHT; // bump "flip" it up
    yOff -= 4; // move it back 4px cause we moved it forward 2px;
  }

  let thing = selectedItem;

  function handleEditTextButtonClick() {
    if (openMenu === 'editText') return;
    setOpenMenu('editText'); // by using this, we ensure that other menus that might be open now close.
    // error here was often caused because of the fact that the indexes were getting mixed up, not in order, so instead now i search for one with the correct child id!
    let correctChild = searchChildren(
      appState.components[0].children,
      selectedItemId.current
    ); // helper function below

    let displayText = correctChild.attributes.comptext;
    if (displayText === undefined) displayText = '';
    setEditTextValue(displayText);
  }

  function handleEditBackgroundColorButtonClick() {
    if (openMenu === 'editBackgroundColor') return;
    setOpenMenu('editBackgroundColor');

    let correctChild = searchChildren(
      appState.components[0].children,
      selectedItemId.current
    ); // helper function below

    let displayText = correctChild.style.backgroundColor;
    if (displayText === undefined) displayText = '';
    setEditBackgroundColorValue(displayText);
  }

  function handleEditClassnameButtonClick() {
    if (openMenu === 'editClassname') return;
    setOpenMenu('editClassname');

    let correctChild = searchChildren(
      appState.components[0].children,
      selectedItemId.current
    ); // this function is defined below

    let displayText = correctChild.attributes.cssclasses;
    if (displayText === undefined) displayText = '';
    setEditTextValue(displayText);
  }

  for (let i = 0; i < 5; i++) {
    // just things that we want to stop on...
    if (!thing.id || !thing.id.match(/canv/)) {
      thing = thing.parentElement;
    } else {
      // once were all said and done...
      if (
        thing.id.match(/^canv[0-9]/) &&
        MenuTypeRef.current !== 'CanvasElement'
      ) {
        MenuTypeRef.current = 'CanvasElement';
      }

      selectedItemId.current = Number(thing.id.split('canv')[1]);
      break;
    }
  }

  return (
    // mouseX and mouseY are not use state,
    // so if they change, this will not change unless it rerenders.

    <div
      style={{
        backgroundColor: targetColor,
        zIndex: '100080',
        margin: '0px',
        padding: `${CONTEXT_MENU_PADDING}px`,
        position: 'fixed',
        left: `${xOff}px`,
        top: `${yOff}px`,
        width: `${CONTEXT_MENU_WIDTH}px`,
        height: `${CONTEXT_MENU_HEIGHT}px`
      }}
      ref={PanRef}
    >
      {MenuTypeRef.current === 'CanvasElement' && (
        <div>
          <button style={{ padding: '0px', margin: '0px', width: '100%' }}>
            d1
          </button>
          {openMenu !== 'editClassname' && (
            <button
              onClick={handleEditClassnameButtonClick}
              style={{ padding: '0px', margin: '0px', width: '100%' }}
            >
              edit class list
            </button>
          )}
          {openMenu === 'editClassname' && (
            <input
              type="text"
              autoFocus
              value={editClassnameValue}
              onChange={editClassnameChange}
              style={{
                border: 'none',
                padding: '0px',
                margin: '0px',
                marginTop: '1px',
                width: `${CONTEXT_MENU_WIDTH - CONTEXT_MENU_PADDING * 2}px`,
                height: ELEMENT_HEIGHT_SIZE,
                backgroundColor: 'purple',
                overflow: 'hidden'
              }}
            ></input>
          )}
          <button style={{ padding: '0px', margin: '0px', width: '100%' }}>
            d1
          </button>
          {openMenu !== 'editText' && (
            <button
              onClick={handleEditTextButtonClick}
              style={{ padding: '0px', margin: '0px', width: '100%' }}
            >
              edit text
            </button>
          )}
          {openMenu === 'editText' && (
            <input
              type="text"
              autoFocus
              value={editTextValue}
              onChange={editTextChange}
              style={{
                border: 'none',
                padding: '0px',
                margin: '0px',
                marginTop: '1px',
                width: `${CONTEXT_MENU_WIDTH - CONTEXT_MENU_PADDING * 2}px`,
                height: ELEMENT_HEIGHT_SIZE,
                backgroundColor: 'purple',
                overflow: 'hidden'
              }}
            ></input>
          )}
          {openMenu !== 'editBackgroundColor' && (
            <button
              onClick={handleEditBackgroundColorButtonClick}
              style={{ padding: '0px', margin: '0px', width: '100%' }}
            >
              set background color
            </button>
          )}
          {openMenu === 'editBackgroundColor' && (
            <input
              type="text"
              autoFocus
              value={editBackgroundColorValue}
              onChange={editBackgroundColorChange}
              style={{
                border: 'none',
                padding: '0px',
                margin: '0px',
                marginTop: '1px',
                width: `${CONTEXT_MENU_WIDTH - CONTEXT_MENU_PADDING * 2}px`,
                height: ELEMENT_HEIGHT_SIZE,
                backgroundColor: 'purple',
                overflow: 'hidden'
              }}
            ></input>
          )}
          <button style={{ padding: '0px', margin: '0px', width: '100%' }}>
            d1
          </button>
        </div>
      )}
    </div>
  );
}
export default ContextMenu;

function searchChildren(children, target) {
  let correctChild;
  function searchChildrenInner(children, target) {
    for (let i = 0; i < children.length; i++) {
      if (children[i].childId === target) {
        correctChild = children[i];
        break; // done, only one.
      } else if (children[i].children) {
        searchChildrenInner(children[i].children, target); // your grandson and his grandson will continue the quest!
      }
    }
  }
  searchChildrenInner(children, target);
  return correctChild;
}
