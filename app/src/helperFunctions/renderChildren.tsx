import React from 'react';
import { ChildElement } from '../interfaces/Interfaces';
import DirectChildComponent from '../components/main/DirectChildComponent';
import DirectChildHTML from '../components/main/DirectChildHTML';
import DirectChildHTMLNestable from '../components/main/DirectChildHTMLNestable';
import RouteLink from '../components/main/RouteLink';

// helper method to render all direct children of a component
// direct children are clickable and draggable
// direct children may also have their own indirect children (grandchildren, great-grandchildren, etc) which are not draggable and clickable
// there are four types of direct children that can be rendered on the screen
const renderChildren = (children: ChildElement[]) => {
  return children.map((child: ChildElement, i: number) => {
    console.log('child', child);
    const { type, typeId, style, childId, children, attributes } = child;
    // A DirectChildComponent is an instance of a top level component
    // This component will render IndirectChild components (div/components rendered inside a child component)
    if (type === 'Component') {
      return (
        <DirectChildComponent
          childId={childId}
          type={type}
          typeId={typeId}
          style={style}
          key={'DirChild' + childId.toString()}
        />
      );
    }
    // child is a non-nestable type of HTML element (everthing except for divs)
    else if (type === 'HTML Element' && typeId !== 11) {
      return (
        <DirectChildHTML
          childId={childId}
          type={type}
          typeId={typeId}
          style={style}
          key={'DirChild' + childId.toString()}
        />
      );
    }
    // child is a nestable type of HTML element (divs)
    else if (type === 'HTML Element' && typeId === 11) {
      return (
        <DirectChildHTMLNestable
          childId={childId}
          type={type}
          typeId={typeId}
          style={style}
          children={children}
          key={'DirChild' + childId.toString()}
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
          key={'DirChild' + childId.toString()}
        />
      );
    }
  });
};

export default renderChildren;
