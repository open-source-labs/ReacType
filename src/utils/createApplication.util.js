// import util from 'util';

// const execFile = util.promisify(require('child_process').execFile);

// This was commented out by other team
// Application generation options
// cosnt genOptions = [
//   'Export into existing project.', 'Export with starter repo', 'Export with create-react-app.'
// ];

// async function createApplicationUtil({
//   path, appName, genOption, repoUrl,
// }) {
  // if (genOption === 2) {
  //   return [
  //     await execFile('npm', ['i', '-g', 'create-react-app'], { cwd: path }),
  //     await execFile('create-react-app', [appName], { cwd: path }),
  //   ];
  // }
  // return repoUrl ? execFile('git', ['clone', repoUrl, appName], { cwd: path }) : null;

//   if (genOption === 2) {
//     return [
//       await execFile('npm', ['init', '-y'], { cwd: path }),
//       await execFile('touch', 'index.tsx', { cwd: path }),
//       await execFile('touch', 'index.html', { cwd: path }),
//       await execFile('touch', 'webpack.config.js', { cwd: path }),
//       await execFile('touch', '.babelrc', { cwd: path }),
//     ];
//   }
// }

// export default createApplicationUtil;

import fs from 'fs';
import { format } from 'prettier';
// import path from 'path';


function createIndexHtml() {
  const path = 'index.html';
  const data = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
    </head>
    <body>
      <div id='root'></div>
      <script src='bundle.js'></script>
    </body>
    </html>
  `;
  fs.writeFile(path, format(data, {
    singleQuote: true,
    trailingComma: 'es5',
    bracketSpacing: true,
    jsxBracketSameLine: true,
    parser: 'babel',
  }),
  (err) => {
    if (err) {
      console.log('index.html error:', err.message);
    } else {
      console.log('index.html written successfully');
    }
  });
}

function createIndexTsx() {
  const path = 'index.tsx';
  const data = `
    import React from 'react';
    import ReactDOM form 'react-dom'

    export default function App(): JSX.Element {
      const greeting = (a: string, b: string): string => a + b;
      return (
        <h1>{greeting('hello ', 'world')}</h1>
      )
    }
    const root = document.getElementById('root')

    ReactDOM.render(<App />, root)
  `;
  fs.writeFile(path, format(data, {
    singleQuote: true,
    trailingComma: 'es5',
    bracketSpacing: true,
    jsxBracketSameLine: true,
    parser: 'babel',
  }),
  (err) => {
    if (err) {
      console.log('index.tsx error:', err.message);
    } else {
      console.log('index.tsx written successfully');
    }
  });
}


function createPackage() {
  const path = 'package.json';
  const data = `
    {
      "name": "reacType-boiler-plate",
      "version": "1.0.0",
      "description": "",
      "main": index.tsx",
      "scripts": {
        "start": "webpack-dev-server --open",
        "build": "webpack"
      },
      "keywords": [],
      "author": "",
      "license": "ISC",
      "depenencies": {
        "react": "^16.4.1",
        "react-dom": "^16.4.1",
      },
      "devDependencies": {
        "@babel/preset-typescript": "^7.3.3",
        "@types/react": "^16.8.14",
        "@types/react-dom": "^16.8.4",
        "babel-core": "^6.26.3",
        "babel-eslint": "^8.2.6",
        "babel-loader": "^7.1.4",
        "babel-preset-env": "^1.6.1",
        "babel-preset-react": "^6.24.1",
        "typescript": "^3.4.4",
        "webpack": "^4.4.0",
        "webpack-cli": "^3.3.0",
        "webpack-dev-server": "^3.3.1"
      } 
    }
  `;
  fs.writeFile(path, format(data, {
    singleQuote: false,
    bracketSpacing: true,
    parser: 'babel',
  }),
  (err) => {
    if (err) {
      console.log('package.json error:', err.message);
    } else {
      console.log('package.json written successfully');
    }
  });
}

function createWebpack() {
  const path = 'webpack.config.js';
  const data = `
    const path = require('path');
    const rules = [
      {
        test: /\.tsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]

    module.exports = {
      target: 'web',
      mode: 'development',
      entry: './index.tsx',
      output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
      },
      module: { rules },
      resolve: {extensions: ['.ts', '.txs', '.js', 'jsx.']},
      devServer: {
        contentBase: './',
        port: 5000
      }
    }
  `;
  fs.writeFile(path, format(data, {
    singleQuote: true,
    trailingComma: 'es5',
    bracketSpacing: true,
    jsxBracketSameLine: true,
    parser: 'babel',
  }),
  (err) => {
    if (err) {
      console.log('webpack error:', err.message);
    } else {
      console.log('webpack written successfully');
    }
  });
}

function createBabel() {
  const path = '.babelrc';
  const data = `
    {
      "presets": ["@babel/env", "@babel/react", "@babel/typescript"]
    }
  `;
  fs.writeFile(path, format(data, {
    singleQuote: false,
    bracketSpacing: true,
    parser: 'babel',
  }),
  (err) => {
    if (err) {
      console.log('babelrc error:', err.message);
    } else {
      console.log('babelrc written successfully');
    }
  });
}

function createTsConfig() {
  const path = 'tsconfig.json';
  const data = `
    "compilerOptions": {
      "outDir": "./build/",
      "sourceMap": true,
      "noImplicitAny": true,
      "module": "commonjs",
      "target": "es6",
      "jsx": "react"
    },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules]
  `;
  fs.writeFile(path, format(data, {
    singleQuote: false,
    bracketSpacing: true,
    parser: 'babel',
  }),

  // createApplicationUtil,
export  {
  createIndexHtml,
  createIndexTsx,
  createPackage,
  createBabel,
  createWebpack,
  createTsConfig,
}