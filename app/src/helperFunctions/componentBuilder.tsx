import React from 'react';
import MUITypes from '../redux/MUITypes';
import { ChildElement, MUIComponent } from '../interfaces/Interfaces';

/**
 * Function to build React components recursively from an array of child elements.
 * @param {Array<ChildElement | MUIComponent>} array - Array of child elements or MUI components (created by MUIItem.tsx).
 * @param {number} key - Key to assign to the components being rendered.
 * @returns {React.ReactNode[]} - Array of React components to render.
 */
const componentBuilder = (
  array: Array<ChildElement | MUIComponent>,
  key: number = 0
): React.ReactNode[] => {
  const componentsToRender = [];
  for (const element of array) {
    if (element.name === 'separator') continue;
    const elementType = element.name;
    const childId = element.childId;
    const elementStyle = element.style;
    const innerText = element.attributes.compText;
    const classRender = element.attributes.cssClasses;
    const activeLink = element.attributes.compLink;

    let renderedChildren =
      element.children.length > 0
        ? componentBuilder(element.children, ++key)
        : undefined;

    if (element.type === 'MUI Component') {
      const baseData = MUITypes.find(
        (m) => m.tag === elementType
      ).componentData;
      if (!baseData) return null;
      const componentData = {
        ...baseData,
        props: {
          ...baseData.props,
          key: ++key,
          children: renderedChildren
        }
      };
      componentsToRender.push(JSON.stringify(componentData));

      // const serializedHtmlContent = JSON.stringify(htmlContent);
    } else {
      let Component;
      switch (elementType) {
        case 'input':
          Component = 'input';
          break;
        case 'img':
        case 'Image':
          Component = 'img';
          break;
        case 'a':
          Component = 'a';
          break;
        case 'Switch':
          Component = 'Switch';
          break;
        case 'Route':
          Component = 'Route';
          break;
        default:
          Component = elementType;
          break;
      }
      const childrenContent = [];
      if (innerText) childrenContent.push(innerText);
      if (renderedChildren) childrenContent.push(...renderedChildren);
      const props = {
        ...element.attributes,
        className: classRender,
        style: elementStyle,
        key: ++key,
        id: `rend${childId}`,
        ...(elementType === 'img' || elementType === 'Image'
          ? { src: activeLink }
          : {}),
        ...(elementType === 'a' || elementType === 'Link'
          ? { href: activeLink }
          : {})
      };

      componentsToRender.push(
        <Component {...props}>
          {childrenContent.length > 0
            ? childrenContent.map((child, index) => (
                <React.Fragment key={index}>{child}</React.Fragment>
              ))
            : null}
        </Component>
      );
    }
    key++;
  }
  return componentsToRender;
};

export default componentBuilder;
