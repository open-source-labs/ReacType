import {
  Component,
  ChildElement,
  HTMLType,
  MUIType,
  ChildStyle,
  StateProp
} from '../interfaces/Interfaces';
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
  MUITypes: MUIType[],
  tailwind: boolean,
  contextParam: any
) => {
  const code = generateUnformattedCode(
    components,
    componentId,
    rootComponents,
    projectType,
    HTMLTypes,
    MUITypes,
    tailwind,
    contextParam
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
  MUITypes: MUIType[],
  tailwind: boolean,
  contextParam: any
) => {
  const components = [...comps];
  // find the component that we're going to generate code for
  const currComponent = components.find((elem) => elem.id === componentId);
  // find the unique components that we need to import into this component file
  let imports: any = [];
  let muiImports = new Set();
  let muiStateAndEventHandlers = new Set();
  let providers: string = '';
  let context: string = '';
  let links: boolean = false;
  let images: boolean = false;
  const isRoot = rootComponents.includes(componentId);
  let importReactRouter = false;

  // returns an array of objects which may include components, html elements, MaterialUI components, and/or route links
  const getEnrichedChildren = (currentComponent) => {
    const enrichedChildren = [];

    currentComponent.children?.forEach((child) => {
      const newChild = { ...child }; // Copy to avoid mutating original data

      switch (child.type) {
        case 'Component':
          const component = components.find((c) => c.id === child.typeId);
          if (component && !imports.includes(component.name)) {
            imports.push(component.name); // Track imports to avoid duplicates
          }
          newChild.name = component?.name; // Assign the name for rendering
          break;

        case 'HTML Element':
          const htmlElement = HTMLTypes.find((h) => h.id === child.typeId);
          newChild.tag = htmlElement?.tag;
          if (htmlElement) {
            // If this HTML element can contain children, process them recursively
            if (
              [
                'h1',
                'h2',
                'a',
                'p',
                'button',
                'span',
                'div',
                'form',
                'ul',
                'ol',
                'menu',
                'li',
                'Link',
                'Switch',
                'Route'
              ].includes(htmlElement.tag)
            ) {
              newChild.children = getEnrichedChildren({
                children: child.children
              });
            }

            // Additional flags for special types
            if (
              ['Switch', 'Route'].includes(htmlElement.tag) &&
              projectType === 'Classic React'
            ) {
              importReactRouter = true;
            } else if (htmlElement.tag === 'Link') {
              links = true;
            } else if (htmlElement.tag === 'Image') {
              images = true;
            }
          }
          break;

        case 'MUI Component':
          const muiComponent = MUITypes.find((m) => m.id === child.typeId);
          newChild.tag = muiComponent?.tag;
          if (muiComponent) {
            // Recursively process MUI components that can have children
            if (
              [
                'autocomplete',
                'mui button',
                'btn group',
                'checkbox',
                'fab',
                'radio group',
                'rating',
                'select',
                'slider',
                'switch',
                'textfield',
                'transfer-list',
                'toggle-button',
                'avatar',
                'badge',
                'chip',
                'list',
                'table',
                'tooltip',
                'typography',
                'alert',
                'backdrop',
                'dialog',
                'progress',
                'skeleton',
                'snackbar',
                'accordion',
                'appbar',
                'card',
                'paper',
                'bottomNavigation',
                'breadcrumbs',
                'drawer',
                'link',
                'menu',
                'pagination',
                'speedDial',
                'stepper',
                'tabs',
                'box',
                'container',
                'grid',
                'stack',
                'image-list',
                'modal',
                'popover',
                'popper',
                'transition'
              ].includes(muiComponent.tag)
            ) {
              newChild.children = getEnrichedChildren({
                children: child.children
              });
              collectMUIImports(child, MUITypes, muiImports);
              collectStateAndEventHandlers(
                child,
                MUITypes,
                muiStateAndEventHandlers
              );
            }
          }
          break;

        case 'Route Link':
          links = true;
          newChild.name = components.find((c) => c.id === child.typeId)?.name;
          break;

        default:
          // Handle other types or add error handling
          break;
      }
      enrichedChildren.push(newChild); // Add the processed child to the list
    });

    return enrichedChildren;
  };

  // Raised formatStyles so that it is declared before it is referenced. It was backwards.
  // format styles stored in object to match React inline style format
  const formatStyles = (styleObj) => {
    if (Object.keys(styleObj).length === 0) return '';
    return `style={{${Object.entries(styleObj)
      .map(([key, value]) => `${key}: '${value}'`)
      .join(', ')}}}`;
  };
  // function to dynamically add classes, ids, and styles to an element if it exists.
  // LEGACY PD: CAN ADD PROPS HERE AS JSX ATTRIBUTE
  const elementTagDetails = (childElement) => {
    const details = [];

    if (childElement.childId && childElement.tag !== 'Route') {
      details.push(`id="${childElement.childId}"`);
    }

    if (childElement.attributes && childElement.attributes.cssClasses) {
      details.push(`className="${childElement.attributes.cssClasses}"`);
    }

    if (childElement.style && Object.keys(childElement.style).length > 0) {
      if (tailwind) {
        // Assuming 'tailwind' variable is globally available
        const {
          height,
          alignItems,
          backgroundColor,
          display,
          flexDirection,
          width,
          justifyContent
        } = childElement.style;
        const classMap = {
          alignItems: {
            center: 'items-center',
            'flex-start': 'items-start',
            'flex-end': 'items-end',
            stretch: 'items-stretch'
          },
          display: {
            flex: 'flex',
            'inline-block': 'inline-block',
            block: 'block',
            none: 'hidden'
          },
          flexDirection: {
            column: 'flex-col'
          },
          justifyContent: {
            center: 'justify-center',
            'flex-start': 'justify-start',
            'space-between': 'justify-between',
            'space-around': 'justify-around',
            'flex-end': 'justify-end',
            'space-evenly': 'justify-evenly'
          },
          height: {
            '100%': 'h-full',
            '50%': 'h-1/2',
            '25%': 'h-1/4',
            auto: 'auto'
          },
          width: {
            '100%': 'w-full',
            '50%': 'w-1/2',
            '25%': 'w-1/4',
            auto: 'w-auto'
          }
        };

        let classes = [
          classMap.alignItems[alignItems],
          classMap.display[display],
          classMap.flexDirection[flexDirection],
          classMap.height[height],
          classMap.justifyContent[justifyContent],
          classMap.width[width],
          backgroundColor ? `bg-[${backgroundColor}]` : ''
        ]
          .filter(Boolean)
          .join(' ');

        if (childElement.attributes && childElement.attributes.cssClasses) {
          classes += ` ${childElement.attributes.cssClasses}`;
        }

        details.push(`className="${classes}"`);
      } else {
        details.push(formatStyles(childElement.style));
      }
    }

    if (childElement.events) {
      Object.entries(childElement.events).forEach(([event, funcName]) => {
        details.push(`${event}={${funcName}}`);
      });
    }

    return details.join(' ');
  };

  // function to fix the spacing of the ace editor for new lines of added content. This was breaking on nested components, leaving everything right justified.
  const tabSpacer = (level) => '  '.repeat(level);
  // function to dynamically generate the appropriate levels for the code preview
  const levelSpacer = (level) => `\n${tabSpacer(level)}`;
  // function to dynamically generate a complete html (& also other library type) elements
  const elementGenerator = (childElement, level = 0) => {
    const jsxArray = [];
    const indentation = '  '.repeat(level);

    // Immediately return an empty array if the tag is 'separator'
    if (childElement.tag === 'separator') {
      return jsxArray; // Returns empty, adding nothing to output
    }

    let innerText = '';
    let activeLink = '""';

    if (childElement.attributes && childElement.attributes.compText) {
      innerText =
        childElement.stateUsed && childElement.stateUsed.compText
          ? `{${childElement.stateUsed.compText}}`
          : childElement.attributes.compText;
    }

    if (childElement.attributes && childElement.attributes.compLink) {
      activeLink =
        childElement.stateUsed && childElement.stateUsed.compLink
          ? `{${childElement.stateUsed.compLink}}`
          : `"${childElement.attributes.compLink}"`;
    }

    const nestableTags = [
      'h1',
      'h2',
      'a',
      'span',
      'button',
      'p',
      'div',
      'form',
      'ol',
      'ul',
      'menu',
      'li',
      'Switch',
      'Route'
    ];
    const isNestable = nestableTags.includes(childElement.tag);

    const tagDetails = elementTagDetails(childElement);
    if (isNestable) {
      if (childElement.children) {
        const childJsx = writeNestedElements(childElement.children, level + 1);
        jsxArray.push(`${indentation}<${childElement.tag} ${tagDetails}>`);
        jsxArray.push(...childJsx);
        jsxArray.push(`${indentation}</${childElement.tag}>`);
      } else {
        jsxArray.push(`${indentation}<${childElement.tag} ${tagDetails} />`);
      }
    } else {
      jsxArray.push(
        `${indentation}<${childElement.tag} ${tagDetails}>${innerText}</${childElement.tag}>`
      );
    }

    return jsxArray;
  };

  function insertNestedJsxBeforeClosingTag(
    parentJsx,
    nestedJsx,
    indentationLevel
  ) {
    // Find the index of the closing tag of the parent component
    const closingTagIndex = parentJsx.lastIndexOf('</');
    if (closingTagIndex === -1) return parentJsx; // No closing tag found, likely a self-closing tag

    // Generate the indentation string for nested elements
    const indent = '  '.repeat(indentationLevel);

    // Prepare the nested JSX with proper indentation
    const indentedNestedJsx = nestedJsx
      .map((line) => `${indent}${line}`)
      .join('\n');

    // Insert the nested JSX before the closing tag of the parent component
    return [
      parentJsx.slice(0, closingTagIndex),
      indentedNestedJsx,
      parentJsx.slice(closingTagIndex)
    ].join('\n');
  }

  function modifyAndIndentJsx(jsxAry, newProps, childId, name, key) {
    // Define a regular expression to match the start tag of the specified child element
    const tagRegExp = new RegExp(`^<${name}(\\s|>)`);

    // Iterate through each line of JSX code
    const modifiedJsx = jsxAry.map((line, index) => {
      // Capture the original indentation by extracting leading spaces
      const originalIndent = line.match(/^[\s]*/)[0];
      const trimmedLine = line.trim();
      // Find the position right after the component name to insert id and newProps
      let insertIndex = trimmedLine.indexOf(`<${name}`) + `<${name}`.length;
      // Condition for the first line (index 0)
      if (index === 0) {
        // Check if the line contains the start tag of the specified child element
        if (tagRegExp.test(trimmedLine)) {
          // Check and insert id if not already present
          if (!trimmedLine.includes(`id=`) && childId) {
            line = `${trimmedLine.substring(
              0,
              insertIndex
            )} ${childId}${trimmedLine.substring(insertIndex)}`;
            // Adjust insertIndex for the next insertion
            insertIndex += childId.length + 1;
          } else if (trimmedLine.includes(`id=`) && childId) {
            // Define the insertion point for "{key} " right after `id="`
            let idInsertIndex = trimmedLine.indexOf(`id="`) + 4;
            // Insert "{key} " at the identified position within the existing id value
            line = `${trimmedLine.substring(
              0,
              idInsertIndex
            )}${key} ${trimmedLine.substring(idInsertIndex)}`;
          }
          // Insert newProps at the updated insertion index
          if (newProps) {
            line = `${line.substring(
              0,
              insertIndex
            )} ${newProps}${line.substring(insertIndex)}`;
          }
        } else {
          // If the regex test fails but it's the first line, just add the id
          if (!trimmedLine.includes(`id=`) && childId) {
            let spaceIndex = trimmedLine.indexOf(' ');
            if (spaceIndex === -1) {
              // If no space found, use position before '>'
              spaceIndex = trimmedLine.indexOf('>');
            }
            line = `${trimmedLine.substring(
              0,
              spaceIndex
            )} ${childId} ${trimmedLine.substring(spaceIndex)}`;
          }
        }
      } else if (index > 0 && tagRegExp.test(trimmedLine)) {
        insertIndex = line.indexOf(`<${name}`) + `<${name}`.length;
        if (newProps) {
          line = `${line.substring(0, insertIndex)} ${newProps}${line.substring(
            insertIndex
          )}`;
        }
      } else {
        // For other lines, no changes are made
        line = trimmedLine;
      }
      // Return the line with its original indentation preserved
      return originalIndent + line; // Avoid trimming here as line may already include necessary spaces
    });
    return modifiedJsx;
  }

  const muiGenerator = (child, level = 0) => {
    let childId = '';
    let passedInPropsString = '';
    let key = 0;

    const MUIComp = MUITypes.find((el) => el.tag === child.name);
    const MUIName = MUIComp.name;
    // 'passedInProps' will be where the props from the MUI Props panel will saved
    child.passedInProps.forEach((prop) => {
      passedInPropsString += `${prop.key}={${prop.key}} `;
    });

    MUIComp.defaultProps.forEach((prop) => {
      passedInPropsString += `${prop}`;
    });

    if (child.childId) {
      childId = `id="${+child.childId}"`;
      key = +child.childId;
    }

    // Indent the JSX generated for MUI components based on the provided level
    const indentedJSX = MUIComp.jsx.map(
      (line) => `${'  '.repeat(level)}${line}`
    );
    let modifiedJSx = modifyAndIndentJsx(
      indentedJSX,
      passedInPropsString,
      childId,
      MUIName,
      key
    );

    // Handle nested components, if any
    if (child.children && child.children.length > 0) {
      const nestedJsx = writeNestedElements(child.children, level + 1);
      modifiedJSx = insertNestedJsxBeforeClosingTag(
        modifiedJSx.join('\n'),
        nestedJsx,
        level + 1
      ).split('\n');
    }
    return modifiedJSx.join('\n');
  };

  const handleRouteLink = (child, level) => {
    const jsxArray = [];
    const indentation = '  '.repeat(level);

    if (projectType === 'Next.js') {
      // Next.js uses Link with the 'href' attribute and requires an <a> tag inside
      jsxArray.push(
        `<Link href="/${child.name === 'index' ? '' : child.name}">`
      );
      jsxArray.push(
        `${indentation}  <a>${child.displayName || child.name}</a>`
      );
      jsxArray.push(`${indentation}</Link>`);
    } else if (projectType === 'Gatsby.js') {
      // Gatsby uses Link with the 'to' attribute
      jsxArray.push(
        `<Link to="/${child.name === 'index' ? '' : child.name}">${
          child.displayName || child.name
        }</Link>`
      );
    } else if (projectType === 'Classic React') {
      // Classic React might use react-router-dom's Link or another routing method
      jsxArray.push(
        `<Link to="/${child.name === 'index' ? '' : child.name}">${
          child.displayName || child.name
        }</Link>`
      );
    } else {
      // Fallback or default handling, such as a simple anchor tag
      jsxArray.push(
        `<a href="/${child.name === 'index' ? '' : child.name}">${
          child.displayName || child.name
        }</a>`
      );
    }

    // Apply indentation to each line and join them with new lines
    return jsxArray.map((line) => `${indentation}${line}`).join('\n');
  };

  // Function to collect MUI imports as components are processed
  function collectMUIImports(component, MUITypes, muiImports) {
    if (component.type === 'MUI Component') {
      const muiComponent = MUITypes.find((m) => m.id === component.typeId);
      if (
        muiComponent &&
        muiComponent.imports &&
        muiComponent.imports.length > 0
      ) {
        muiComponent.imports.forEach((importStatement) => {
          if (!muiImports.has(importStatement)) {
            muiImports.add(importStatement);
          }
        });
      }

      // Recursively collect imports from child components if they exist
      if (component.children) {
        component.children.forEach((child) =>
          collectMUIImports(child, MUITypes, muiImports)
        );
      }
    }
  }
  // Generate MUI import strings from a set of import statements
  function generateMUIImportStatements(muiImports) {
    return Array.from(muiImports).join('\n');
  }

  // Function to collect state and event handler snippets from components
  function collectStateAndEventHandlers(
    component,
    MUITypes,
    handlersCollection
  ) {
    console.log('collectStateAndEventHandlers invoked');
    if (component.type === 'MUI Component') {
      console.log('collectStateAndEventHandlers MUI check');
      const muiComponent = MUITypes.find((m) => m.id === component.typeId);

      console.log('muiComponent found:', JSON.stringify(muiComponent)); // Check what muiComponent is found
      console.log(
        'StateAndEventHandlers:',
        muiComponent?.stateAndEventHandlers
      ); // Direct check

      if (muiComponent && Array.isArray(muiComponent.stateAndEventHandlers)) {
        console.log('collectStateAndEventHandlers hasState');
        muiComponent.stateAndEventHandlers.forEach((handlerSnippet) => {
          handlersCollection.add(handlerSnippet);
        });
      } else {
        console.log('No stateAndEventHandlers found or not an array');
      }
    }

    // Recursively collect handlers from child components if they exist
    if (component.children) {
      component.children.forEach((child) =>
        collectStateAndEventHandlers(child, MUITypes, handlersCollection)
      );
    }
  }

  // Function to generate code for state and event handlers
  function generateStateAndEventHandlerCode(handlersCollection) {
    return Array.from(handlersCollection).join('\n');
  }

  const writeNestedElements = (enrichedChildren, level = 0) => {
    return enrichedChildren.flatMap((child) => {
      if (child.type === 'Component') {
        return [`<${child.name} ${elementTagDetails(child)} />`];
      } else if (child.type === 'HTML Element') {
        return elementGenerator(child, level);
      } else if (child.type === 'MUI Component') {
        return muiGenerator(child, level);
      } else if (child.type === 'Route Link') {
        return handleRouteLink(child, level);
      }
      return []; // Return empty array for unhandled cases
    });
  };

  // function to properly incorporate the user created state that is stored in the application state
  const writeStateProps = (stateArray: String[]) => {
    let stateToRender: String = '';
    for (const element of stateArray) {
      stateToRender += levelSpacer(2) + element + ';';
    }
    return stateToRender;
  };
  const enrichedChildren: ChildElement[] = getEnrichedChildren(currComponent);

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

  // create final component code. component code differs between classic react, next.js, gatsby.js
  // classic react code
  if (projectType === 'Classic React') {
    //string to store all imports string for context
    let contextImports = '';
    const { allContext } = contextParam;

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

    const createRender = () => {
      const jsxElements = writeNestedElements(enrichedChildren);

      let jsxString = jsxElements.join('\n');

      // Adding Router wrapper if necessary
      if (importReactRouter) {
        jsxString = `<Router>\n${indentLinesExceptFirst(
          jsxString,
          1
        )}\n</Router>`;
      }

      // Add context providers if the component is 'App' and contexts are defined
      if (allContext.length > 0 && currComponent.name === 'App') {
        allContext
          .slice()
          .reverse()
          .forEach((el, index) => {
            const indent = '  '.repeat(index + 1);
            jsxString = `${indent}<${
              el.name
            }Provider>\n${indentLinesExceptFirst(
              jsxString,
              index + 1
            )}\n${indent}</${el.name}Provider>`;
          });
      }

      return jsxString;
    };

    const indentLinesExceptFirst = (text, level) => {
      const lines = text.split('\n');
      const firstLine = lines.shift(); // Remove the first line
      const indentation = '  '.repeat(level);
      const indentedLines = lines.map((line) => `${indentation}${line}`);
      return `${firstLine}\n${indentedLines.join('\n')}`;
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

    const createEventHandler = (children: ChildElement[]) => {
      let importStr = '';
      children.map((child) => {
        if (child.type === 'HTML Element') {
          if (child.events) {
            for (const [event, funcName] of Object.entries(child.events)) {
              importStr += `\tconst ${funcName} = () => {};\n`;
            }
          }
          if (child.children.length !== 0)
            importStr += createEventHandler(child.children);
        }
        if (child.type === 'MUI Component') {
          if (child.events) {
            for (const [event, funcName] of Object.entries(child.events)) {
              importStr += `\tconst ${funcName} = () => {};\n`;
            }
          }
          if (child.children.length !== 0)
            importStr += createEventHandler(child.children);
        }
      });

      return importStr;
    };
    const muiImportStatements = generateMUIImportStatements(muiImports);
    const stateAndEventHandlers = generateStateAndEventHandlerCode(
      muiStateAndEventHandlers
    );
    console.log('stateAndEventHandlers', stateAndEventHandlers);
    let generatedCode =
      "import React, { useState, useEffect, useContext} from 'react';\n\n";
    generatedCode += currComponent.name === 'App' ? contextImports : '';
    generatedCode += importReactRouter
      ? `import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';\n`
      : ``;
    generatedCode += createContextImport() ? `${createContextImport()}\n` : '';
    generatedCode += importsMapped ? `${importsMapped}\n` : '';
    generatedCode += muiImportStatements ? `${muiImportStatements}\n\n` : '';
    // below is the return statement of the codepreview
    generatedCode += `const ${currComponent.name} = (props) => {\n`;
    generatedCode += stateAndEventHandlers ? `${stateAndEventHandlers}` : '';
    generatedCode += writeStateProps(currComponent.useStateCodes)
      ? `\t${writeStateProps(currComponent.useStateCodes)}\n`
      : '';
    generatedCode += createEventHandler(enrichedChildren)
      ? `${createEventHandler(enrichedChildren)}\n`
      : '';
    generatedCode += `
  return(
    <>
      ${indentLinesExceptFirst(createRender(), 3)}
    </>
  );`;
    generatedCode += `\n}`;
    return generatedCode;
  } else if (projectType === 'Next.js') {
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
  if (import.meta.env.NODE_ENV === 'test') {
    const { format } = require('prettier');
    return format(code, {
      singleQuote: true,
      trailingComma: 'es5',
      bracketSpacing: true,
      jsxBracketSameLine: true,
      parser: 'babel'
    });
  } else {
    return code;
  }
};
export default generateCode;
