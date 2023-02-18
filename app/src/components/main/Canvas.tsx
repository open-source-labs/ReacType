import React, { useContext, useState, useEffect } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';
import StateContext from '../../context/context';
import { Component, DragItem } from '../../interfaces/Interfaces';
import { combineStyles } from '../../helperFunctions/combineStyles';
import renderChildren from '../../helperFunctions/renderChildren';
// Caret start
import Arrow from './Arrow';
import { getRowsStateFromCache } from '@mui/x-data-grid/hooks/features/rows/gridRowsUtils';

function Canvas(props): JSX.Element {
  const [state, dispatch] = useContext(StateContext);
  const [newComp, setNewComp] = useState(false);
  const [copiedChildrenArr, setCopiedChildrenArr] = useState([]);
  const [copiedComp, setCopiedComp] = useState({});

  useEffect(()=> {
    if (newComp) {
      // find updated comp
      const copy = state.components.find(comp => comp.name === copiedComp.name)
      // make a array of copied children from the copied component
      if (copy.children.length){
        const masterArr = [];
        const children = copy.children;
        function deepChildCopy(children, parentId) {
          for (let i = 0; i < children.length; i++) {
            const child = children[i];
            let id = (parentId) ? parentId : null;
            if (child.typeId < 1000){
              masterArr.push({
                type: "HTML Element",
                typeId: child.typeId,
                childId: id
              })
              if (child.children.length) {
                deepChildCopy(child.children, child.childId);
              }
            }
          }
        }
        deepChildCopy(children, null);
        setCopiedChildrenArr(masterArr);
      }

      const components = state.components

        // find the ID of the newly created component
      const newId = components[components.length -1]['id']
      dispatch({
        type: 'ADD CHILD',
        payload: {
          type: "Component",
          typeId: newId,
          childId: null
        }
      });
    }
    setNewComp(false) // initially set to false
  }, [newComp])

  // Caret start
  Arrow.deleteLines();
  // find the current component to render on the canvas
  const currentComponent: Component = state.components.find(
    (elem: Component) => elem.id === state.canvasFocus.componentId
    );

    // changes focus of the canvas to a new component / child
    const changeFocus = (componentId?: number, childId?: number | null) => {
      dispatch({ type: 'CHANGE FOCUS', payload: { componentId, childId } });
    };
    // onClickHandler is responsible for changing the focused component and child component
    function onClickHandler(event) {
      event.stopPropagation();
      // note: a null value for the child id means that we are focusing on the top-level component rather than any child
      changeFocus(state.canvasFocus.componentId, null);
    };

    // stores a snapshot of state into the past array for UNDO. snapShotFunc is also invoked for nestable elements in DirectChildHTMLNestable.tsx
    const snapShotFunc = () => {
      // make a deep clone of state
        const deepCopiedState = JSON.parse(JSON.stringify(state));
        const focusIndex = state.canvasFocus.componentId - 1;
        //pushes the last user action on the canvas into the past array of Component
        state.components[focusIndex].past.push(deepCopiedState.components[focusIndex].children);
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
      if (item.newInstance && item.instanceType !== "Component") {
        dispatch({
          type: 'ADD CHILD',
          payload: {
            type: item.instanceType,
            typeId: item.instanceTypeId,
            childId: null
          }
        });
      } else if (item.newInstance && item.instanceType === "Component") {
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
                setCopiedComp(child);
                hasDiffParent = true;
                newChildName = child.name;
                i = components.length;
                break;
              }
            }
          }
        }
        // if (!hasDiffParent) {
          dispatch({
            type: 'ADD CHILD',
            payload: {
              type: item.instanceType,
              typeId: item.instanceTypeId,
              childId: null
            }
          });
        // } else {
        //   alert('something is wrong');
          // able to duplicate a component in dev only does not work for prod
          // create a new component

          // let name = prompt("Component already has a parent. \nDo you want to create a new component and import its elements?", "Enter component name here");
          // while (components.some(comp => comp.name === name)) {
          //   name = prompt(`${name} component already exists. \nPlease pick a new name.`);
          // }
          // if (name) {
          //   dispatch({
          //     type: 'ADD COMPONENT',
          //     payload: { componentName: name, root: false }
          //   });

          //   setNewComp(true);
          //   setNewComp(!newComp)
          // }

        // }

      }
    },
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  });

  // Styling for Canvas
  const defaultCanvasStyle = {
    width: '100%',
    minHeight: '100%',
    backgroundColor: isOver ? '#FAFED1' : '#FBFBFB',
    border: '1px solid #FBFBF2',
    borderStyle: isOver ? 'dotted' : 'solid',
    userSelect: 'none',
    aspectRatio: 'auto 774 / 1200',
    boxSizing: 'border-box',
    // width: '100vw',
    // height: '100vh'
  };

  const darkCanvasStyle = {
    width: '100%',
    minHeight: '100%',
    backgroundColor: isOver ? '#4d4d4d' : '#21262c',
    border: '1px solid #FBFBF2',
    borderStyle: isOver ? 'dotted' : 'solid',
  };
  // Combine the default styles of the canvas with the custom styles set by the user for that component
  // The render children function renders all direct children of a given component
  // Direct children are draggable/clickable

  // const canvasStyle = combineStyles(defaultCanvasStyle, currentComponent.style);
  const canvasStyle = combineStyles(defaultCanvasStyle, currentComponent.style);
  const darkCombinedCanvasStyle = combineStyles(darkCanvasStyle, currentComponent.style);
  // console.log('CURRENTCOMPONENT children: ', currentComponent.children, 'CURRCOMPONENT STYLE: ', currentComponent.style);
  return (
    <div className={'componentContainer'} ref={drop} style={props.isThemeLight ? canvasStyle : darkCombinedCanvasStyle} onClick={onClickHandler}>
       {renderChildren(currentComponent.children)}
    </div>
  );
}

export default Canvas;
