import React, { useMemo, useContext, useRef } from 'react';
import {
  State,
  Component,
  ChildElement,
  HTMLType
} from '../../interfaces/InterfacesNew';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';
import { stateContext } from '../../context/context';
import { combineStyles } from '../../helperFunctions/combineStyles';
import IndirectChild from './IndirectChildNew';
import HTMLTypes from '../../HTMLTypes';
import globalDefaultStyle from '../../globalDefaultStyles';

function DirectChildComponent({ childId, type, typeId, style }: ChildElement) {
  const [state, dispatch] = useContext(stateContext);
  const ref = useRef(null);

  // find the top-level component corresponding to this instance of the component
  // find the current component to render on the canvas
  const referencedComponent: Component = state.components.find(
    (elem: Component) => elem.id === typeId
  );

  const [{ isDragging }, drag] = useDrag({
    // setting item attributes to be referenced when updating state with new instance of dragged item
    item: {
      type: ItemTypes.INSTANCE,
      newInstance: false,
      id: childId
    },
    // canDrag: !props.children.length,
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging()
    })
  });

  const changeFocus = (componentId: number, childId: number | null) => {
    dispatch({ type: 'CHANGE FOCUS', payload: { componentId, childId } });
  };

  // onClickHandler is responsible for changing the focus of the "focused" component to be the canvas when the canvas is clicked
  // TODO: stopPropogation is returning a CORS error
  function onClickHandler(event) {
    // console.log(event);
    // event.stopPropogation();

    console.log('You have clicked a DIRECT CHILD COMPONENT: ', childId);
    // keep the component focus the same as the current state, but update the child focus to null
    // a "null" value for the child component signifies that we're solely focusing on the parent component
    // changeFocus(state.canvasFocus.componentId, childId);
  }

  // combine all styles so that higher priority style specifications overrule lower priority style specifications
  // priority order is 1) style directly set for this child (style), 2) style of the referenced component, and 3) default styling

  const combinedStyle = combineStyles(
    combineStyles(globalDefaultStyle, referencedComponent.style),
    style
  );

  // helper function to render children of direct child components
  const renderIndirectChildren = (referencedComponent: Component) => {
    // iterate through all children of referenced
    return referencedComponent.children.map(child => {
      if (child.type === 'Component') {
        // If indirect child of referenced component is a component, find the top level component referenced by the child
        const childReferencedComponent: Component = state.components.find(
          (elem: Component) => elem.id === child.typeId
        );
        // combine the styles of the child with the reference component but give higher priority to the child's styles
        const combinedStyle = combineStyles(
          childReferencedComponent.style,
          child.style
        );
        // render an IndirectChild component, and also call renderIndirectChildren recursively to render any of the child Component's children
        return (
          <IndirectChild
            // combine styles of instance and referenced component. instance styles have higher priority
            style={combinedStyle}
            placeHolder=""
          >
            {/* {childReferencedComponent.name} */}
            {renderIndirectChildren(childReferencedComponent)}
          </IndirectChild>
        );
      } else {
        // if indirect chidl is an HTML element, render an IndirectChild component with no children
        // get the default style/placeholder value for that type of HTML element
        const HTMLType: HTMLType = HTMLTypes.find(
          (type: HTMLType) => type.id === child.typeId
        );
        const HTMLDefaultStyle = HTMLType.style;
        const HTMLDefaultPlacholder = HTMLType.placeHolderShort;
        // combine HTML default stuyles with styles applied to the ichild but give priority to styles applied to the child
        const combinedStyle = combineStyles(HTMLDefaultStyle, child.style);
        // find the default style of that HTML element and combine in with the custom styles applied to that element
        return (
          <IndirectChild
            style={combinedStyle}
            placeHolder={HTMLDefaultPlacholder}
          />
        );
      }
    });
  };
  return (
    <div onClick={() => onClickHandler(event)} style={combinedStyle} ref={drag}>
      {renderIndirectChildren(referencedComponent)}
    </div>
  );
}

export default DirectChildComponent;
