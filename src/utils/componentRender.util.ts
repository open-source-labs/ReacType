import { cloneDeep } from './index.util';
import { ComponentState, ChildState, Prop } from '../types/types';

const typeSwitcher = (type: string) => {
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

const htmlAttrSanitizer = (element: string) => {
  // TODO: debug localForage unhappiness to renable image imports
  // this shouldn't be needed, but some characters make localForage unhappy
  return element
    .replace(/[a-z]+/gi, (word) => word[0].toUpperCase() + word.slice(1))
    .replace(/[-_\s0-9\W]+/gi, '');
}

const propDrillTextGenerator = (child: ChildState, components: ComponentState[]) => {
  if (child.childType === 'COMP') {
    return components
      .find((c: any) => c.id === child.childComponentId)
      .props.map((prop: Prop) => `${prop.key}={${prop.value}}`)
      .join(' ');
  }
  if (child.childType === 'HTML') {
    const keys: string[] = Object.keys(child.HTMLInfo);
    return keys
      .map((key) => `${key}={${htmlAttrSanitizer(child.HTMLInfo[key])}}`)
      .join(' ');
  }
  return '';
}

const componentNameGenerator = (child: ChildState) => {
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

const componentRender = (component: ComponentState, components: ComponentState[]) => {
  const { children, title, props } : {
  children: ChildState[];
  title: string;
  props: Prop[];
  } = component;

  return `
    import React from 'react';
    ${children
    .filter(child => child.childType !== 'HTML')
    .map(child => `import ${child.componentName} from './${child.componentName}.tsx'`)
    .reduce((acc: string[], child) => {
      if (!acc.includes(child)) {
        acc.push(child);
        return acc;
      }
    }, [])
    .join('\n')}
    
    type Props = {
      ${props
        .map((prop) => `${prop.key}: ${typeSwitcher(prop.type)}`)
        .join('\n')}
    }

    const ${title} = (props: Props) => {
      const {${props.map((el) => el.key).join(',\n')}} = props
      
      return (
        <div>
        ${cloneDeep(children)
    .sort((a: ChildState, b: ChildState) => a.childSort - b.childSort)
    .map(
      (child: ChildState) => `<${componentNameGenerator(child)} ${propDrillTextGenerator(child, components)}/>`,
    )
    .join('\n')}
        </div>
      );
    }
    export default ${title};
  `;
};

export default componentRender;
