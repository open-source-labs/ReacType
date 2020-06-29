import React from 'react';
import { Component, ChildElement } from '../interfaces/InterfacesNew';
import DirectChildComponent from '../components/main/DirectChildComponentNew';
import DirectChildHTML from '../components/main/DirectChildHTMLNew';
import DirectChildHTMLNestable from '../components/main/DirectChildHTMLNestableNew';

// helper method to render all direct children of a component
// there are three types of direct children that can be rendered on the screen
const renderChildren = (children: ChildElement[]) => {
  return children.map((child: ChildElement, i: number) => {
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
          key={childId.toString()}
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
          attributes={attributes}
          key={childId.toString()}
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
          attributes={attributes}
          key={childId.toString()}
        />
      );
    }
  });
};

export default renderChildren;
