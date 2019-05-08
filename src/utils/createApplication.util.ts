import fs from "fs";
import { format } from "prettier";
import componentRender from "./componentRender.util";

function createIndexHtml(path, appName) {
  let dir = path;
  let dirSrc;
  let dirComponent;
  if (!dir.match(/`${appName}`|\*$/)) {
    dir = `${dir}/${appName}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      dirSrc = `${dir}/src`;
      fs.mkdirSync(dirSrc);
      dirComponent = `${dirSrc}/components`;
      fs.mkdirSync(dirComponent);
    }
  }

  const filePath: string = `${dir}/index.html`;
  const data: string = `
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
  fs.writeFileSync(filePath, data, err => {
    if (err) {
      console.log("index.html error:", err.message);
    } else {
      console.log("index.html written successfully");
    }
  });
}

export const createIndexTsx = (path, appName) => {
  const filePath = `${path}/${appName}/index.tsx`;
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
  fs.writeFile(filePath, data, err => {
    if (err) {
      console.log("index.tsx error:", err.message);
    } else {
      console.log("index.tsx written successfully");
    }
  });
};

export const createPackage = (path, appName) => {
  const filePath = `${path}/${appName}/package.json`;
  const data = `
{
  "name": "reacType-boiler-plate",
  "version": "1.0.0",
  "description": "",
  "main": "index.tsx",
  "scripts": {
    "start": "webpack-dev-server --open",
    "build": "webpack"
},
"keywords": [],
"author": "",
"license": "MIT",
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
  fs.writeFile(filePath, data, err => {
    if (err) {
      console.log("package.json error:", err.message);
    } else {
      console.log("package.json written successfully");
    }
  });
};

export const createWebpack = (path, appName) => {
  const filePath = `${path}/${appName}/webpack.config.js`;
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
  resolve: {extensions: ['.ts', '.tsx', '.js', '.jsx']},
  devServer: {
    contentBase: './',
    port: 5000
  }
}
  `;
  fs.writeFile(filePath, data, err => {
    if (err) {
      console.log("webpack error:", err.message);
    } else {
      console.log("webpack written successfully");
    }
  });
};

export const createBabel = (path, appName) => {
  const filePath = `${path}/${appName}/.babelrc`;
  const data = `
{
  "presets": ["@babel/env", "@babel/react", "@babel/typescript"]
}
`;
  fs.writeFile(filePath, data, err => {
    if (err) {
      console.log("babelrc error:", err.message);
    } else {
      console.log("babelrc written successfully");
    }
  });
};

export const createTsConfig = (path, appName) => {
  const filePath = `${path}/${appName}/tsconfig.json`;
  const data = `
{
  "compilerOptions": {
    "outDir": "./build/",
    "sourceMap": true,
    "noImplicitAny": true,
    "module": "commonjs",
    "target": "es6",
    "jsx": "react"
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
`;
  fs.writeFile(filePath, data, err => {
    if (err) {
      console.log("TSConfig error:", err.message);
    } else {
      console.log("TSConfig written successfully");
    }
  });
};

async function createApplicationUtil({ path, appName, genOption }) {
  if (genOption === 1) {
    await createIndexHtml(path, appName);
    await createIndexTsx(path, appName);
    await createPackage(path, appName);
    await createWebpack(path, appName);
    await createBabel(path, appName);
    await createTsConfig(path, appName);
  }
}
export default createApplicationUtil;
