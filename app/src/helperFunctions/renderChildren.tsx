import React from 'react';
import { ChildElement } from '../interfaces/Interfaces';
import DirectChildComponent from '../components/main/DirectChildComponent';
import DirectChildHTML from '../components/main/DirectChildHTML';
import DirectChildHTMLNestable from '../components/main/DirectChildHTMLNestable';
import SeparatorChild from '../components/main/SeparatorChild';
import RouteLink from '../components/main/RouteLink';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

// helper method to render all direct children of a component
// direct children are clickable and draggable
// direct children may also have their own indirect children (grandchildren, great-grandchildren, etc) which are not draggable and clickable
// there are four types of direct children that can be rendered on the screen
const renderChildren = (children: ChildElement[]) => {
  const state = useSelector((store: RootState) => store.appState);

  return children.map((child: ChildElement, i: number) => {
    const { type, style, childId, children, attributes, name } = child;
    let { typeId } = child;
    if (name === '') child.name = state.components[typeId - 1].name;
    // A DirectChildComponent is an instance of a top level component
    // This component will render IndirectChild components (div/components rendered inside a child component)
    // Removed style from prop drills so that styling isn't applied to canvas items.
    // Also added keys & removed an unnecessary div around DirChildNestables that was causing errors.
    if (type === 'Component') {
      return (
        <DirectChildComponent
          childId={childId}
          type={type}
          typeId={typeId}
          key={'DirChildComp' + childId.toString() + name}
          name={name} style={undefined} attributes={undefined} events={undefined} stateProps={[]} passedInProps={[]}        />
      );
    }
    // child is a non-nestable type of HTML element (aka NOT divs, forms, OrderedLists, UnorderedLists, menus)
    else if (
      type === 'HTML Element' &&
      typeId !== 11 &&
      typeId !== 1000 &&
      typeId !== 2 &&
      typeId !== 3 &&
      typeId !== 4 &&
      typeId !== 6 &&
      typeId !== 8 &&
      typeId !== 9 &&
      typeId !== 14 &&
      typeId !== 15 &&
      typeId !== 16 &&
      typeId !== 17 &&
      typeId !== 18 &&
      typeId !== -1 &&
      typeId !== 19
    ) {
      return (
        <DirectChildHTML
          childId={childId}
          type={type}
          typeId={typeId}
          key={'DirChildHTML' + childId.toString() + name}
          name={name} style={undefined} attributes={undefined} events={undefined} stateProps={[]} passedInProps={[]}        />
      );
    }
    // child is a nestable type of HTML element (divs, forms, OrderedLists, UnorderedLists, menus)
    else if (
      type === 'HTML Element' &&
      (typeId === 11 ||
        typeId === 2 ||
        typeId === 3 ||
        typeId === 4 ||
        typeId === 6 ||
        typeId === 8 ||
        typeId === 9 ||
        typeId === 14 ||
        typeId === 15 ||
        typeId === 16 ||
        typeId === 17 ||
        typeId === 18 ||
        typeId === -1 ||
        typeId === 19)
    ) {
      if (
        (typeId === 18 || typeId === 19) &&
        state.projectType === 'Classic React'
      )
        typeId = 18;
      if ((typeId === 17 || typeId === -1) && state.projectType === 'Next.js')
        return renderChildren(children);
      if ((typeId === 18 || typeId === 19) && state.projectType === 'Next.js')
        typeId = 19;
      return (
        <DirectChildHTMLNestable
          childId={childId}
          type={type}
          typeId={typeId}
          children={children}
          key={'DirChildHTMLNest' + childId.toString() + name}
          name={name}
          attributes={attributes} style={undefined} events={undefined} stateProps={[]} passedInProps={[]}        />
      );
    } else if (type === 'HTML Element' && typeId === 1000) {
      return (
        <SeparatorChild
          childId={childId}
          type={type}
          typeId={typeId}
          children={children}
          key={'SeparatorChild' +
            childId.toString() +
            name +
            (Math.random() * 1000).toString()}
          name={name} style={undefined} attributes={undefined} events={undefined} stateProps={[]} passedInProps={[]}        />
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
          name={name} style={undefined} attributes={undefined} events={undefined} stateProps={[]} passedInProps={[]}        />
      );
    }
  });
};
// removed style from prop drilling
export default renderChildren;
