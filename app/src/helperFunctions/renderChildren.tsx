import React, { useContext } from 'react';
import { ChildElement } from '../interfaces/Interfaces';
import DirectChildComponent from '../components/main/DirectChildComponent';
import DirectChildHTML from '../components/main/DirectChildHTML';
import DirectChildHTMLNestable from '../components/main/DirectChildHTMLNestable';
import RouteLink from '../components/main/RouteLink';
import StateContext from '../context/context';

// helper method to render all direct children of a component
// direct children are clickable and draggable
// direct children may also have their own indirect children (grandchildren, great-grandchildren, etc) which are not draggable and clickable
// there are four types of direct children that can be rendered on the screen
const renderChildren = (children: ChildElement[]) => {
  console.log('render children', children)
  const [state, dispatch] = useContext(StateContext);
  return children.map((child: ChildElement, i: number) => {
    const { type, typeId, style, childId, children, attributes, name } = child;
    if (name === '') child.name = state.components[typeId - 1].name;
    // A DirectChildComponent is an instance of a top level component
    // This component will render IndirectChild components (div/components rendered inside a child component)
    if (type === 'Component') {
      return (
        <DirectChildComponent
          childId={childId}
          type={type}
          typeId={typeId}
          style={style}
          key={'DirChildComp' + childId.toString() + name}
          name={child.name}
        />
      );
    }
    // child is a non-nestable type of HTML element (everything except for divs)
    else if (type === 'HTML Element' && typeId !== 11 && typeId !== 1000) {
      return (
        <DirectChildHTML
          childId={childId}
          type={type}
          typeId={typeId}
          style={style}
          key={'DirChildHTML' + childId.toString() + name}
          name={child.name}
        />
      );
    }
    // child is a nestable type of HTML element (divs)
    else if (type === 'HTML Element' && typeId === 11) {
      console.log('renderChildren top child', child)
      return (
        <DirectChildHTMLNestable
          childId={childId}
          type={type}
          typeId={typeId}
          style={style}
          children={children}
          key={'DirChildHTMLNest' + childId.toString() + name}
          name={child.name}
        />
      );
    }
    else if (type === 'HTML Element' && typeId === 1000) {
      console.log('renderChildren separator', child)

      return (
        <DirectChildHTMLNestable
          childId={childId}
          type={type}
          typeId={typeId}
          style={style}
          children={children}
          key={'DirChildHTMLNest' + childId.toString() + name}
          name={child.name}
        />
      );
    }
    // A route link is a next.js navigation link
    // The route link component includes a clickable link that, when clicked, will change the user focus to the referenced component
    else if (type === 'Route Link') {
      return (
        <RouteLink
          childId={childId}
          type={type}
          typeId={typeId}
          style={style}
          children={children}
          key={'RouteLink' + childId.toString() + name}
          name={child.name}
        />
      );
    }
  });
};

export default renderChildren;
