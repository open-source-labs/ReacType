import createGatsbyFiles from './createGatsbyFiles.util';
import createTestSuite from './createTestSuite.util';
import { Component } from '../interfaces/Interfaces';

/**
 * Converts camelCase string to kebab-case.
 * @param {string} camel - The string in camelCase format.
 * @returns {string} - The string in kebab-case format.
 */
const camelToKebab = (camel: string): string => {
  return camel.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
};

/**
 * Generates CSS class definitions based on the component's style object.
 * @param {Component} component - The component object with name and style properties.
 * @returns {string} - CSS class definitions for the component.
 */
const compToCSS = (component: Component): string => {
  const name = component.name;
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
 * Creates a package.json file with or without test configurations based on input.
 * @param {string} path - The path where the file should be created.
 * @param {string} appName - The application name.
 * @param {boolean} test - Indicates whether to include test configurations.
 * @returns {void} - This function writes to a file and does not return any value.
 */
export const createPackage = (path, appName, test): void => {
  const filePath = `${path}/${appName}/package.json`;
  let tsjest = `,
          "@types/enzyme": "^3.10.9",
          "@types/jest": "^27.0.1",
          "babel-jest": "^27.2.0",
          "enzyme": "^3.11.0",
          "enzyme-adapter-react-16": "^1.15.6",
          "jest": "^27.2.0",
          "@types/react-dom": "^17.0.9",
          "@types/enzyme-adapter-react-16": "^1.0.6",
          "@types/react-test-renderer": "^17.0.1",
          "babel-preset-gatsby": "^1.13.0",
          "identity-obj-proxy": "^3.0.0",
          "ts-jest": "^27.0.5"`;
  const data = `
      {
        "name": "reactype-gatsby",
        "version": "1.0.0",
        "description": "",
        "scripts": {
          "dev": "gatsby develop",
          "build": "gatsby build",
          "start": "npm run dev"${
            test
              ? `,
          "test": "jest"`
              : ''
          }
        },
        "dependencies": {
          "gatsby": "^2.26.1",
          "react": "16.13.1",
          "react-dom": "16.13.1"
        },
        "devDependencies": {
          "@types/node": "^14.0.20",
          "@types/react": "^16.9.41",
          "typescript": "^3.9.6"${test ? tsjest : ''}
        }
      }
        `;
  window.api.writeFile(filePath, data, (err) => {
    if (err) {
      console.log('package.json error:', err.message);
    } else {
      console.log('package.json written successfully');
    }
  });
};

/**
 * Creates a default tsconfig.json file for a Gatsby project.
 * @param {string} path - The base directory path.
 * @param {string} appName - The name of the app.
 * @returns {void} - This function writes to a file and does not return any value.
 */
export const createTsConfig = (path: string, appName: string): void => {
  const filePath: string = `${path}/${appName}/tsconfig.json`;
  //running 'gatsby dev' will autopopulate this with default values
  const data: string = `{
  "compilerOptions": {
    "outDir": "./dist/",
    "sourceMap": true,
    "noImplicitAny": true,
    "module": "commonjs",
    "target": "esnext",
    "jsx": "react",
    "lib": ["dom", "esnext"],
    "moduleResolution": "node",
    "esModuleInterop": true
  },
  "include": ["./src/**/*"]
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
 * Creates a global CSS file for the application that includes default styles and styles for provided components.
 * @param {string} path - The path where the CSS file should be created.
 * @param {string} appName - The name of the application for which the CSS is being created.
 * @param {Component[]} components - An array of component objects which will have their styles converted to CSS and included in the file.
 * @returns {void} - This function writes to a file and does not return any value.
 */
export const createDefaultCSS = (
  path: string,
  appName: string,
  components
): void => {
  const filePath = `${path}/${appName}/global.css`;
  let data = `
  #__gatsby div {
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
 * Initializes the necessary directory structure for a new application within a specified path.
 * This function creates the main application directory, along with subdirectories for 'src', 'pages', and 'components'.
 * @param {string} path - The base path where the application directories will be created.
 * @param {string} appName - The name of the application, which will be used as the root directory name.
 * @returns {void} - This function writes to a file and does not return any value.
 */
export const initFolders = (path: string, appName: string): void => {
  let dir = path;
  let dirPages;
  let dirComponents;
  dir = `${dir}/${appName}`;
  if (!window.api.existsSync(dir)) {
    window.api.mkdirSync(dir);
    window.api.mkdirSync(`${dir}/src`);
    dirPages = `${dir}/src/pages`;
    window.api.mkdirSync(dirPages);
    dirComponents = `${dir}/src/components`;
    window.api.mkdirSync(dirComponents);
  }
};

/**
 * Creates a base TypeScript file (_app.tsx) for a Gatsby application, including a basic React component setup.
 * This function writes the file with an import of React, a global CSS import, and a default export of a base component.
 * @param {string} path - The path where the application resides.
 * @param {string} appName - The name of the application; used to build the path to the TypeScript file.
 * @returns {void} - This function writes to a file and does not return any value.
 */
export const createBaseTsx = (path: string, appName: string): void => {
  const filePath: string = `${path}/${appName}/src/pages/_app.tsx`;
  const data: string = `
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
 * Creates a base TypeScript file (_app.tsx) for a Gatsby application which setups up the main React component structure.
 * This file will include necessary imports and define a basic React component structure.
 * @param {string} path - The base directory path where the file will be created.
 * @param {string} appName - The name of the application, used to specify the directory.
 * @returns {Promise<void>} - This function writes to a file and does not return any value.
 */
async function createGatsbyAppUtil({
  path,
  appName,
  components,
  rootComponents,
  testchecked
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
    await createTestSuite({
      path,
      appName,
      components,
      rootComponents,
      testchecked
    });
  }
  await createGatsbyFiles(components, path, appName, rootComponents);
}
export default createGatsbyAppUtil;
