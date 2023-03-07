import { element } from 'prop-types';
import store from '../redux/store.js';
import {
  Component,
  State,
  ChildElement,
  HTMLType
} from '../interfaces/Interfaces';

import initialState from '../context/initialState' 
// let tailwind = initialState.tailwind;

declare global {
  interface Window {
    api: any;
  }
}
// generate code based on component hierarchy and then return the rendered code
const generateCode = (
  components: Component[],
  componentId: number,
  rootComponents: number[],
  projectType: string,
  HTMLTypes: HTMLType[],
  tailwind:boolean
) => {
  const code = generateUnformattedCode(
    components,
    componentId,
    rootComponents,
    projectType,
    HTMLTypes,
    tailwind
    
  );
  return formatCode(code);
};

// generate code based on the component hierarchy
const generateUnformattedCode = (
  comps: Component[],
  componentId: number,
  rootComponents: number[],
  projectType: string,
  HTMLTypes: HTMLType[],
  tailwind: boolean
) => {
  console.log(tailwind)
  const components = [...comps];
  // find the component that we're going to generate code for
  const currComponent = components.find((elem) => elem.id === componentId);
  // find the unique components that we need to import into this component file
  let imports: any = [];
  let providers: string = '';
  let context: string = '';
  let links: boolean = false;
  let images: boolean = false;
  const isRoot = rootComponents.includes(componentId);
  let importReactRouter = false;
  // returns an array of objects which may include components, html elements, and/or route links
  const getEnrichedChildren = (currentComponent: Component | ChildElement) => {
    // declare an array of enriched children
    const enrichedChildren = currentComponent.children?.map((elem: any) => {
      //enrichedChildren is iterating through the children array
      const child = { ...elem };
      // check if child is a component
      if (child.type === 'Component') {
        // verify that the child is in the components array in state
        const referencedComponent = components.find(
          (elem) => elem.id === child.typeId
        );
        // check if imports array include the referenced component, if not, add its name to the imports array (e.g. the name/tag of the component/element)
        if (!imports.includes(referencedComponent.name))
          imports.push(referencedComponent.name);
        child['name'] = referencedComponent.name;
        return child;
      } else if (child.type === 'HTML Element') {
        const referencedHTML = HTMLTypes.find(
          (elem) => elem.id === child.typeId
        );
        // console.log('html',child);
        child['tag'] = referencedHTML.tag;
        if (
          referencedHTML.tag === 'div' ||
          referencedHTML.tag === 'separator' ||
          referencedHTML.tag === 'form' ||
          referencedHTML.tag === 'ul' ||
          referencedHTML.tag === 'ol' ||
          referencedHTML.tag === 'menu' ||
          referencedHTML.tag === 'li' ||
          referencedHTML.tag === 'Link' ||
          referencedHTML.tag === 'Switch' ||
          referencedHTML.tag === 'Route' ||
          referencedHTML.tag === 'Image'
        ) {
          child.children = getEnrichedChildren(child);
        }

        // when we see a Switch or LinkTo, import React Router
        if (
          (referencedHTML.tag === 'Switch' || referencedHTML.tag === 'Route') &&
          projectType === 'Classic React'
        )
          importReactRouter = true;
        else if (referencedHTML.tag === 'Link') links = true;
        if (referencedHTML.tag === 'Image') images = true;
        return child;
      } else if (child.type === 'Route Link') {
        links = true;
        child.name = components.find(
          (comp: Component) => comp.id === child.typeId
        ).name;
        return child;
      }
    });
    return enrichedChildren;
  };
  // Raised formatStyles so that it is declared before it is referenced. It was backwards.
  // format styles stored in object to match React inline style format
  const formatStyles = (styleObj: any) => {
    if (Object.keys(styleObj).length === 0) return ``;
    const formattedStyles = [];
    let styleString;
    for (let i in styleObj) {
      if (i === 'style') {
        styleString = i + '=' + '{' + JSON.stringify(styleObj[i]) + '}';
        formattedStyles.push(styleString);
      }
    }
    return formattedStyles;
  };
  // function to dynamically add classes, ids, and styles to an element if it exists.
  //LEGACY PD: CAN ADD PROPS HERE AS JSX ATTRIBUTE
  const elementTagDetails = (childElement: object) => {
   console.log('from the style area',tailwind)
    let customizationDetails = '';
    let passedInPropsString = '';
    if (childElement.type === 'Component') {
      let childComponent;
      for (let i = 0; i < components.length; i++) {
        if (childElement.name === components[i].name) {
          childComponent = components[i];
        }
      }
      childComponent.passedInProps.forEach((prop) => {
        passedInPropsString += `${prop.key} = {${prop.key}} `;
      });
    }

    if (childElement.childId && childElement.tag !== 'Route')
      customizationDetails += ' ' + `id="${+childElement.childId}" ` + `${passedInPropsString}`;
    
    if (childElement.attributes && childElement.attributes.cssClasses) {
      customizationDetails +=
        ' ' + `className="${childElement.attributes.cssClasses}"`;
    }
    if (childElement.style && Object.keys(childElement.style).length > 0 && tailwind === false) customizationDetails += ' ' + formatStyles(childElement);
    if (childElement.style && Object.keys(childElement.style).length > 0 && tailwind === true){
      console.log(childElement.style, 'shouldsaytrue',tailwind)
      let {height, alignItems, backgroundColor, display, flexDirection,width, justifyContent} = childElement.style;
      let w , h , items , bg , d , flexDir , justCon;
     if(childElement.style.alignItems){
      // let alignItems = childElement.style.alignItems
     if( alignItems === "center") items = "items-center, ";
     else if( alignItems === "flex-end") items = "items-end, ";
     }
     if(childElement.style.backgroundColor){
      // let backgroundColor = childElement.style.backgroundColor;
      bg = `bg-[${backgroundColor}], `
     }
     if(childElement.style.display){
      // let display = childElement.style.display;
      if(display === "flex") d = "flex, "
     }
     if(childElement.style.flexDirection){
      // let flexDirection = childElement.style.flexDirection
      if(flexDirection === "column") flexDir = "flex-col, "
     }
     if(childElement.style.height){
      // let height = childElement.style.height;
      if(height === "100%") h = "h-full, "
     }
     if(childElement.style.justifyContent){
      // let justifyContent = childElement.style.justifyContent
      if(justifyContent === "center") justCon = "justify-center, "

     }
     if(childElement.style.width){
      // let width = childElement.style.width;
      if(width === "100%") w = "w-full, "

     } 
     
      customizationDetails += ' ' + `className = "${w ? w: '' }${h ? h : ''}${justCon ? justCon: ''}${flexDir ? flexDir: ''}${d ? d : ''}${bg ? bg : ''}${items ? items : ''}"`;
    }
     

    if (childElement.events && Object.keys(childElement.events).length > 0) {
      // SPACE BETWEEN ATTRIBUTE EXPRESSIONS
      for (const [event, funcName] of Object.entries(childElement.events)) {
        customizationDetails += ' ' + `${event}={(event) => ${funcName}()}`;
      }
    }

    return customizationDetails;
  };
  // function to fix the spacing of the ace editor for new lines of added content. This was breaking on nested components, leaving everything right justified.
  const tabSpacer = (level: number) => {
    let tabs = '  ';
    for (let i = 0; i < level; i++) tabs += '  ';
    return tabs;
  };
  // function to dynamically generate the appropriate levels for the code preview
  const levelSpacer = (level: number, spaces: number) => {
    if (level === 2) return `\n${tabSpacer(spaces)}`;
    else return '';
  };
  // function to dynamically generate a complete html (& also other library type) elements
  const elementGenerator = (childElement: object, level: number = 2) => {
    let innerText = '';
    let activeLink = '""';
    if (childElement.attributes && childElement.attributes.compText) {
      if (childElement.stateUsed && childElement.stateUsed.compText) {
        innerText = '{' + childElement.stateUsed.compText + '}';
      } else {
        innerText = childElement.attributes.compText;
      }
    }
    if (childElement.attributes && childElement.attributes.compLink) {
      if (childElement.stateUsed && childElement.stateUsed.compLink) {
        activeLink = '{' + childElement.stateUsed.compLink + '}';
      } else {
        activeLink = '"' + childElement.attributes.compLink + '"';
      }
    }
    const nestable =
      childElement.tag === 'div' ||
      childElement.tag === 'form' ||
      childElement.tag === 'ol' ||
      childElement.tag === 'ul' ||
      childElement.tag === 'menu' ||
      childElement.tag === 'li' ||
      childElement.tag === 'Switch' ||
      childElement.tag === 'Route';

    if (childElement.tag === 'img') {
      return `${levelSpacer(level, 5)}<${
        childElement.tag
      } src=${activeLink} ${elementTagDetails(childElement)}/>${levelSpacer(
        2,
        3 + level
      )}`;
    } else if (childElement.tag === 'a') {
      return `${levelSpacer(level, 5)}<${
        childElement.tag
      } href=${activeLink} ${elementTagDetails(childElement)}>${innerText}</${
        childElement.tag
      }>${levelSpacer(2, 3 + level)}`;
    } else if (childElement.tag === 'input') {
      return `${levelSpacer(level, 5)}<${childElement.tag}${elementTagDetails(
        childElement
      )}></${childElement.tag}>${levelSpacer(2, 3 + level)}`;
    } else if (childElement.tag === 'Link' && projectType === 'Classic React') {
      return `${levelSpacer(level, 5)}<Link to=${activeLink}${elementTagDetails(
        childElement
      )}>
        ${tabSpacer(level)}${writeNestedElements(
        childElement.children,
        level + 1
      )}${innerText}
        ${tabSpacer(level - 1)}</Link>${levelSpacer(2, 3 + level)}`;
    } else if (childElement.tag === 'Link' && projectType === 'Next.js') {
      return `${levelSpacer(
        level,
        5
      )}<Link href=${activeLink}${elementTagDetails(childElement)}>
        ${tabSpacer(level)}<a>${innerText}${writeNestedElements(
        childElement.children,
        level + 1
      )}</a>
        ${tabSpacer(level - 1)}</Link>${levelSpacer(2, 3 + level)}`;
    } else if (childElement.tag === 'Image') {
      return `${levelSpacer(level, 5)}<${
        childElement.tag
      } src=${activeLink} ${elementTagDetails(childElement)}/>`;
    } else if (nestable) {
      if (
        (childElement.tag === 'Route' || childElement.tag === 'Switch') &&
        projectType === 'Next.js'
      ) {
        return `${writeNestedElements(childElement.children, level)}`;
      }
      const routePath =
        childElement.tag === 'Route' ? ' ' + 'exact path=' + activeLink : '';
      return `${levelSpacer(level, 5)}<${childElement.tag}${elementTagDetails(
        childElement
      )}${routePath}>
        ${tabSpacer(level)}${innerText}
        ${tabSpacer(level)}${writeNestedElements(
        childElement.children,
        level + 1
      )}
        ${tabSpacer(level - 1)}</${childElement.tag}>${levelSpacer(
        2,
        3 + level
      )}`;
    } else if (childElement.tag !== 'separator') {
      return `${levelSpacer(level, 5)}<${childElement.tag}${elementTagDetails(
        childElement
      )}>${innerText}</${childElement.tag}>${levelSpacer(2, 3 + level)}`;
    }
  };
  // write all code that will be under the "return" of the component
  const writeNestedElements = (enrichedChildren: any, level: number = 2) => {
    return `${enrichedChildren
      .map((child: any) => {
        if (child.type === 'Component') {
          return `<${child.name} ${elementTagDetails(child)}/>`;
        } else if (child.type === 'HTML Element') {
          return elementGenerator(child, level);
        }
        // route links are for gatsby.js and next.js feature. if the user creates a route link and then switches projects, generate code for a normal link instead
        else if (child.type === 'Route Link') {
          if (projectType === 'Next.js') {
            // if route link points to index, to go endpoint / rather than /index
            if (child.name === 'index')
              return `<div><Link href="/"><a>${child.name}</a></Link></div>`;
            else
              return `<div><Link href="/${child.name}"><a>${child.name}</a></Link></div>`;
          } else if (projectType === 'Gatsby.js') {
            if (child.name === 'index')
              return `<div><Link to="/">${child.name}</Link></div>`;
            else
              return `<div><Link to="/${child.name}">${child.name}</Link></div>`;
          } else return `<div><a>${child.name}</a></div>`;
        }
      })
      .filter((element) => !!element)
      .join('')}`;
  };
  // function to properly incorporate the user created state that is stored in the application state
  const writeStateProps = (stateArray: any) => {
    // console.log('currComponent: ', currComponent);
    // console.log('StateArray: ', stateArray)
    let stateToRender = '';
    for (const element of stateArray) {
      stateToRender += levelSpacer(2, 2) + element + ';';
    }
    return stateToRender;
  };
  const enrichedChildren: any = getEnrichedChildren(currComponent);
  // import statements differ between root (pages) and regular components (components)
  const importsMapped =
    projectType === 'Next.js' || projectType === 'Gatsby.js'
      ? imports
          .map((comp: string) => {
            return isRoot
              ? `import ${comp} from '../components/${comp}'`
              : `import ${comp} from './${comp}'`;
          })
          .join('\n')
      : imports
          .map((comp: string) => {
            return `import ${comp} from './${comp}'`;
          })
          .join('\n');
  const createState = (stateProps) => {
    let state = '{';
    stateProps.forEach((ele) => {
      state += ele.key + ':' + JSON.stringify(ele.value) + ', ';
    });
    state = state.substring(0, state.length - 2) + '}';
    return state;
  };

  // create final component code. component code differs between classic react, next.js, gatsby.js
  // classic react code
  if (projectType === 'Classic React') {
    //string to store all imports string for context
    let contextImports = '';
    const { allContext } = store.getState().contextSlice;
    for (const context of allContext) {
      contextImports += `import ${context.name}Provider from '../contexts/${context.name}.js'\n`;
    }

    //build an object with keys representing all components, their values are arrays storing all contexts that those components are consuming
    const componentContext = allContext.reduce((acc, curr) => {
      for (const component of curr.components) {
        if (acc[component] === undefined) acc[component] = [];
        acc[component].push(curr.name);
      }
      return acc;
    }, {});

    //return a string with all contexts provider in component's body
    const createRender = () => {
      let result = `${writeNestedElements(enrichedChildren)}`;
      if (importReactRouter) result = `<Router>\n ${result}\n </Router>`;
      if (allContext.length < 1) return result;

      if (currComponent.name === 'App') {
        allContext.reverse().forEach((el, i) => {
          let tabs = `\t\t`;
          if (i === allContext.length - 1) {
            tabs = `\t\t\t`;
          }
          result = `${tabs.repeat(allContext.length - i)}<${
            el.name
          }Provider>\n ${result}\n ${tabs.repeat(allContext.length - i)}</${
            el.name
          }Provider>`;
        });
      }
      return result;
    };

    //decide which imports statements to use for which components
    const createContextImport = () => {
      if (!(currComponent.name in componentContext)) return '';

      let importStr = '';
      componentContext[currComponent.name].forEach((context) => {
        importStr += `import { ${context} } from '../contexts/${context}.js'\n`;
      });

      return importStr;
    };

    //call use context hooks for components that are consuming contexts
    //LEGACY PD:
    const createUseContextHook = () => {
      if (!(currComponent.name in componentContext)) return '';

      let importStr = '';
      componentContext[currComponent.name].forEach((context) => {
        importStr += `  const [${context}Val] = useContext(${context})\n`;
      });

      return importStr;
    };

    const createEventHandler = (children) => {
      let importStr = '';
      children.map((child) => {
        if (child.type === 'HTML Element') {
          if (child.events) {
            for (const [event, funcName] of Object.entries(child.events)) {
              importStr += `\tconst ${funcName} = () => {};\n`;
            }
          }
          if (child.children.length !== 0) importStr += createEventHandler(child.children);
        }
      });

      return importStr;
    };

    let generatedCode = "import React, { useState, useEffect, useContext} from 'react';\n\n";
    generatedCode += currComponent.name === 'APP' ? contextImports : '';
    generatedCode += importReactRouter ? `import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';\n` : ``;
    generatedCode += createContextImport() ? `${createContextImport()}\n`: '';
    generatedCode += importsMapped ? `${importsMapped}\n` : '';
    // below is the return statement of the codepreview
    generatedCode += `const ${currComponent.name} = (props) => {\n`;
    generatedCode += writeStateProps(currComponent.useStateCodes) ? `\t${writeStateProps(currComponent.useStateCodes)}\n` : '';
    generatedCode += createEventHandler(enrichedChildren) ? `${createEventHandler(enrichedChildren)}\n` : '';
    generatedCode += `
  return(
    <>
      ${createRender()}
    </>
  );`
    generatedCode += `\n}`;
    return generatedCode;
    // return `${`import React, { useState, useEffect, useContext} from 'react';`}
    // ${currComponent.name === 'App' ? contextImports : ''}
    // ${
    //   importReactRouter
    //     ? `import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';`
    //     : ``
    // }
    // ${createContextImport()}
    // ${importsMapped}
    // ${`const ${currComponent.name} = (props) => {`}
    // ${createUseContextHook()}
    // ${`${writeStateProps(currComponent.useStateCodes)}`}
    // //  ------------------------------------------- added code below  -------------------------------------------
    // ${createEventHandler()}
    // //  ------------------------------------------- added code above  -------------------------------------------

    //   return(
    //     <>
    // ${createRender()}
    //     </>
    //   );
    // ${`}\n`}
    // export default ${currComponent.name}
    // `;
  }
  //
  // next.js component code
  else if (projectType === 'Next.js') {
    return `
    import React, { useState } from 'react';
    ${importsMapped}
    import Head from 'next/head'
    ${links ? `import Link from 'next/link'` : ``}
    ${images ? `import Image from 'next/image'` : ``}

    const ${
      currComponent.name[0].toUpperCase() + currComponent.name.slice(1)
    } = (props): JSX.Element => {
      return (
          <>
      ${
        isRoot
          ? `
            <Head>
              <title>${currComponent.name}</title>
            </Head>`
          : ``
      }
      ${writeNestedElements(enrichedChildren)}
          </>
      );
    }
    export default ${
      currComponent.name[0].toUpperCase() + currComponent.name.slice(1)
    };
    `;
  } else {
    // gatsby component code
    return `
    import React, { useState } from 'react';
    ${importsMapped}
    import { StaticQuery, graphql } from 'gatsby';
    ${links ? `import { Link } from 'gatsby'` : ``}
      const ${currComponent.name} = (props: any): JSX.Element => {
      return (
        <>
        ${
          isRoot
            ? `<head>
              <title>${currComponent.name}</title>
          </head>`
            : ``
        }
        <div className="${currComponent.name}" style={props.style}>
        ${writeNestedElements(enrichedChildren)}
        </div>
        </>
        );
      }
      export default ${currComponent.name};
    `;
  }
};
// formats code with prettier linter
const formatCode = (code: string) => {
  // in test environment, window.api is not defined,
  // so we reference original prettier format function instead
  if (process.env.NODE_ENV === 'test') {
    const { format } = require('prettier');
    return format(code, {
      singleQuote: true,
      trailingComma: 'es5',
      bracketSpacing: true,
      jsxBracketSameLine: true,
      parser: 'babel'
    });
  } else if (process.env.NODE_ENV === 'production') {
    return window.api.formatCode(code);
  } else {
    return code;
  }
};
export default generateCode;
