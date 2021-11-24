import React, { useContext, useRef } from 'react';
import { ChildElement, HTMLType } from '../../interfaces/Interfaces';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';
import StateContext from '../../context/context';
import { combineStyles } from '../../helperFunctions/combineStyles';
import globalDefaultStyle from '../../public/styles/globalDefaultStyles';
import renderChildren from '../../helperFunctions/renderChildren';
import validateNewParent from '../../helperFunctions/changePositionValidation'
import componentNest from '../../helperFunctions/componentNestValidation'

function DirectChildHTMLNestable({
  childId,
  type,
  typeId,
  style,
  children
}: ChildElement) {
  const [state, dispatch] = useContext(StateContext);
  const ref = useRef(null);

  // find the HTML element corresponding with this instance of an HTML element
  // find the current component to render on the canvas
  const HTMLType: HTMLType = state.HTMLTypes.find(
    (type: HTMLType) => type.id === typeId
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
    canDrag: HTMLType.id !== 1000, // dragging not permitted if element is separator
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
      if (didDrop) {
        return;
      }
      // updates state with new instance
      // if item dropped is going to be a new instance (i.e. it came from the left panel), then create a new child component
      if (item.newInstance) {
        if ((item.instanceType === 'Component' && componentNest(state.components[item.instanceTypeId - 1].children, childId)) || item.instanceType !== 'Component') {
          dispatch({
            type: 'ADD CHILD',
            payload: {
              type: item.instanceType,
              typeId: item.instanceTypeId,
              childId: childId,
            }
          });
        }
      }
      // if item is not a new instance, change position of element dragged inside separator so that separator is new parent (until replacement)
      else {
        // check to see if the selected child is trying to nest within itself
        if (validateNewParent(state, item.childId, childId) === true) {
          dispatch({
            type: 'CHANGE POSITION',
            payload: {
              currentChildId: item.childId,
              newParentChildId: childId
            }
          });
        }
      }
    },

    collect: (monitor: any) => {
      return {
        isOver: !!monitor.isOver({ shallow: true })
      };
    }
  });

  const changeFocus = (componentId: number, childId: number | null) => {
    dispatch({ type: 'CHANGE FOCUS', payload: { componentId, childId } });
  };

  // onClickHandler is responsible for changing the focused component and child component
  function onClickHandler(event) {
    event.stopPropagation();
    changeFocus(state.canvasFocus.componentId, childId);
  }

  // combine all styles so that higher priority style specifications overrule lower priority style specifications
  // priority order is 1) style directly set for this child (style), 2) style of the referenced HTML element, and 3) default styling
  const defaultNestableStyle = { ...globalDefaultStyle };
  const separatorStyle = {
    padding: '5px 10px',
    margin: '1px 10px',
  };

  defaultNestableStyle['backgroundColor'] = isOver ? 'yellow' : 'rgba(0, 0, 255, 0.0)';

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

export default DirectChildHTMLNestable;
