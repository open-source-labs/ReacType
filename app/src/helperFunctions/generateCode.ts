import {
  Component,
  ChildElement,
  HTMLType,
  MUIType,
  MUIComponent,
  ChildStyle,
  StateProp
} from '../interfaces/Interfaces';
declare global {
  interface Window {
    api: any;
  }
}

/**
 * Generates code based on the component hierarchy and returns the rendered code.
 * @param {Component[]} components - Array of components in the hierarchy.
 * @param {number} componentId - The ID of the component to generate code for.
 * @param {number[]} rootComponents - Array of root component IDs.
 * @param {string} projectType - The type of project (e.g., 'Classic React', 'Next.js', 'Gatsby.js').
 * @param {HTMLType[]} HTMLTypes - Array of HTML types.
 * @param {MUIType[]} MUITypes - Array of Material UI types.
 * @param {boolean} tailwind - Indicates whether Tailwind CSS is used.
 * @param {any} contextParam - Additional parameters related to context (if any).
 * @returns {string} - The formatted code.
 */
const generateCode = (
  components: Component[],
  componentId: number,
  rootComponents: number[],
  projectType: string,
  HTMLTypes: HTMLType[],
  MUITypes: MUIType[],
  tailwind: boolean,
  contextParam: any
): string => {
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

/**
 * Generates unformatted code based on the component hierarchy and returns the rendered code.
 * @param {Component[]} comps - Array of components in the hierarchy.
 * @param {number} componentId - The ID of the component to generate code for.
 * @param {number[]} rootComponents - Array of root component IDs.
 * @param {string} projectType - The type of project (e.g., 'Classic React', 'Next.js', 'Gatsby.js').
 * @param {HTMLType[]} HTMLTypes - Array of HTML types.
 * @param {MUIType[]} MUITypes - Array of Material UI types.
 * @param {boolean} tailwind - Indicates whether Tailwind CSS is used.
 * @param {any} contextParam - Additional parameters related to context (if any).
 * @returns {string} - The unformatted code.
 */
const generateUnformattedCode = (
  comps: Component[],
  componentId: number,
  rootComponents: number[],
  projectType: string,
  HTMLTypes: HTMLType[],
  MUITypes: MUIType[],
  tailwind: boolean,
  contextParam: any
): string => {
  const components = [...comps];
  // find the component that we're going to generate code for
  const currComponent: Component | ChildElement | MUIComponent =
    components.find((elem) => elem.id === componentId);
  // find the unique components that we need to import into this component file
  let imports: any = [];
  let muiImports: Set<string> = new Set();
  let muiStateAndEventHandlers: Set<string> = new Set();
  let providers: string = '';
  let context: string = '';
  let links: boolean = false;
  let images: boolean = false;
  const isRoot = rootComponents.includes(componentId);
  let importReactRouter = false;

  /**
   * Recursively processes the children of a component, enriching them with additional information.
   * Differentiates between regular components, HTML elements, Material UI components, and route links.
   * @param {Component | ChildElement | MUIComponent} currentComponent - The component whose children need to be processed.
   * @returns {Array<ChildElement | MUIComponent>} - An array of objects representing enriched children, including components, HTML elements,
   * Material UI components, and route links.
   */
  const getEnrichedChildren = (
    currentComponent: Component | ChildElement | MUIComponent
  ): Array<ChildElement | MUIComponent> => {
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
              newChild.children = getEnrichedChildren(child.children);
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
                'imageList',
                'modal',
                'popover',
                'popper',
                'transition'
              ].includes(muiComponent.tag)
            ) {
              newChild.children = getEnrichedChildren(child.children);
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

  /**
   * Convert styles stored in an object to React inline style format.
   * @param {object} styleObj - The object containing styles to format.
   * @returns {string} - The formatted styles in React inline style format.
   */
  const formatStyles = (styleObj): string => {
    // check if the style object is empty
    if (Object.keys(styleObj).length === 0) return '';
    // Convert the style object to a string in React inline style format
    return `style={{${Object.entries(styleObj)
      .map(([key, value]) => `${key}: '${value}'`)
      .join(', ')}}}`; // Join key-value pairs with commas and enclose in double curly braces
  };

  // LEGACY PD: CAN ADD PROPS HERE AS JSX ATTRIBUTE
  /**
   * Generates details such as classes, ids, styles, and event handlers for a given child element.
   * @param {ChildElement} childElement - The child element to generate details for.
   * @returns {string} - The generated details as a string.
   */
  const elementTagDetails = (childElement): string => {
    const details = [];
    // Add id attribute if childId exists and the element is not a Route
    if (childElement.childId && childElement.tag !== 'Route') {
      details.push(`id="${childElement.childId}"`);
    }
    // Add className attribute if cssClasses exist
    if (childElement.attributes && childElement.attributes.cssClasses) {
      details.push(`className="${childElement.attributes.cssClasses}"`);
    }
    // Add styles if they exist
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
    // Add event handlers if they exist
    if (childElement.events) {
      Object.entries(childElement.events).forEach(([event, funcName]) => {
        details.push(`${event}={${funcName}}`);
      });
    }
    // Join details into a single string and return
    return details.join(' ');
  };

  /**
   * Generates a string consisting of spaces to represent indentation for a given level.
   * @param {number} level - The level of indentation.
   * @returns {string} - The string representing the indentation.
   */
  const tabSpacer = (level: number): string => '  '.repeat(level);

  /**
   * Generates a string consisting of new lines and indentation to represent spacing for a given level.
   * @param {number} level - The level of spacing.
   * @returns {string} - The string representing the spacing.
   */
  const levelSpacer = (level: number): string => `\n${tabSpacer(level)}`;

  /**
   * Generates JSX elements based on the provided child element.
   * @param {object} childElement - The child element for which JSX is to be generated.
   * @param {number} [level=0] - The nesting level of the element. Default is 0.
   * @returns {string[]} - An array of strings representing JSX elements.
   */
  const elementGenerator = (
    childElement: ChildElement,
    level: number = 0
  ): string[] => {
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

  /**
   * Inserts nested JSX before the closing tag of a parent JSX element.
   * @param {string} parentJsx The JSX of the parent element.
   * @param {string[]} nestedJsx The nested JSX elements to insert.
   * @param {number} indentationLevel The level of indentation for the nested JSX.
   * @returns {string} The updated JSX string with nested elements inserted.
   */
  const insertNestedJsxBeforeClosingTag = (
    parentJsx: string,
    nestedJsx: string[],
    indentationLevel: number
  ): string => {
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
  };

  /**
   * Modifies JSX elements by adding new props and indenting them properly.
   * @param {string[]} jsxAry - The array of JSX elements to modify.
   * @param {string} newProps - The new props to add to the JSX elements.
   * @param {string} childId - The ID of the child element.
   * @param {string} name - The name of the child element.
   * @param {string} key - The key to insert into the JSX.
   * @returns {string[]} - The modified JSX elements with added props and proper indentation.
   */
  const modifyAndIndentJsx = (
    jsxAry: string[],
    newProps: string,
    childId: string,
    name: string,
    key: string
  ): string[] => {
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
  };

  /**
   * Generates JSX for a Material UI component.
   * @param {ChildElement} child - The child element representing the Material UI component.
   * @param {number} [level=0] - The indentation level.
   * @returns {string} - The generated JSX for the Material UI component.
   */
  const muiGenerator = (child: ChildElement, level: number = 0): string => {
    let childId = '';
    let passedInPropsString = '';
    let key = '';

    const MUIComp: MUIType | undefined = MUITypes.find(
      (el) => el.tag === child.name
    );
    const MUIName: string | undefined = MUIComp?.name;

    if (!MUIComp) {
      console.error(`MUI component ${child.name} not found.`);
      return ''; // Return empty string if MUI component not found
    }

    // Build string for passed-in props
    child.passedInProps.forEach((prop) => {
      passedInPropsString += `${prop.key}={${prop.key}} `;
    });

    // Append default props to the passedInPropsString
    MUIComp.defaultProps.forEach((prop) => {
      passedInPropsString += `${prop}`;
    });

    if (child.childId) {
      childId = `id="${+child.childId}"`;
      key = `${+child.childId}`;
    }

    // Indent the JSX generated for MUI components based on the provided level
    const indentedJSX = MUIComp.jsx.map(
      (line) => `${'  '.repeat(level)}${line}`
    );

    // Modify and indent JSX
    let modifiedJSx = modifyAndIndentJsx(
      indentedJSX,
      passedInPropsString,
      childId,
      MUIName!,
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

  /**
   * Generates JSX for a route link based on the project type.
   * @param {Object} child - The child object representing the route link.
   * @param {number} level - The indentation level.
   * @returns {string} - The generated JSX for the route link.
   */
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

  /**
   * Collects Material UI imports as components are processed.
   * @param {ChildElement | MUIType} component - The component being processed.
   * @param {MUIType[]} MUITypes - The array of Material UI component types.
   * @param {Set<string>} muiImports - The set to store collected Material UI imports.
   */
  const collectMUIImports = (
    component: ChildElement | MUIComponent,
    MUITypes: MUIType[],
    muiImports: Set<string>
  ): void => {
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
  };

  /**
   * Generates Material UI import statements from a set of import statements.
   * @param {Set<string>} muiImports - The set of Material UI import statements.
   * @returns {string} - The generated import statements as a single string.
   */
  const generateMUIImportStatements = (muiImports: Set<string>): string =>
    Array.from(muiImports).join('\n');

  /**
   * Collects state and event handler snippets from components.
   * @param {ChildElement | MUIType} component - The component being processed.
   * @param {MUIType[]} MUITypes - The array of Material UI component types.
   * @param {Set<string>} handlersCollection - The set to store collected state and event handler snippets.
   */
  const collectStateAndEventHandlers = (
    component: ChildElement | MUIComponent,
    MUITypes: MUIType[],
    handlersCollection: Set<string>
  ): void => {
    if (component.type === 'MUI Component') {
      const muiComponent = MUITypes.find((m) => m.id === component.typeId);
      if (muiComponent && Array.isArray(muiComponent.stateAndEventHandlers)) {
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
  };

  /**
   * Generates Material UI import statements from a set of import statements.
   * @param {Set<string>} handlersCollection - The set of Material UI import statements.
   * @returns {string} - The generated import statements as a single string.
   */
  const generateStateAndEventHandlerCode = (
    handlersCollection: Set<string>
  ): string => Array.from(handlersCollection).join('\n');

  /**
   * Writes nested elements based on the provided enriched children.
   * @param {Array<ChildElement | MUIType | Component>} enrichedChildren - The array of enriched children to process.
   * @param {number} [level=0] - The nesting level of the elements. 0 by default.
   * @returns {string[]} - An array of strings representing the nested elements.
   */
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

  /**
   * Generates code to properly incorporate the user-created state stored in the application state.
   * @param {string[]} stateArray - Array of strings representing the user-created state.
   * @returns {string} - A string containing code to incorporate the user-created state.
   */
  const writeStateProps = (stateArray: string[]): string => {
    let stateToRender: string = '';
    for (const element of stateArray) {
      stateToRender += levelSpacer(2) + element + ';';
    }
    return stateToRender;
  };

  const enrichedChildren = getEnrichedChildren(currComponent);

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

    /**
     * Creates a JSX string representing the rendered output of enriched children.
     * @returns {string} - The JSX string representing the rendered output.
     */
    const createRender = (): string => {
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

    /**
     * Indents all lines in a multi-line text except the first line by a specified level of indentation.
     * @param {string} text - The text to be indented.
     * @param {number} level - The level of indentation (number of spaces).
     * @returns {string} - The indented text.
     */
    const indentLinesExceptFirst = (text: string, level: number): string => {
      const lines = text.split('\n');
      const firstLine = lines.shift(); // Remove the first line
      const indentation = '  '.repeat(level);
      const indentedLines = lines.map((line) => `${indentation}${line}`);
      return `${firstLine}\n${indentedLines.join('\n')}`;
    };

    /**
     * Generates import statements for the components based on their contexts.
     * @returns {string} - The import statements as a string.
     */
    const createContextImport = (): string => {
      if (!(currComponent.name in componentContext)) return '';

      let importStr = '';
      componentContext[currComponent.name].forEach((context) => {
        importStr += `import { ${context} } from '../contexts/${context}.js'\n`;
      });

      return importStr;
    };

    /**
     * Creates event handler functions based on the events defined in the children elements.
     * @param {ChildElement[]} children - The array of children elements.
     * @returns {string}- The event handler functions as a string.
     */
    const createEventHandler = (children: ChildElement[]): string => {
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

/**
 * Formats code using the Prettier linter.
 * @param {string} code The code string to be formatted.
 * @returns {string} - The formatted code string.
 */
const formatCode = (code: string): string => {
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
