import React, { useState, useContext, useEffect, useRef } from 'react';
import { ChildElement, HTMLType } from '../../interfaces/Interfaces';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';
import StateContext from '../../context/context';
import { combineStyles } from '../../helperFunctions/combineStyles';
import globalDefaultStyle from '../../public/styles/globalDefaultStyles';
import renderChildren from '../../helperFunctions/renderChildren';
import adjustComponentColor from '../../helperFunctions/adjustComponentColor';
import DeleteButton from './DeleteButton';
import validateNewParent from '../../helperFunctions/changePositionValidation';
import componentNest from '../../helperFunctions/componentNestValidation';
import AddRoute from './AddRoute';
import AddLink from './AddLink';

import { styleContext } from '../../containers/AppContainer';

function DirectChildHTMLNestable({
  childId,
  type,
  typeId,
  style,
  children,
  name,
  attributes
}: ChildElement) {
  const [state, dispatch] = useContext(StateContext);
  const { isThemeLight } = useContext(styleContext);
  const ref = useRef(null);
  // const [linkDisplayed, setLinkDisplayed] = useState('');

  // takes a snapshot of state to be used in UNDO and REDO cases.  snapShotFunc is also invoked in Canvas.tsx
  const snapShotFunc = () => {
    //makes a deep clone of state
    const deepCopiedState = JSON.parse(JSON.stringify(state));
    const focusIndex = state.canvasFocus.componentId - 1;
    //pushes the last user action on the canvas into the past array of Component
    state.components[focusIndex].past.push(
      deepCopiedState.components[focusIndex].children
    );
  };

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
      instanceTypeId: typeId,
      name: name
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
          dispatch({
            type: 'ADD CHILD',
            payload: {
              type: item.instanceType,
              typeId: item.instanceTypeId,
              childId: childId
            }
          });
        }
      }
      // if item is not a new instance, change position of element dragged inside div so that the div is the new parent
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
  const interactiveStyle = {
    border:
      state.canvasFocus.childId === childId
        ? '3px solid #186BB4'
        : '1px solid grey'
  };

  // incoporated this logic into my nesting check below caused i new error
  // if (isOver) defaultNestableStyle['yellow'];
  // defaultNestableStyle['backgroundColor'] = isOver ? 'yellow' : defaultNestableStyle['backgroundColor'];//globalDefaultStyle['backgroundColor']

  // if component is not in APP children array, it's a nested component, and should have a differend background color
  // defaultNestableStyle['backgroundColor'] = state.components[0].children.includes(childId) ? 'blue' : globalDefaultStyle['backgroundColor'];

  // console.log('APP DIRECT KIDS: ', state.components[0].children);

  const combinedStyle = combineStyles(
    combineStyles(combineStyles(defaultNestableStyle, HTMLType.style), style),
    interactiveStyle
  );

  // WHAT THE CHILDREN ARRAY LOOKS LIKE - LW
  //  ARRAY OF OBJS
  // {type: 'HTML Element', typeId: 1000, name: 'separator', childId: 1000, style: {…}, …}
  // tried adding a conditional to only run this reassignment if state.components[0]['name'] === 'App' DON'T WORK

  // state.components[0].children?.forEach(obj => {
  //     // console.log('childId : ', obj['childId'], 'childId : ', childId);
  //     if (obj['childId'] === childId) {
  //       combinedStyle['backgroundColor'] = isOver ? 'yellow' : 'grey';
  //     } else {
  //       combinedStyle['backgroundColor'] = isOver ? 'yellow' : globalDefaultStyle['backgroundColor'];
  //     }
  // });

  // trying to render components with diff background colors based on how deeply nested they were - doesnt' work as on now
  //   state.components.forEach(component => {
  //   // console.log('state.components : ', state.components)
  //     let color = 'rgb(63, 154,';
  //     let counter = -10;
  //     component.children?.forEach(obj => {
  //     // if (obj['childId'] === childId) {
  //       counter += 10;
  //       color = color + counter.toString() + ')'
  //       combinedStyle['backgroundColor'] = isOver ? 'yellow' : color;
  //     } else {
  //       combinedStyle['backgroundColor'] = isOver ? 'yellow' : globalDefaultStyle['backgroundColor'];
  //     }
  //   })
  // });

  // console.log('state: ', state);
  // helper func i created below does not work now because it cannot reference combined style from its file. - LW
  // adjustComponentColor(children, childId, state);

  //console.log('combinedStyle : ', combinedStyle);

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
        name={name}
        linkDisplayed={
          attributes && attributes.compLink ? `${attributes.compLink}` : null
        }
      />
    );
  }

  return (
    <div
      onClick={onClickHandler}
      style={combinedStyle}
      ref={ref}
      id={`canv${childId}`}
    >
      <span>
        <strong style={{ color: isThemeLight ? 'black' : 'white' }}>
          {HTMLType.placeHolderShort + ' nestable'}
        </strong>
        <strong style={{ color: '#0099E6' }}>
          {attributes && attributes.compLink ? ` ${attributes.compLink}` : ''}
        </strong>
        {routeButton}
        <DeleteButton id={childId} name={name} />
      </span>
      {renderChildren(children)}
    </div>
  );
}

export default DirectChildHTMLNestable;
