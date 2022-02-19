import React, { useContext } from 'react';
import { ChildElement } from '../interfaces/Interfaces';
import DirectChildComponent from '../components/main/DirectChildComponent';
import DirectChildHTML from '../components/main/DirectChildHTML';
import DirectChildHTMLNestable from '../components/main/DirectChildHTMLNestable';
import SeparatorChild from '../components/main/SeparatorChild';
import RouteLink from '../components/main/RouteLink';
import StateContext from '../context/context';

// helper method to render all direct children of a component
// direct children are clickable and draggable
// direct children may also have their own indirect children (grandchildren, great-grandchildren, etc) which are not draggable and clickable
// there are four types of direct children that can be rendered on the screen
const renderChildren = (children: ChildElement[]) => {
  const [state, dispatch] = useContext(StateContext);
  return children.map((child: ChildElement, i: number) => {
    const { type, typeId, style, childId, children, attributes, name, annotations} = child;
    if (name === '') child.name = state.components[typeId - 1].name;
    // A DirectChildComponent is an instance of a top level component
    // This component will render IndirectChild components (div/components rendered inside a child component)
    // Removed style from prop drills so that styling isn't applied to canvas items.
    // Also added keys & removed an unnecessary div around DirChildNestables that were causing errors.
    if (type === 'Component') {
      return (
        <DirectChildComponent
          childId={childId}
          type={type}
          typeId={typeId}
          key={'DirChildComp' + childId.toString() + name}
          name={name}
          annotations={annotations}
        />
      );
    }
    // ommitted orderedlists, unorderedlists, and menus, ommitted li items as non-nestable types because they can be nested within.
    // child is a non-nestable type of HTML element (everything except for divs and forms)
    else if (type === 'HTML Element' && typeId !== 11 && typeId !== 1000 && typeId !== 2 && typeId !== 3 && typeId !== 14 && typeId !== 15 && typeId !== 16 && typeId !== 17 && typeId !== 18 && typeId !== -1 && typeId !== 19) {
      return (
        <DirectChildHTML
          childId={childId}
          type={type}
          typeId={typeId}
          key={'DirChildHTML' + childId.toString() + name }
          name={name}
          annotations={annotations}
        />
      );
    }
    // Added Orderedlists, Unorderedlists, and Menus, changed lists to nestable because they are nestable.
    // child is a nestable type of HTML element (divs and forms)
    else if (type === 'HTML Element' && (typeId === 11 || typeId === 2 || typeId === 3 || typeId === 14 || typeId === 15 || typeId === 16 || typeId === 17 || typeId === 18 || typeId === -1 || typeId === 19)) {
      return (
        <DirectChildHTMLNestable
          childId={childId}
          type={type}
          typeId={typeId}
          children={children}
          key={'DirChildHTMLNest' + childId.toString() + name}
          name={name}
          annotations={annotations}
          attributes={attributes}
        />
      );
    }
    else if (type === 'HTML Element' && typeId === 1000 ) {
      return (
        <SeparatorChild
          childId={childId}
          type={type}
          typeId={typeId}
          children={children}
          key={'SeparatorChild' + childId.toString() + name + (Math.random()*1000).toString()}
          name={name}
        />
      );
    }
    // A route link is a next.js or gatsby.js navigation link
    // The route link component includes a clickable link that, when clicked, will change the user focus to the referenced component
    else if (type === 'Route Link') {
      return (
        <RouteLink
          childId={childId}
          type={type}
          typeId={typeId}
          children={children}
          key={'RouteLink' + childId.toString() + name}
          name={name}
        />
      );
    }
  });
};
// removed style from prop drilling
export default renderChildren;
