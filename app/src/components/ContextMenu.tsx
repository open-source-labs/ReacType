import React, { useState, useEffect, useLayoutEffect } from 'react';

const CONTEXT_MENU_WIDTH = 100;
const CONTEXT_MENU_HEIGHT = 200;

const ELEMENT_HEIGHT_SIZE = '15px';

function ContextMenu(props) {
  const [editTextOpen, setEditTextOpen] = useState(false);

  const [editTextValue, setEditTextValue] = useState('');

  const [menuType, setMenuType] = useState('?');
  // attach key listener

  function keyStrokeFunction(key) {
    console.log(key);
    if (editTextOpen === true) {
      if (key.key.length === 1) {
        setEditTextValue(`${editTextValue}${key.key}`);
      } else {
        switch (key.key) {
          case 'Backspace': {
            setEditTextValue(editTextValue.slice(0, -1));
            break;
          }
          case 'Enter': {
            setEditTextOpen(false);
            break;
          }
          default: {
            break;
          }
        }
      }
    }
  }
  useEffect(() => {
    console.log('adding');
    document.addEventListener('keydown', keyStrokeFunction);
  }, [editTextOpen, editTextValue]);

  // remove the keystroke listener on unmount.
  useEffect(
    // the next line is intentional, im not an idiot, do not remove.
    () => () => {
      console.log('removing');
      document.removeEventListener('keydown', keyStrokeFunction); // remove old one first if we have
    },
    [editTextOpen, editTextValue]
  );

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
  }

  console.log(thing);
  for (let i = 0; i < 5; i++) {
    console.log(thing.id);

    // just things that we want to stop on...
    if (!thing.id.match(/canv/)) {
      console.log(thing.nodeName);
      console.log(thing);
      thing = thing.parentElement;
    } else {
      // once were all said and done...
      if (thing.id.match(/^canv[0-9]/) && menuType !== 'CanvasElement') {
        setMenuType('CanvasElement');
      }
      break;
    }
  }

  console.log(menuType);

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
            <div
              style={{
                border: 'none',
                padding: '0px',
                margin: '0px',
                marginTop: '1px',
                width: `${CONTEXT_MENU_WIDTH}px`,
                height: ELEMENT_HEIGHT_SIZE,
                backgroundColor: 'purple'
              }}
            >
              {editTextValue}
            </div>
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
