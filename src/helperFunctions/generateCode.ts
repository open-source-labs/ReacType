import { format } from 'prettier';
import { Component, State, ChildElement } from '../interfaces/InterfacesNew';
import HTMLTypes from '../context/HTMLTypes';

// const initialState: State = {
//   components: [
//     {
//       id: 1,
//       name: 'index',
//       style: { backgroundColor: 'white' },
//       code: '',
//       children: [
//         {
//           type: 'Component',
//           typeId: 2,
//           childId: 1,
//           children: [],
//           style: { color: 'yello' }
//         },
//         {
//           type: 'Component',
//           typeId: 2,
//           childId: 2,
//           children: [],
//           style: {}
//         },
//         // {
//         //   type: 'HTML Element',
//         //   typeId: 1,
//         //   childId: 3,
//         //   children: [],
//         //   style: {}
//         // },
//         {
//           type: 'HTML Element',
//           typeId: 11,
//           childId: 4,
//           children: [
//             {
//               type: 'Component',
//               typeId: 2,
//               childId: 2,
//               children: [],
//               style: { height: '90%' }
//             }
//           ],
//           style: { width: '100%' }
//         }
//       ]
//     },
//     {
//       id: 2,
//       name: 'Section',
//       style: {},
//       code: '',
//       children: []
//     }
//   ],
//   rootComponents: [1],
//   canvasFocus: { componentId: 1, childId: null },
//   nextComponentId: 2,
//   nextChildId: 1
// };

// generate code based on the component heirarchy
const generateUnformattedCode = (comps: Component[], componentId: number) => {
  const components = [...comps];
  // find the component that we're going to generate code for
  const currentComponent = components.find(elem => elem.id === componentId);
  // find the unique components that we need to import into this component file
  let imports: any = [];

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
            return `<${child.tag} href=""${formatStyles(child.style)} />`;
          } else if (child.tag === 'div') {
            return `<${child.tag}${formatStyles(
              child.style
            )}>${writeNestedElements(child.children)}</${child.tag}>`;
          } else {
            return `<${child.tag}${formatStyles(child.style)}></${child.tag}>`;
          }
        }
      })
      .join(' ')}`;
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

  const stateful = true;
  const classBased = false;

  return `
    ${stateful && !classBased ? `import React, {useState} from 'react';` : ''}
    ${classBased ? `import React, {Component} from 'react';` : ''}
    ${!stateful && !classBased ? `import React from 'react';` : ''}
    ${imports
      .map((comp: string) => {
        return `import ${comp} from './${comp}.tsx'`;
      })
      .join('\n')}

      ${
        classBased
          ? `class ${currentComponent.name} extends Component {`
          : `const ${currentComponent.name} = (props) => {`
      }
      ${
        stateful && !classBased
          ? `const  [value, setValue] = useState("INITIAL VALUE");`
          : ``
      }
      ${
        classBased && stateful
          ? `constructor(props) {
        super(props);
        this.state = {}
       }`
          : ``
      }

      ${classBased ? `render(): JSX.Element {` : ``}


      
      return (
        <div className="${currentComponent.name}" style={props.style}>
        ${writeNestedElements(enrichedChildren)}
        </div>
        );
      }
      ${classBased ? `}` : ``}
      export default ${currentComponent.name};
    `;
};

// formats code with prettier linter
const formatCode = (code: string) => {
  return format(code, {
    singleQuote: true,
    trailingComma: 'es5',
    bracketSpacing: true,
    jsxBracketSameLine: true,
    parser: 'babel'
  });
};

// generate code based on component heirarchy and then return the rendered code
const generateCode = (components: Component[], componentId: number) => {
  const code = generateUnformattedCode(components, componentId);
  return formatCode(code);
};

export default generateCode;
// console.log(generateUnformattedCode(initialState.components, 1));
// console.log(generateCode(initialState.components, 1));
