import { ComponentInt, ComponentsInt, ChildInt, ChildrenInt, PropInt } from './Interfaces.ts';
import cloneDeep from './cloneDeep.ts';

const componentRender = (component: ComponentInt, components: ComponentsInt) => {
  const {
    childrenArray,
    title,
    props,
  }: {
    childrenArray: ChildrenInt;
    title: string;
    props: PropInt[];
  } = component;

  function typeSwitcher(type: string) {
    switch (type) {
      case 'string':
        return 'string';
      case 'number':
        return 'number';
      case 'object':
        return 'object';
      case 'array':
        return 'any[]';
      case 'bool':
        return 'boolean';
      case 'function':
        return '() => any';
      // case 'symbol':
      //   return 'string';
      case 'node':
        return 'string';
      case 'element':
        return 'string';
      case 'tuple':
        return '[any]';
      case 'enum':
        return '{}';
      case 'any':
        return 'any';
      default:
        return 'any';
    }
  }

  function propDrillTextGenerator(child: ChildInt) {
    if (child.childType === 'COMP') {
      return components
        .find((c: any) => c.id === child.childComponentId)
        .props.map((prop: PropInt) => `${prop.key}={${prop.value}}`)
        .join(' ');
    }
    if (child.childType === 'HTML') {
      const keys: string[] = Object.keys(child.HTMLInfo);
      return keys.map(key => `${key}={${htmlAttrSanitizer(child.HTMLInfo[key])}}`).join(' ');
    }
    return '';
  }

  function htmlAttrSanitizer(element: string) {
    // this shouldn't be needed, but some characters make localForage unhappy
    return element.replace(/[a-z]+/gi, word => word[0].toUpperCase() + word.slice(1)).replace(/[-_\s0-9\W]+/gi, '');
  }

  function componentNameGenerator(child: ChildInt) {
    if (child.childType === 'HTML') {
      switch (child.componentName) {
        case 'Image':
          return 'img';
        case 'Form':
          return 'form';
        case 'Button':
          return 'button';
        case 'Link':
          return 'a href=""';
        case 'List':
          return 'ul';
        case 'Paragraph':
          return 'p';
        default:
          return 'div';
      }
    } else {
      return child.componentName;
    }
  }

  return `
    import React from 'react';
    ${childrenArray
      .filter(child => child.childType !== 'HTML')
      .map(child => `import ${child.componentName} from './${child.componentName}.tsx'`)
      .reduce((acc: Array<string>, child) => {
        if (!acc.includes(child)) {
          acc.push(child);
          return acc;
        }
        return acc;
      }, [])
      .join('\n')}
    
    type Props = {
      ${props.map(prop => `${prop.key}: ${typeSwitcher(prop.type)}`).join('\n')}
    }

    const ${title} = (props: Props) => {
      const {${props.map(el => el.key).join(',\n')}} = props
      
      return (
        <div>
        ${cloneDeep(childrenArray)
          .sort((a: ChildInt, b: ChildInt) => a.childSort - b.childSort)
          .map((child: ChildInt) => `<${componentNameGenerator(child)} ${propDrillTextGenerator(child)}/>`)
          .join('\n')}
        </div>
      );
    }
    export default ${title};
  `;
};

export default componentRender;
