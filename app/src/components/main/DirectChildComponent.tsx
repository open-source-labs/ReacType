import React, {  useContext, } from 'react';
import {
  Component,
  ChildElement,
  HTMLType
} from '../../interfaces/Interfaces';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';
import StateContext from '../../context/context';
import { combineStyles } from '../../helperFunctions/combineStyles';
import IndirectChild from './IndirectChild';
import globalDefaultStyle from '../../public/styles/globalDefaultStyles';

function DirectChildComponent({ childId, type, typeId, style }: ChildElement) {
  const [state, dispatch] = useContext(StateContext);

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
      childId: childId,
      instanceType: type,
      instanceTypeId: typeId
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
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
  // priority order is 1) style directly set for this child (style), 2) style of the referenced component, and 3) default styling
  const interactiveStyle = {
    border:
      state.canvasFocus.childId === childId
        ? '3px solid #a7cced'
        : '1px Solid grey',
    boxShadow:
      state.canvasFocus.childId === childId ? '1px 1px 3px #a7cced' : ''
  };

  const combinedStyle = combineStyles(
    combineStyles(
      combineStyles(globalDefaultStyle, referencedComponent.style),
      style
    ),
    interactiveStyle
  );

  // helper function to render children of direct child components
  // all children of direct child components will be indirect components
  // indirect child components are not interactive with the exception of route links which, when clicked, will change the canvas focus
  const renderIndirectChildren = (
    referencedComponent: Component | ChildElement
  ) => {
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
            key={
              'indChild' + child.childId.toString() + child.typeId.toString()
            }
            style={combinedStyle}
            placeHolder=""
            linkId={null}
          >
            {renderIndirectChildren(childReferencedComponent)}
          </IndirectChild>
        );
      } else if (child.type === 'HTML Element') {
        // if indirect child is an HTML element, render an IndirectChild component with no children
        // if the HTML element has children, then also render its children
        // get the default style/placeholder value for that type of HTML element
        // combine the default style of that HTML element and combine in with the custom styles applied to that element
        const HTMLType: HTMLType = state.HTMLTypes.find(
          (type: HTMLType) => type.id === child.typeId
        );
        const HTMLDefaultStyle = HTMLType.style;
        const HTMLDefaultPlaceholder = HTMLType.placeHolderShort;
        const combinedStyle = combineStyles(HTMLDefaultStyle, child.style);
        return (
          <React.Fragment
            key={
              'indChildFrag' +
              child.childId.toString() +
              child.typeId.toString()
            }
          >
            {child.children.length === 0 ? (
              <IndirectChild
                style={combinedStyle}
                placeHolder={HTMLDefaultPlaceholder}
                linkId={null}
                key={
                  'indChildHTML' +
                  child.childId.toString() +
                  child.typeId.toString()
                }
              >
                {''}
              </IndirectChild>
            ) : (
              <IndirectChild
                style={combinedStyle}
                placeHolder={HTMLDefaultPlaceholder}
                linkId={null}
                key={
                  'indChildNest' +
                  child.childId.toString() +
                  child.typeId.toString()
                }
              >
                {renderIndirectChildren(child)}
              </IndirectChild>
            )}
          </React.Fragment>
        );
      } else if (child.type === 'Route Link') {
        // Render a next.js route link
        // pass the component id of the component referenced in the link as a prop
        // IndirectChild will render the referenced component name as a clickable link
        return (
          <IndirectChild
            key={
              'RouteLink' + child.childId.toString() + child.typeId.toString()
            }
            style={combinedStyle}
            placeHolder=""
            linkId={child.typeId}
          >
            {''}
          </IndirectChild>
        );
      }
    });
  };
  return (
    <div
      onClick={onClickHandler}
      // key={'childComp' + childId}
      style={combinedStyle}
      ref={drag}
    >
      {renderIndirectChildren(referencedComponent)}
    </div>
  );
}

export default DirectChildComponent;
