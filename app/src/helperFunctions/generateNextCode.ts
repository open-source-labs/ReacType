import { format } from 'prettier';
import { Component, State, ChildElement } from '../interfaces/InterfacesNew';
import HTMLTypes from '../context/HTMLTypes';

//this is nearly identical to generateCode.ts but accounts for pages referencing imports in the components subfolder

// generate code based on the component heirarchy
const generateUnformattedCode = (comps: Component[], componentId: number, rootComponents: number[]) => {
  const components = [...comps];
  // find the component that we're going to generate code for
  const currentComponent = components.find(elem => elem.id === componentId);
  // find the unique components that we need to import into this component file
  let imports: any = [];

  const isRoot = rootComponents.includes(componentId);

  // get metadata for each child
  const getEnrichedChildren = (currentComponent: Component | ChildElement) => {
    const enrichedChildren = currentComponent.children.map((elem: any) => {
      const child = { ...elem };
      if (child.type === 'Component') {
        const referencedComponent = components.find(
          elem => elem.id === child.typeId
        );
        if (!imports.includes(referencedComponent.name))
          imports.push(referencedComponent.name);
        child['name'] = referencedComponent.name;
        return child;
      } else if (child.type === 'HTML Element') {
        const referencedHTML = HTMLTypes.find(elem => elem.id === child.typeId);
        child['tag'] = referencedHTML.tag;
        if (referencedHTML.tag === 'div') {
          child.children = getEnrichedChildren(child);
        }
        return child;
      }
    });
    return enrichedChildren;
  };

  const writeNestedElements = (enrichedChildren: any) => {
    return `${enrichedChildren
      .map((child: any) => {
        if (child.type === 'Component') {
          return `<${child.name}${formatStyles(child.style)} />`;
        } else if (child.type === 'HTML Element') {
          if (child.tag === 'img') {
            return `<${child.tag} src=""${formatStyles(child.style)} />`;
          } else if (child.tag === 'a') {
            return `<${child.tag} href=""${formatStyles(child.style)}>[LINK]</${child.tag}>`;
          } else if (child.tag === 'div') {
            return `<${child.tag}${formatStyles(
              child.style
            )}>${writeNestedElements(child.children)}</${child.tag}>`;
          } else if (child.tag === 'h1') {
            return `<${child.tag}${formatStyles(child.style)}>HEADER 1</${child.tag}>`;
          } else if (child.tag === 'h2') {
            return `<${child.tag}${formatStyles(child.style)}>HEADER 2</${child.tag}>`;
          } else if (child.tag === 'form') {
            return `<${child.tag}${formatStyles(child.style)}>FORM</${child.tag}>`;
          } else if (child.tag === 'p') {
            return `<${child.tag}${formatStyles(child.style)}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</${child.tag}>`;
          } else if (child.tag === 'li') {
            return `<ul${formatStyles(child.style)}><li>item 1</li>
            <li>item 2</li>
            <li>item 3</li></ul>`;
          } else if (child.tag === 'button'){
            return `<${child.tag}${formatStyles(child.style)}>BUTTON</${child.tag}>`;
          } else {
            return `<${child.tag}${formatStyles(child.style)}></${child.tag}>`;
          }
        }
      })
      .join('\n')}`;
  };

  const formatStyles = (styleObj: any) => {
    if (Object.keys(styleObj).length === 0) return ``;
    const formattedStyles = [];
    for (let i in styleObj) {
      const styleString = i + ': ' + "'" + styleObj[i] + "'";
      formattedStyles.push(styleString);
    }
    return ' style={{' + formattedStyles.join(',') + '}}';
  };

  const enrichedChildren: any = getEnrichedChildren(currentComponent);

  console.log(enrichedChildren);

  // import statements differ between root (pages) and regular components (components)
  const importsMapped = imports.map((comp: string) => {
    return isRoot ? `import ${comp} from '../components/${comp}'`: `import ${comp} from './${comp}'`;
  })
  .join('\n')

  return `
    import React, { useState } from 'react';
    
    ${importsMapped}

      const ${currentComponent.name} = (props) => {
      
        const  [value, setValue] = useState("INITIAL VALUE");
      
      return (
        <div className="${currentComponent.name}" style={props.style}>
        ${writeNestedElements(enrichedChildren)}
        </div>
        );
      }
      
      export default ${currentComponent.name};
    `;
};

// formats code with prettier linter
const formatCode = (code: string) => {
  return window.api.formatCode(code);
  // return format(code, {
  //   singleQuote: true,
  //   trailingComma: 'es5',
  //   bracketSpacing: true,
  //   jsxBracketSameLine: true,
  //   parser: 'babel'
  // });
};

// generate code based on component heirarchy and then return the rendered code
const generateNextCode = (components: Component[], componentId: number, rootComponents: number[]) => {
  const code = generateUnformattedCode(components, componentId, rootComponents);
  return formatCode(code);
};

export default generateNextCode;

