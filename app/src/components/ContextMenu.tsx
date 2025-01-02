// import { BreakfastDiningOutlined } from '@mui/icons-material';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
/* eslint-disable */
const CONTEXT_MENU_WIDTH = 225;
const CONTEXT_MENU_HEIGHT = 380;

const CONTEXT_MENU_PADDING = 3.5;

const ELEMENT_HEIGHT_SIZE = '15px';

function ContextMenu({
  mouseXState,
  mouseYState,
  selectedItem,
  menuTypeState,
  selectedItemId,
  targetColor,
  PanRef
}) {
  const dispatch = useDispatch();

  const [annoyingPopupOpen, setAnnoyingPopupOpen] = useState(false);

  const [openMenu, setOpenMenu] = useState('none');
  //

  const [singleMenuValue, setSingleMenuValue] = useState('');
  //

  //@ts-ignore
  const appState = useSelector((store: RootState) => store.appState);
  const buttonText = useSelector((store: RootState) => store.appState);
  //@ts-ignore
  const contextParam = useSelector((store: RootState) => store.contextSlice); // this is literally just passed in on everything else, i have no idea what it does, you can look it up, but other files are literally just taking it and passing it back in.

  //let selectedItemId = useRef(-1); // dont trigger rerenders cause this shouldent change.
  // attach key listener

  // The below is for all key events

  function keyStrokeFunction(key) {
    switch (key.key) {
      case 'Enter': {
        setOpenMenu('none');
        break;
      }
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', keyStrokeFunction);
  }, [openMenu]);

  // // set the focus on focus change
  // useEffect(() => {
  //   let thing = selectedItem; // look up th dom to see when we get to an element we like (if you right click on the span element you should still count as clicking the ReactTypeComponent element)
  //   for (let i = 0; i < 5; i++) {
  //     // just things that we want to stop on...
  //     if (!thing.id || !thing.id.match(/canv/)) {
  //       thing = thing.parentElement;
  //     } else {
  //       // once were all said and done...
  //       if (thing.id.match(/^canv[0-9]/)) {
  //         MenuTypeRef.current = 'CanvasElement';
  //       } else {
  //         MenuTypeRef.current = '?'; // set this back to unknown if you click out.
  //       }

  //       selectedItemId.current = Number(thing.id.split('canv')[1]); // this code tells us what hypothetical reaactType item we are selected, not just which DOM element.
  //       break;
  //     }
  //   }

  //   dispatch({
  //     type: 'appState/changeFocus',
  //     payload: {
  //       componentId: appState.canvasFocus.componentId,
  //       childId: selectedItemId.current // no more current
  //     }
  //   });
  // }, [selectedItem]); // re trigger if the position of the context menu changes.

  // remove the keystroke listener on unmount.
  useEffect(
    // the next line is intentional
    () => () => {
      document.removeEventListener('keydown', keyStrokeFunction); // remove old one first if we have
    },
    [openMenu]
  );
  //////////////////// the above ensures we clean up old key listeners to prevent data leak //////////////////////

  function singleMenuValueChange(
    event,
    stateTarget: string,
    stateUpdatePath: string,
    stateInnerTargetName: string
  ) {
    setSingleMenuValue(event.target.value);

    let correctChild = searchChildren(
      appState.components[0].children,
      selectedItemId
    ); // helper function below

    let fullAttributes = correctChild[stateTarget];
    if (fullAttributes === undefined) fullAttributes = '';
    dispatch({
      type: `${stateUpdatePath}`,
      payload: {
        [stateTarget]: {
          ...fullAttributes,
          [stateInnerTargetName]: event.target.value // this code puts the params into the right places.
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

  function handleStandardFieldButtonClick(
    fieldToOpen: string,
    stateSlice,
    innerTarget
  ) {
    if (openMenu === fieldToOpen) return;
    setOpenMenu(fieldToOpen); // this one line closes other fields and opens this one

    let correctChild = searchChildren(
      appState.components[0].children, // this is simply searching for the correct actual component from the dom elemnt ref
      selectedItemId
    ); // helper function below

    let displayText = correctChild[stateSlice][innerTarget];
    if (displayText === undefined) displayText = '';
    setSingleMenuValue(displayText);
  }

  return (
    // mouseX and mouseY are not use state,
    // so if they change, this will not change unless it rerenders.

    <div
      style={{
        backgroundColor: '#3b3b3b',
        borderRadius: '8px',
        border: '2px solid #1f1f1f',
        display: 'flex',
        zIndex: '100080',
        margin: '0px',
        padding: `15px`,
        position: 'fixed',
        left: `${xOff}px`,
        top: `${yOff}px`
      }}
      ref={PanRef}
    >
      {menuTypeState === 'CanvasElement' && (
        <div>
          <Button
            component="label"
            aria-label="customize an element"
            key="customize"
          >
            Customize Element
          </Button>
          {openMenu !== 'editClassname' && (
            <div
              className="popUpButtons"
              onClick={() => {
                handleStandardFieldButtonClick(
                  'editClassname',
                  'attributes',
                  'cssclasses'
                );
              }}
              onMouseOver={() => {
                console.log('open');
                setAnnoyingPopupOpen(true);
              }}
              onMouseOut={() => {
                console.log('close');
                setAnnoyingPopupOpen(false);
              }}
            >
              Add classes
            </div>
          )}
          {openMenu === 'editClassname' && (
            <TextField
              id="outlined-basic"
              label="Add Classes"
              variant="outlined"
              size="small"
              value={singleMenuValue}
              autoComplete="off"
              sx={{ width: '156px', display: 'block', marginLeft: '8px' }}
              onChange={(event) => {
                singleMenuValueChange(
                  event,
                  'attributes',
                  'appState/updateAttributes',
                  'cssclasses'
                );
              }}
            />
          )}

          {openMenu !== 'editText' && (
            <div
              className="popUpButtons"
              onClick={() => {
                handleStandardFieldButtonClick(
                  'editText',
                  'attributes',
                  'comptext'
                );
              }}
            >
              Edit inner text
            </div>
          )}
          {openMenu === 'editText' && (
            <TextField
              id="outlined-basic"
              label="Edit Inner Text"
              variant="outlined"
              value={singleMenuValue}
              autoComplete="off"
              size="small"
              sx={{
                width: '156px',
                display: 'block',
                marginLeft: '8px'
              }}
              onChange={(event) => {
                singleMenuValueChange(
                  event,
                  'attributes',
                  'appState/updateAttributes',
                  'comptext'
                );
              }}
            />
          )}
          {openMenu !== 'editLink' && (
            <div
              className="popUpButtons"
              onClick={() => {
                handleStandardFieldButtonClick(
                  'editLink',
                  'attributes',
                  'complink'
                );
              }}
            >
              Add a link
            </div>
          )}
          {openMenu === 'editLink' && (
            <TextField
              id="outlined-basic"
              label="Edit Link"
              variant="outlined"
              size="small"
              value={singleMenuValue}
              autoComplete="off"
              sx={{ width: '156px', display: 'block', marginLeft: '8px' }}
              onChange={(event) => {
                singleMenuValueChange(
                  event,
                  'attributes',
                  'appState/updateAttributes',
                  'complink'
                );
              }}
            />
          )}

          {openMenu !== 'editBackgroundColor' && (
            <div
              className="popUpButtons"
              onClick={() => {
                handleStandardFieldButtonClick(
                  'editBackgroundColor',
                  'style',
                  'backgroundColor'
                );
              }}
            >
              Set background color
            </div>
          )}
          {openMenu === 'editBackgroundColor' && (
            <TextField
              id="outlined-basic"
              label="Set Background Color"
              variant="outlined"
              size="small"
              value={singleMenuValue}
              autoComplete="off"
              sx={{ width: '156px', display: 'block', marginLeft: '8px' }}
              onChange={(event) => {
                singleMenuValueChange(
                  event,
                  'style',
                  'appState/updateCss',
                  'backgroundColor'
                );
              }}
            />
          )}
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
