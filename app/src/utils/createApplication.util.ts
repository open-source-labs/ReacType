import { Component } from '../interfaces/Interfaces';
// Create all files necessary to run a classic react application
import createFiles from './createFiles.util';
import createTestSuiteClassic from './createTestSuiteClassic.util';
import store from '../redux/store';

/**
 * Converts camelCase strings to kebab-case.
 * @param {string} camel - The string in camelCase format.
 * @returns {string} - The string converted to kebab-case.
 */
const camelToKebab = (camel: string): string => {
  return camel.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
};

/**
 * Converts a component object into CSS string format.
 * @param {Component} component - The component object with name and style properties.
 * @returns {string} - The CSS string for the component.
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
 * Creates an index.html file for the React application, along with necessary directories if they do not exist.
 * The function ensures that all required directories (src, server, components, contexts) exist, then writes
 * an index.html file with a basic HTML structure to serve the React app.
 * @param {string} path - The base directory path where the application is to be created.
 * @param {string} appName - The name of the application, used to create a specific directory for the app.
 * @returns {void} - This function has no return value but will log errors or success messages to the console.
 */
function createIndexHtml(path, appName): void {
  let dir = path;
  let dirSrc;
  let dirServer;
  let dirComponent;
  let dirContext;
  if (!dir.match(/`${appName}`|\*$/)) {
    dir = `${dir}/${appName}`;
    if (!window.api.existsSync(dir)) {
      window.api.mkdirSync(dir);
      dirSrc = `${dir}/src`;
      window.api.mkdirSync(dirSrc);
      dirServer = `${dir}/server`;
      window.api.mkdirSync(dirServer);
      dirComponent = `${dirSrc}/components`;
      window.api.mkdirSync(dirComponent);
      //create directory for contexts
      dirContext = `${dirSrc}/contexts`;
      window.api.mkdirSync(dirContext);
    }
  }
  const filePath: string = `${dir}/index.html`;
  const data: string = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>ReacType App</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="./build/bundle.js"></script>
  </body>
</html>
  `;
  window.api.writeFileSync(filePath, data, (err) => {
    if (err) {
      console.log('index.html error:', err.message);
    } else {
      console.log('index.html written successfully');
    }
  });
}

/**
 * Creates an `index.tsx` file at the specified path within the application directory. This file is the main
 * entry point for the React application, setting up React DOM rendering for the main app component.
 * It imports the main App component and attaches it to the root DOM element. This function also handles
 * writing the file and logging the outcome of the operation.
 * @param {string} path - The base directory path where the application is to be created.
 * @param {string} appName - The name of the application, used to determine the directory structure for the file.
 * @returns {void} - This function does not return a value but outputs through the console.
 */
export const createIndexTsx = (path, appName): void => {
  const filePath = `${path}/${appName}/src/index.tsx`;
  const data = `import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './default.css';
ReactDOM.render(<App />, document.getElementById('root'));
  `;
  window.api.writeFile(filePath, data, (err) => {
    if (err) {
      console.log('index.tsx error:', err.message);
    } else {
      console.log('index.tsx written successfully');
    }
  });
};

/**
 * Generates a default CSS file (`default.css`) for the React application at the specified path.
 * This file includes basic styles for the root div and adds component-specific styles as defined in the
 * components array. Each component's styles are generated using the `compToCSS` function.
 * @param {string} path - The base directory path where the application is to be created.
 * @param {string} appName - The name of the application, used to determine the directory structure for the CSS file.
 * @param {Component[]} components - An array of component objects which include name and style properties for CSS generation.
 * @returns {void} - This function does not return a value but will log the outcome of the file writing operation to the console.
 */
export const createDefaultCSS = (path, appName, components): void => {
  const filePath = `${path}/${appName}/src/default.css`;
  let data = `#root div {
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
      console.log('default.css error:', err.message);
    } else {
      console.log('default.css written successfully');
    }
  });
};

/**
 * Creates a `package.json` file for the React application at the specified path. This file configures the project,
 * setting up scripts for starting the server, building the application, and running development servers.
 * It conditionally adds testing scripts and dependencies if specified. The function writes the configuration
 * to the `package.json` file and logs the outcome of this operation.
 *
 * @param {string} path - The base directory path where the application is to be created.
 * @param {string} appName - The name of the application, used to determine the directory structure for the `package.json` file.
 * @param {boolean} test - Indicates whether to include testing scripts and dependencies in the `package.json`.
 * @returns {void} - This function does not return a value but will log the outcome of the file writing operation to the console.
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
    "@types/enzyme-adapter-react-16": "^1.0.6",
    "ts-jest": "^27.0.5",
    "enzyme-to-json": "^3.6.2"`;
  const data = `{
  "name": "reactype",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node server/server.js",
    "build": "cross-env NODE_ENV=production webpack",
    "dev": "cross-env NODE_ENV=development webpack-dev-server"${
      test
        ? `,
    "test": "jest"`
        : ''
    }
  },
  "nodemonConfig": {
    "ignore": [
      "build",
      "src"
    ]
  },
  "keywords": [],
  "author": "",
  "license": "MIT",
  "dependencies": {
    "@types/react": "^16.8.13",
    "@types/react-dom": "^16.8.4",
    "express": "^4.17.1",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "webpack": "^4.29.6"
  },
  "devDependencies": {
    "@babel/core": "^7.4.3",
    "@babel/preset-env": "^7.4.3",
    "@babel/preset-react": "^7.0.0",
    "@babel/preset-typescript": "^7.3.3",
    "babel-loader": "^8.0.5",
    "cross-env": "^5.2.0",
    "css-loader": "^2.1.1",
    "file-loader": "^3.0.1",
    "isomorphic-fetch": "^2.2.1",
    "node-sass": "^7.0.1",
    "nodemon": "^1.18.9",
    "postcss-loader": "^3.0.0",
    "sass-loader": "^7.1.0",
    "source-map-loader": "^0.2.4",
    "style-loader": "^0.23.1",
    "tslint": "^5.15.0",
    "tslint-config-prettier": "^1.18.0",
    "tslint-react": "^4.0.0",
    "typescript": "^3.8.3",
    "webpack": "^4.29.6",
    "webpack-cli": "^3.3.0",
    "webpack-dev-server": "^3.2.1"${test ? tsjest : ''}
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
 * Creates a `webpack.config.js` file for the React application at the specified path. This configuration file sets
 * up webpack for building the application, including rules for handling TypeScript, JavaScript, CSS, and SCSS files.
 * It dynamically sets the webpack mode based on the environment variable and ensures source maps are generated for
 * debugging. The function also handles the writing of this configuration file and logs the outcome.
 * @param {string} path - The base directory path where the application is to be created.
 * @param {string} appName - The name of the application, used to determine the directory structure for the webpack configuration file.
 * @returns {void} - This function does not return a value but will log the outcome of the file writing operation to the console.
 */
export const createWebpack = (path, appName): void => {
  const filePath = `${path}/${appName}/webpack.config.js`;
  const data = `var status = import.meta.env.NODE_ENV; //taken from script so we don't have to flip mode when using development/production
var path = require('path');
module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  mode: status,
  devServer: {
    publicPath: '/build/',
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by babel-loader
      { test: /.tsx?$/, exclude: /node-modules/, loader: 'babel-loader' },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: 'pre', test: /.js$/, exclude: /node-modules/, loader: 'source-map-loader' },
      {
        test: /.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to CSS, using Node Sass by default
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ],
  },
};
  `;
  window.api.writeFile(filePath, data, (err) => {
    if (err) {
      console.log('webpack error:', err.message);
    } else {
      console.log('webpack written successfully');
    }
  });
};

/**
 * Creates a `.babelrc` file for the React application at the specified path. This configuration file sets up Babel
 * presets for handling JavaScript according to ECMAScript standards, React JSX syntax, and TypeScript. It writes this
 * configuration to the `.babelrc` file and logs whether the operation was successful or if an error occurred.
 * @param {string} path - The base directory path where the application is to be created.
 * @param {string} appName - The name of the application, used to determine the directory structure for the Babel configuration file.
 * @returns {void} - This function does not return a value but will log the outcome of the file writing operation to the console.
 */
export const createBabel = (path, appName): void => {
  const filePath = `${path}/${appName}/.babelrc`;
  const data = `{
  "presets": ["@babel/env", "@babel/react", "@babel/typescript"]
}
`;
  window.api.writeFile(filePath, data, (err) => {
    if (err) {
      console.log('babelrc error:', err.message);
    } else {
      console.log('babelrc written successfully');
    }
  });
};

/**
 * Creates a `tsconfig.json` file for the React application at the specified path. This configuration file sets up
 * TypeScript compiler options such as the output directory, module system, ECMAScript target version, JSX pragma,
 * library inclusions, and more to ensure proper compilation of TypeScript files in the project. It also specifies
 * which files to include in the compilation process. The function writes this configuration to the `tsconfig.json`
 * file and logs whether the operation was successful or if an error occurred.
 * @param {string} path - The base directory path where the application is to be created.
 * @param {string} appName - The name of the application, used to determine the directory structure for the TypeScript configuration file.
 * @returns {void} - This function does not return a value but will log the outcome of the file writing operation to the console.
 */
export const createTsConfig = (path, appName): void => {
  const filePath = `${path}/${appName}/tsconfig.json`;
  const data = `{
  "compilerOptions": {
    "outDir": "./dist/",
    "sourceMap": true,
    "noImplicitAny": true,
    "module": "commonjs",
    "target": "es6",
    "jsx": "react",
    "lib": ["dom", "es6"],
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
 * Creates a `tslint.json` file for the React application at the specified path. This configuration file sets up
 * TypeScript linting rules and extends from recommended, React-specific, and Prettier configurations. The file
 * specifies linting rules, such as quotation marks, JSX boolean values, and others, to ensure code quality and
 * consistency. The function also configures the linter to auto-fix certain issues on save. It writes this
 * configuration to the `tslint.json` file and logs whether the operation was successful or if an error occurred.
 * @param {string} path - The base directory path where the application is to be created.
 * @param {string} appName - The name of the application, used to determine the directory structure for the TypeScript linting configuration file.
 * @returns {void} - This function does not return a value but will log the outcome of the file writing operation to the console.
 */
export const createTsLint = (path, appName): void => {
  const filePath = `${path}/${appName}/tslint.json`;
  const data = `{
  "extends": ["tslint:recommended", "tslint-react", "tslint-config-prettier"],
  "tslint.autoFixOnSave": true,
  "linterOptions": {
    "exclude": ["config/**/*.js", "node_modules/**/*.ts"]
  },
  "rules": {
    "quotemark": [true, "single", "avoid-escape", "avoid-template", "jsx-double"],
    "jsx-boolean-value": false,
    "jsx-no-lambda": false,
    "jsx-no-multiline-js": false,
    "object-literal-sort-keys": false,
    "member-ordering": false,
    "no-console": false,
    "ordered-imports": false,
    "comment-format": false
  }
}
`;
  window.api.writeFile(filePath, data, (err) => {
    if (err) {
      console.log('TSLint error:', err.message);
    } else {
      console.log('TSLint written successfully');
    }
  });
};

/**
 * Creates a server configuration file (`server.js`) for the React application at the specified path.
 * This server file uses Express.js to serve the build directory and the main `index.html` file.
 * It includes a test endpoint and configuration to listen on port 8080. The function writes
 * this server setup to the `server.js` file within a designated server directory and logs
 * the outcome of this operation, indicating success or reporting any errors.
 * @param {string} path - The base directory path where the application is to be created.
 * @param {string} appName - The name of the application, used to determine the directory structure
 * for the server configuration file.
 * @returns {void} - This function does not return a value but will log the outcome of the file writing
 * operation to the console.
 */
export const createServer = (path, appName): void => {
  const filePath = `${path}/${appName}/server/server.js`;
  const data = `const express = require('express');
const path = require('path');
const app = express();
app.get('/testDev', (req, res) => {
  res.send({ dev: 'testDev endpoint hit' });
});
// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));
// serve index.html on the route '/'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});
app.listen(8080, () => {
  console.log('listening on port 8080');
}); //listens on port 8080 -> http://localhost:8080/
`;
  window.api.writeFile(filePath, data, (err) => {
    if (err) {
      console.log('server file error:', err.message);
    } else {
      console.log('server file written successfully');
    }
  });
};

/**
 * Generates context files for all existing contexts in the current application. Each context file includes
 * a React context provider that initializes with a predefined state derived from the application's redux store.
 * This setup allows different parts of the React application to access and utilize shared state through context.
 * The function writes each context file into a specified directory structure and logs the outcome of these
 * operations, reporting success or any errors encountered.
 * @param {string} path - The base directory path where the application contexts are to be created.
 * @param {string} appName - The name of the application, used to determine the directory structure for the context files.
 * @returns {void} - This function does not return a value but will log the outcome of the file writing operation to the console.
 */
export const createContext = (path, appName): void => {
  // const store = useStore();
  const { allContext } = store.getState().contextSlice;

  for (const context of allContext) {
    const cached = {};
    for (const ele of context.values) {
      cached[ele.key] = ele.value;
    }
    const filePath = `${path}/${appName}/src/contexts/${context.name}.js`;
    const data = `import {createContext, useState} from 'react'
export const ${context.name} = createContext();

const ${context.name}Provider = (props) => {
  const [${context.name}State] = useState(
    ${JSON.stringify(cached)}
    )
}

return (
  <${context.name}.Provider value={${context.name}State}>
    {props.children}
  </${context.name}.Provider>
);
export default ${context.name}Provider   
`;
    window.api.writeFileSync(filePath, data, (err) => {
      if (err) {
        console.log('server file error:', err.message);
      } else {
        console.log('server file written successfully');
      }
    });
  }
};

/**
 * Orchestrates the creation of all necessary files and configurations for a React application.
 * This utility function systematically sets up the core structure of the application by creating
 * essential files such as index.html, index.tsx, default CSS, package.json, webpack configuration,
 * babel configuration, TypeScript configuration, tslint configuration, and server setup files.
 * It also generates context providers and optionally sets up a classic test suite if specified.
 * Each step awaits the completion of the previous file creation to ensure proper setup order.
 * @param {Object} params - The parameters needed for setting up the application.
 * @param {string} params.path - The base directory path where the application is to be created.
 * @param {string} params.appName - The name of the application, used for directory structure and naming files.
 * @param {Component[]} params.components - An array of component objects that might be needed for CSS generation or other file setups.
 * @param {boolean} params.testchecked - Flag to determine whether to include test suite setup in the application.
 * @returns {Promise<void>} - Asynchronous function that completes once all files are created.
 */
async function createApplicationUtil({
  path,
  appName,
  components,
  testchecked
}: {
  path: string;
  appName: string;
  components: Component[];
  testchecked: boolean;
}): Promise<void> {
  await createIndexHtml(path, appName);
  await createIndexTsx(path, appName);
  await createDefaultCSS(path, appName, components);
  await createPackage(path, appName, testchecked);
  await createWebpack(path, appName);
  await createBabel(path, appName);
  await createTsConfig(path, appName);
  await createTsLint(path, appName);
  await createServer(path, appName);
  await createContext(path, appName);
  if (testchecked) {
    await createTestSuiteClassic({ path, appName, components, testchecked });
  }
  await createFiles(components, path, appName, true);
}
export default createApplicationUtil;
