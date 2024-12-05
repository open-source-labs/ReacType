/* eslint-disable max-len */
// Create all files necessary to run a next.js application
import createNextFiles from './createNextFiles.util';
import { Component } from '../interfaces/Interfaces';
import createTestSuiteNext from './createTestSuiteNext.util';

/**
 * Converts camelCase string to kebab-case.
 * @param {string} camel - The string in camelCase format.
 * @returns {string} - The string in kebab-case format.
 */
const camelToKebab = (camel: string): string => camel.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();

/**
 * Generates CSS class definitions based on the component's style object.
 * @param {Component} component - The component object with name and style properties.
 * @returns {string} - CSS class definitions for the component.
 */
const compToCSS = (component: Component): string => {
  const { name } = component;
  const styleObj = component.style;
  let cssClass = `
  .${name} {
    `;
  Object.keys(styleObj).forEach((property) => {
    let cssStyle = `${camelToKebab(property)}: ${styleObj[property]};
    `;
    cssClass += cssStyle;
  });
  cssClass += `}
  `;
  return cssClass;
};

/**
 * Creates a package.json file for a Next.js application at the specified path. The package.json file includes
 * scripts for development, build, and start processes, and it conditionally adds testing scripts if specified.
 * Dependencies for both the application and development (including optional testing dependencies) are also defined.
 * @param {string} path - The base directory path where the application files will be written.
 * @param {string} appName - The name of the application, used to define the path where the package.json will be located.
 * @param {boolean} test - Flag to determine whether test-related packages and scripts should be included.
 * @returns {void} - Does not return a value; it performs file writing operations directly.
 */
export const createPackage = (path, appName, test): void => {
  const filePath = `${path}/${appName}/package.json`;
  let testpackages = `,
    "@types/enzyme": "^3.10.9",
    "@types/jest": "^27.0.1",
    "babel-jest": "^27.2.0",
    "enzyme": "^3.11.0",
    "enzyme-adapter-react-16": "^1.15.6",
    "jest": "^27.2.0",
    "@types/enzyme-adapter-react-16": "^1.0.6",
    "identity-obj-proxy": "^3.0.0",
    "ts-jest": "^27.0.5"`;
  const data = `
{
  "name": "reactype-next",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"${test ? ',"test": "jest"' : ''}
  },
  "dependencies": {
    "next": "9.3.5",
    "react": "16.13.1",
    "react-dom": "16.13.1"
  },
  "devDependencies": {
    "@types/node": "^14.0.20",
    "@types/react": "^16.9.41",
    "@types/react-dom": "^17.0.9",
    "typescript": "^3.9.6"${test ? testpackages : ''}
  }
}
`;
  window.api.writeFile(filePath, data, (err) => {
    if (err) {
      console.log('createNextApp.util package.json error:', err.message);
    } else {
      console.log('createNextApp.util package.json written successfully');
    }
  });
};

/**
 * Creates a tsconfig.json file at the specified path for a given application. The tsconfig.json is pre-populated
 * with a set of TypeScript compiler options tailored for a Next.js application, including settings to support
 * JSX, module resolution, and other strict checks. This function writes the config file and logs success or error messages.
 * Note that running 'next dev' will autopopulate this file with default values later if needed.
 * @param {string} path - The directory path where the application files will be written.
 * @param {string} appName - The name of the application, used to determine the specific directory for the tsconfig.json file.
 * @returns {void} - Does not return a value; it performs file writing operations directly.
 */
export const createTsConfig = (path, appName): void => {
  const filePath = `${path}/${appName}/tsconfig.json`;
  // running 'next dev' will autopopulate this with default values
  const data = `{
  "compileOnSave": false,
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "jsx": "preserve",
    "allowJs": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "removeComments": false,
    "preserveConstEnums": true,
    "sourceMap": true,
    "skipLibCheck": true,
    "baseUrl": ".",
    "lib": [
      "dom",
      "es2016"
    ],
    "strict": false,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "isolatedModules": true
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ]
} 
`;
  window.api.writeFile(filePath, data, (err) => {
    if (err) {
      console.log('TSConfig error:', err.message);
    } else {
      console.log('TSConfig written successfully');
    }
  });
};

/**
 * Creates a global CSS file for the specified application. This file includes default styles for div elements
 * within the #__next container and appends custo- m styles for each component provided. The CSS rules are aimed
 * at ensuring consistent styling across the application.
 * @param {string} path - The base directory path where the CSS file will be created.
 * @param {string} appName - The name of the application, used to construct the path to the global.css file.
 * @param {Component[]} components - An array of component objects from which to generate additional CSS rules.
 * @returns {void} - Does not return a value; it performs file writing operations directly.
 */
export const createDefaultCSS = (path, appName, components): void => {
  const filePath = `${path}/${appName}/global.css`;
  let data = `
  #__next div {
    box-sizing: border-box;
    width: 100%;
    border: 1px solid rgba(0,0,0,0.25);
    padding: 12px;
    text-align: center;
    font-family: Helvetica, Arial;
  }
  `;
  components.forEach((comp) => {
    data += compToCSS(comp);
  });
  window.api.writeFile(filePath, data, (err) => {
    if (err) {
      console.log('global.css error:', err.message);
    } else {
      console.log('global.css written successfully');
    }
  });
};

/**
 * Initializes the directory structure for a new application within the specified path.
 * This function creates the main application directory along with subdirectories for 'pages' and 'components'.
 * These directories are essential for organizing application files according to typical project conventions.
 * @param {string} path - The base path where the application directories will be created.
 * @param {string} appName - The name of the application, used to create a specific directory under the given path.
 * @returns {void} - Does not return a value; it performs directory creation operations directly.
 */
export const initFolders = (path: string, appName: string): void => {
  let dir = path;
  let dirPages;
  let dirComponents;
  dir = `${dir}/${appName}`;
  if (!window.api.existsSync(dir)) {
    window.api.mkdirSync(dir);
    dirPages = `${dir}/pages`;
    window.api.mkdirSync(dirPages);
    dirComponents = `${dir}/components`;
    window.api.mkdirSync(dirComponents);
  }
};

/**
 * Creates a base TypeScript file (_app.tsx) for the specified application. This file sets up a fundamental React component structure,
 * importing global CSS and defining a root component that renders any child components passed to it.
 * The function writes this configuration to a file within the 'pages' directory of the application.
 * @param {string} path - The base directory path where the application files will be created.
 * @param {string} appName - The name of the application, used to determine the specific directory for the _app.tsx file.
 * @returns {void} - Does not return a value; it performs file writing operations directly.
 */
export const createBaseTsx = (path, appName): void => {
  const filePath = `${path}/${appName}/pages/_app.tsx`;
  const data = `
  import React from 'react';
  import '../global.css';
  const Base = ({ Component }):JSX.Element => {
    return (
      <>
        <Component />
      </>
    )
  }
  export default Base;
  `;
  window.api.writeFile(filePath, data, (err) => {
    if (err) {
      console.log('_app.tsx error:', err.message);
    } else {
      console.log('_app.tsx written successfully');
    }
  });
};

/**
 * Asynchronously creates a full Next.js application setup including directories, base React component files,
 * CSS configurations, package management files, and TypeScript configurations. This function may also set up
 * a testing suite if specified. It handles all necessary asynchronous operations to ensure the full application
 * structure is correctly built.
 * @param {Object} options The configuration options for creating the Next.js app.
 * @param {string} options.path The base path where the application will be created.
 * @param {string} options.appName The name of the application to be created.
 * @param {Component[]} options.components Array of components to be included in the application.
 * @param {number[]} options.rootComponents Array of indices pointing to root components, which affects file placement within the 'pages' directory.
 * @param {boolean} options.testchecked Indicates whether to include test setup in the generated application.
 * @returns {Promise<void>} A promise that resolves when all operations are completed, indicating the application has been fully set up.
 */
async function createNextAppUtil({
  path,
  appName,
  components,
  rootComponents,
  testchecked,
}: {
  path: string;
  appName: string;
  components: Component[];
  rootComponents: number[];
  testchecked: boolean;
}): Promise<void> {
  await initFolders(path, appName);
  await createBaseTsx(path, appName);
  await createDefaultCSS(path, appName, components);
  await createPackage(path, appName, testchecked);
  await createTsConfig(path, appName);
  if (testchecked) {
    await createTestSuiteNext({
      path,
      appName,
      components,
      rootComponents,
      testchecked,
    });
  }
  await createNextFiles(components, path, appName, rootComponents);
}
export default createNextAppUtil;
