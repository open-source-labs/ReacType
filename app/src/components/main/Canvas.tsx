import React, { useState, useContext } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';
import StateContext from '../../context/context';
import { Component, DragItem } from '../../interfaces/Interfaces';
import { combineStyles } from '../../helperFunctions/combineStyles';
import renderChildren from '../../helperFunctions/renderChildren';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import createModal from '../right/createModal';

const checkChildren = (child, currentComponent) => {
  for (let i = 0; i < child.length; i+=1) {
    if (child[i].children.length) {
      for (let j = 0; j < child[i].children.length; j+=1) {
        if (child[i].children[j].name === currentComponent.name) {
          return true;
        }
      }
      return checkChildren(child[i].children, currentComponent);
    }
  }
  return false;
};

function Canvas() {
  const [modal, setModal] = useState(null);

  const [state, dispatch] = useContext(StateContext);
  // find the current component to render on the canvas
  const currentComponent: Component = state.components.find(
    (elem: Component) => elem.id === state.canvasFocus.componentId
  );

  // changes focus of the canvas to a new component / child
  const changeFocus = (componentId: number, childId: number | null) => {
    dispatch({ type: 'CHANGE FOCUS', payload: { componentId, childId } });
  };

  // onClickHandler is responsible for changing the focused component and child component
  function onClickHandler(event) {
    event.stopPropagation();
    // note: a null value for the child id means that we are focusing on the top-level component rather than any child
    changeFocus(state.canvasFocus.componentId, null);
  }

  const closeModal = () => setModal(null);

  // creates modal that asks if user wants to clear workspace
  // if user clears their workspace, then their components are removed from state and the modal is closed
  const triedToNestIncorrectly = () => {
    // set modal options
    const children = (
      <List className="export-preference">
        <ListItem
          key={`gotIt${state.canvasFocus.componentId}`}
          button
          onClick={closeModal}
          style={{
            border: '1px solid #3f51b5',
            marginBottom: '2%',
            marginTop: '5%'
          }}
        >
          <ListItemText
            primary={'Got it'}
            style={{ textAlign: 'center' }}
            onClick={closeModal}
          />
        </ListItem>
      </List>
    );

    // create modal
    setModal(
      createModal({
        closeModal,
        children,
        message: 'Unable to nest component in another component that contains that component.',
        primBtnLabel: null,
        primBtnAction: null,
        secBtnAction: null,
        secBtnLabel: null,
        open: true
      })
    );
  };

  // This hook will allow the user to drag items from the left panel on to the canvas
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.INSTANCE,
    drop: (item: DragItem, monitor: DropTargetMonitor) => {
      const didDrop = monitor.didDrop(); // returns false for direct drop target
      if (didDrop) {
        return;
      }

      const addingComponent = state.components.find(elem => elem.id === item.instanceTypeId);

      if (checkChildren([addingComponent], currentComponent)) {
        triedToNestIncorrectly();
      } else {
        // if item dropped is going to be a new instance (i.e. it came from the left panel), then create a new child component
        if (item.newInstance) {
          console.log("still added");
          dispatch({
            type: 'ADD CHILD',
            payload: {
              type: item.instanceType,
              typeId: item.instanceTypeId,
              childId: null
            }
          });
        }
        // if item is not a new instance, change position of element dragged inside div so that the div is the new parent
        else {
          dispatch({
            type: 'CHANGE POSITION',
            payload: {
              currentChildId: item.childId,
              newParentChildId: null
            }
          });
        }
      }
    },
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  });

  const defaultCanvasStyle = {
    width: '100%',
    minHeight: '100%',
    backgroundColor: isOver ? 'lightyellow' : 'white',
    border: '3px solid #01d46d',
    borderStyle: isOver ? 'dotted' : 'solid'
  };

  // Combine the default styles of the canvas with the custom styles set by the user for that component
  // The render children function renders all direct children of a given component
  // Direct children are draggable/clickable


  const canvasStyle = combineStyles(defaultCanvasStyle, currentComponent.style);
  return (
    <div ref={drop} style={canvasStyle} onClick={onClickHandler}>
      {renderChildren(currentComponent.children)}
      {modal}
    </div>
  );
}

export default Canvas;
