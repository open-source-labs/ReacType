import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
/* eslint-disable */
const CONTEXT_MENU_WIDTH = 100;
const CONTEXT_MENU_HEIGHT = 200;

const ELEMENT_HEIGHT_SIZE = '15px';

function ContextMenu(props) {
  const dispatch = useDispatch();
  const [editTextOpen, setEditTextOpen] = useState(false);

  const [editTextValue, setEditTextValue] = useState('');

  const appState = useSelector((store: RootState) => store.appState);
  const contextParam = useSelector((store: RootState) => store.contextSlice); // this is literally just passed in on everything else, i have no idea what it does, you can look it up, but other files are literally just taking it and passing it back in.

  const [menuType, setMenuType] = useState('?');

  let selectedItemId = useRef(-1); // dont trigger rerenders cause this shouldent change.
  // attach key listener

  // The below is for all key events

  function keyStrokeFunction(key) {
    if (editTextOpen === true) {
      switch (key.key) {
        case 'Enter': {
          setEditTextOpen(false);
          break;
        }
      }
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', keyStrokeFunction);
  }, [editTextOpen, editTextValue]);

  // remove the keystroke listener on unmount.
  useEffect(
    // the next line is intentional, im not an idiot, do not remove.
    () => () => {
      document.removeEventListener('keydown', keyStrokeFunction); // remove old one first if we have
    },
    [editTextOpen, editTextValue]
  );
  ////////// the above wonly checks for certan key events, for each type of place in the menu we are in.

  function editTextChange(event) {
    setEditTextValue(event.target.value);
    dispatch(
      dispatch({
        type: 'appState/updateAttributes',
        payload: {
          attributes: {
            comptext: event.target.value
          },
          contextParam: contextParam
        }
      })
    );
  }

  let xOff = props.mouseXState + 2;
  if (props.mouseXState > window.innerWidth - CONTEXT_MENU_WIDTH) {
    xOff -= CONTEXT_MENU_WIDTH; // move it "flip" it back
    xOff -= 4;
  }

  let yOff = props.mouseYState + 2;
  if (props.mouseYState > window.innerHeight - CONTEXT_MENU_HEIGHT) {
    yOff -= CONTEXT_MENU_HEIGHT; // bump "flip" it up
    yOff -= 4; // move it back 4px cause we moved it forward 2px;
  }

  let thing = props.selectedItem;

  function handleEditTextButtonClick() {
    if (editTextOpen === true) return;
    setEditTextOpen(true);
    // console.log('AFSADFSAF');
    // console.log({ selectedItemId });
    // console.log(appState);
    // console.log(appState.components[0].children[selectedItemId.current]);

    let comptext =
      appState.components[0].children[selectedItemId.current].attributes
        .comptext;
    if (comptext === undefined) comptext = '';
    setEditTextValue(comptext);
  }

  console.log(appState);
  for (let i = 0; i < 5; i++) {
    console.log(thing.id);

    // just things that we want to stop on...
    if (!thing.id.match(/canv/)) {
      thing = thing.parentElement;
    } else {
      // once were all said and done...
      if (thing.id.match(/^canv[0-9]/) && menuType !== 'CanvasElement') {
        setMenuType('CanvasElement');

        console.log(thing.id.split('canv'));
        selectedItemId.current = thing.id.split('canv')[1];
        dispatch({
          type: 'appState/changeFocus',
          payload: {
            componentId: 1,
            childId: Number(selectedItemId.current)
          }
        });
      }
      break;
    }
  }

  return (
    // mouseX and mouseY are not use state,
    // so if they change, this will not change unless it rerenders.

    <div
      style={{
        backgroundColor: props.targetColor,
        zIndex: '100080',
        margin: '0px',
        padding: '0px',
        position: 'fixed',
        left: `${xOff}px`,
        top: `${yOff}px`,
        width: `${CONTEXT_MENU_WIDTH}px`,
        height: `${CONTEXT_MENU_HEIGHT}px`
      }}
      ref={props.PanRef}
    >
      {menuType === 'CanvasElement' && (
        <div>
          <button style={{ padding: '0px', margin: '0px', width: '100%' }}>
            d1
          </button>
          <button style={{ padding: '0px', margin: '0px', width: '100%' }}>
            d1
          </button>
          <button style={{ padding: '0px', margin: '0px', width: '100%' }}>
            d1
          </button>
          {!editTextOpen && (
            <button
              onClick={handleEditTextButtonClick}
              style={{ padding: '0px', margin: '0px', width: '100%' }}
            >
              edit text
            </button>
          )}
          {editTextOpen && (
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
                width: `${CONTEXT_MENU_WIDTH}px`,
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
