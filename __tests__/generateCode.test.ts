import { describe, it, expect } from 'vitest';
import generateCode from '../app/src/helperFunctions/generateCode';
import {
  muiGenerator,
  handleRouteLink,
  insertNestedJsxBeforeClosingTag,
  modifyAndIndentJsx,
  insertAttribute,
  writeStateProps,
  createRender,
  indentLinesExceptFirst,
  createContextImport,
  createEventHandler,
  generateUnformattedCode,
  getEnrichedChildren,
  formatStyles,
  elementTagDetails,
  writeNestedElements,
  generateMUIImportStatements,
  generateStateAndEventHandlerCode,
  tabSpacer,
  levelSpacer,
  elementGenerator,
  collectMUIImports,
  collectStateAndEventHandlers,
  formatCode
} from '../app/src/helperFunctions/generateCode';
import { Component, HTMLType, MUIType } from '../app/src/interfaces/Interfaces';

const MUITypes: MUIType[] = [
  {
    id: 1,
    tag: 'button',
    name: 'Button',
    style: {}, // Assuming style is an object, provide specific styles as needed
    placeHolderShort: 'Button placeholder',
    placeHolderLong: 'This is a button used for submitting forms.',
    icon: null, // If icon is optional and not used, set it to null or appropriate default
    framework: 'React',
    nestable: false,
    stateAndEventHandlers: ['onClick'],
    imports: ['import React from "react";'],
    propOptions: ['type', 'onClick'],
    defaultProps: ['type="button"'],
    jsx: ['<button>{children}</button>'],
    componentData: { type: 'button', props: { children: 'Click me' } },
    children: [], // If no nested MUI types, use an empty array
    attributes: {} // If no specific attributes are needed, use an empty object
  }
];
// vi.mock('../redux/MUITypes', () => MUITypes);

const componentsMock: Component[] = [
  {
    id: 1,
    name: 'Button',
    style: {},
    events: {},
    code: 'return <Button>Click me</Button>;',
    children: [],
    isPage: false,
    past: [],
    future: [],
    stateProps: [],
    useStateCodes: [],
    passedInProps: [],
    type: 'MUI Component'
  }
];

// Correctly mocked HTMLTypes data based on the HTMLType interface
const HTMLTypes: HTMLType[] = [
  {
    id: 1,
    tag: 'div',
    name: 'Division',
    style: {},
    placeHolderShort: 'Short placeholder text or JSX',
    placeHolderLong: 'Longer placeholder text',
    icon: null,
    framework: 'React',
    nestable: true
  }
];
const rootComponents = [1];
const contextParam = {};

describe('generateCode', () => {
  it('should return formatted code for Classic React', () => {
    const result = generateCode(
      componentsMock,
      1,
      [1],
      'Classic React',
      HTMLTypes,
      MUITypes,
      false,
      {}
    );
    expect(result).toContain('import React'); // Example assertion, adjust based on actual output
    expect(result).toContain('function Button'); // Check for function definition
  });

  it('should handle Next.js projects', () => {
    const result = generateCode(
      componentsMock,
      1,
      [1],
      'Next.js',
      HTMLTypes,
      MUITypes,
      false,
      {}
    );
    expect(result).toContain('import Head from "next/head"');
  });
});

describe('muiGenerator', () => {
  it('returns correct JSX for MUI components', () => {
    const childElement = {
      name: 'Button',
      passedInProps: [],
      childId: '1',
      children: []
    };
    const result = muiGenerator(childElement);
    expect(result).toContain('<button>Click me</button>'); // Example, adjust to actual logic
  });

  it('returns empty string when MUI component is not found', () => {
    const childElement = {
      name: 'NotFoundComponent',
      passedInProps: [],
      childId: '1',
      children: []
    };
    const result = muiGenerator(childElement);
    expect(result).toBe('');
  });
});

describe('handleRouteLink', () => {
  it('generates correct JSX for Next.js route links', () => {
    const child = { name: 'home', displayName: 'Home' };
    const result = handleRouteLink(child, 0, 'Next.js');
    expect(result).toContain('<Link href="/home"><a>Home</a></Link>');
  });

  it('generates correct JSX for Gatsby route links', () => {
    const child = { name: 'home', displayName: 'Home' };
    const result = handleRouteLink(child, 0, 'Gatsby.js');
    expect(result).toContain('<Link to="/home">Home</Link>');
  });
});

describe('insertNestedJsxBeforeClosingTag', () => {
  it('correctly inserts JSX before the closing tag', () => {
    const parentJsx = '<div>\n</div>';
    const nestedJsx = ['<span>Content</span>'];
    const result = insertNestedJsxBeforeClosingTag(parentJsx, nestedJsx, 1);
    expect(result).toContain('<div>\n  <span>Content</span>\n</div>');
  });
});

describe('modifyAndIndentJsx', () => {
  it('correctly modifies and indents JSX with new props and id', () => {
    const jsxAry = ['<Button>Click me</Button>'];
    const newProps = 'disabled';
    const childId = 'btn1';
    const name = 'Button';
    const key = 'btn1';
    const result = modifyAndIndentJsx(jsxAry, newProps, childId, name, key);
    expect(result).toContain('<Button id="btn1" disabled>Click me</Button>');
  });
});

describe('insertAttribute', () => {
  it('correctly inserts an attribute into JSX', () => {
    const line = '<Button>Click me</Button>';
    const attribute = 'disabled';
    const index = line.indexOf('>');
    const result = insertAttribute(line, index, attribute);
    expect(result).toContain('<Button disabled>Click me</Button>');
  });
});

describe('writeStateProps', () => {
  it('correctly formats state props into component', () => {
    const stateArray = ['const [count, setCount] = useState(0)'];
    const result = writeStateProps(stateArray);
    expect(result).toContain('const [count, setCount] = useState(0);');
  });
});

describe('createRender', () => {
  // Assuming createRender is adapted to be testable, potentially needing dependency injection for context
  it('creates render function with nested elements', () => {
    const result = createRender(); // This needs to be adapted based on actual usage and possible inputs
    expect(result).toContain('return (');
  });
});

describe('indentLinesExceptFirst', () => {
  it('indents all lines except the first one', () => {
    const text = 'Line1\nLine2\nLine3';
    const result = indentLinesExceptFirst(text, 1);
    expect(result).toBe('Line1\n  Line2\n  Line3');
  });
});

describe('createContextImport', () => {
  it('generates import statements for contexts', () => {
    const result = createContextImport(); // Assuming it's adapted to be testable
    expect(result).toContain('import');
  });
});

describe('createEventHandler', () => {
  it('creates event handler functions from child elements', () => {
    const children = [
      { type: 'HTML Element', events: { onClick: 'handleClick' }, children: [] }
    ];
    const result = createEventHandler(children);
    expect(result).toContain('const handleClick = () => {};');
  });
});

describe('generateUnformattedCode', () => {
  it('returns correct JSX for a given project type', () => {
    const result = generateUnformattedCode(
      componentsMock,
      1,
      rootComponents,
      'Classic React',
      HTMLTypes,
      MUITypes,
      false,
      contextParam
    );
    expect(result).toContain('Button'); // Example assertion, adjust based on actual output
  });
});

describe('getEnrichedChildren', () => {
  it('enriches child components correctly', () => {
    const result = getEnrichedChildren(componentsMock[0]);
    expect(result).toBeTypeOf('array'); // Check for correct data structure
    expect(result).toHaveLength(0); // No children to enrich in this case
  });
});

describe('formatStyles', () => {
  it('formats style object into inline styles correctly', () => {
    const styles = { color: 'red', fontSize: '12px' };
    const result = formatStyles(styles);
    expect(result).toContain("color: 'red'"); // Checks inline style formatting
    expect(result).toContain("fontSize: '12px'");
  });
});

describe('elementTagDetails', () => {
  it('generates correct details for an HTML element', () => {
    const childElement = {
      childId: '1',
      attributes: { cssClasses: 'btn' },
      style: {},
      events: {}
    };
    const result = elementTagDetails(childElement);
    expect(result).toContain('id="1"');
    expect(result).toContain('className="btn"');
  });
});

describe('writeNestedElements', () => {
  it('handles nested components correctly', () => {
    const enrichedChildren = [{ ...componentsMock[0], type: 'Component' }];
    const result = writeNestedElements(enrichedChildren, 0);
    expect(result).toContain('<Button />'); // Assuming elementTagDetails are correct
  });
});

describe('generateMUIImportStatements', () => {
  it('compiles MUI import statements from a set', () => {
    const muiImports = new Set(["import Button from '@mui/material/Button'"]);
    const result = generateMUIImportStatements(muiImports);
    expect(result).toContain("import Button from '@mui/material/Button'");
  });
});

describe('generateStateAndEventHandlerCode', () => {
  it('compiles state and event handler code, excluding comments', () => {
    const handlersCollection = new Set([
      'const handleClick = () => { console.log("Clicked"); }; // Click handler'
    ]);
    const result = generateStateAndEventHandlerCode(handlersCollection);
    expect(result).not.toContain('// Click handler');
    expect(result).toContain(
      'const handleClick = () => { console.log("Clicked"); };'
    );
  });
});

describe('tabSpacer', () => {
  it('returns correct amount of spaces for indentation', () => {
    const result = tabSpacer(3);
    expect(result).toBe('      '); // 6 spaces for 3 levels of indentation
  });

  it('returns empty string for zero indentation', () => {
    const result = tabSpacer(0);
    expect(result).toBe('');
  });
});

describe('levelSpacer', () => {
  it('returns newline followed by correct indentation spaces', () => {
    const result = levelSpacer(2);
    expect(result).toBe('\n    '); // Newline followed by 4 spaces
  });
});

describe('elementGenerator', () => {
  const childElement = {
    tag: 'button',
    children: [],
    attributes: {},
    style: {}
  };
  it('generates JSX for a simple element', () => {
    const result = elementGenerator(childElement, 0);
    expect(result).toContain('<button />'); // Check JSX output
  });
});

describe('collectMUIImports', () => {
  it('collects MUI imports without duplicates', () => {
    const component = { type: 'MUI Component', typeId: 1, children: [] };
    const MUITypes = [
      { id: 1, imports: ['import Button from "@mui/material/Button"'] }
    ];
    const muiImports = new Set();
    collectMUIImports(component, MUITypes, muiImports);
    expect(muiImports.has('import Button from "@mui/material/Button"')).toBe(
      true
    );
    expect(muiImports.size).toBe(1);
  });
});

describe('collectStateAndEventHandlers', () => {
  it('collects event handlers from MUI components', () => {
    const component = { type: 'MUI Component', typeId: 1, children: [] };
    const MUITypes = [
      { id: 1, stateAndEventHandlers: ['const handleClick = () => {}'] }
    ];
    const handlersCollection = new Set();
    collectStateAndEventHandlers(component, MUITypes, handlersCollection);
    expect(handlersCollection.has('const handleClick = () => {}')).toBe(true);
  });
});

describe('formatCode', () => {
  it('formats code using provided styling rules', () => {
    const code = 'const x=1;';
    const formatted = formatCode(code);
    expect(formatted).toContain('const x = 1;'); // Assuming Prettier is set up with spaces around equals
  });

  it('handles empty code input', () => {
    const result = formatCode('');
    expect(result).toBe('');
  });
});
