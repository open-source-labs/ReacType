// Create all files necessary to run a classic react application

import createFiles from './createFiles.util';
import { Component} from '../interfaces/Interfaces';

const camelToKebab= (camel:string) => {
  return camel.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
};

const compToCSS = (component: Component) => {
  const name = component.name;
  const styleObj = component.style;
  let cssClass = `
  .${name} {
    `;
  Object.keys(styleObj).forEach(property => {
    let cssStyle = `${camelToKebab(property)}: ${styleObj[property]};
    `;
    cssClass += cssStyle;
  })
  cssClass += `}
  `;
  return cssClass;
}

function createIndexHtml(path, appName) {
  let dir = path;
  let dirSrc;
  let dirServer;
  let dirComponent;
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
    }
  }

  const filePath: string = `${dir}/index.html`;
  const data: string = `
<!DOCTYPE html>
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
  window.api.writeFileSync(filePath, data, err => {
    if (err) {
      console.log('index.html error:', err.message);
    } else {
      console.log('index.html written successfully');
    }
  });
}

export const createIndexTsx = (path, appName) => {
  const filePath = `${path}/${appName}/src/index.tsx`;
  const data = `
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './default.css';

ReactDOM.render(<App />, document.getElementById('root'));
  `;
  window.api.writeFile(filePath, data, err => {
    if (err) {
      console.log('index.tsx error:', err.message);
    } else {
      console.log('index.tsx written successfully');
    }
  });
};

export const createDefaultCSS = (path, appName, components) => {
  const filePath = `${path}/${appName}/src/default.css`;
  let data = `
  #root div {
    box-sizing: border-box;
    width: 100%;
    border: 1px solid rgba(0,0,0,0.25);
    padding: 12px;
    text-align: center;
    font-family: Helvetica, Arial;
  }
  `;
  components.forEach(comp => {
    data += compToCSS(comp);
  })

  window.api.writeFile(filePath, data, err => {
    if (err) {
      console.log('default.css error:', err.message);
    } else {
      console.log('default.css written successfully');
    }
  });
};

export const createPackage = (path, appName) => {
  const filePath = `${path}/${appName}/package.json`;
  const data = `
{
  "name": "reactype",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node server/server.js",
    "build": "cross-env NODE_ENV=production webpack",
    "dev": "cross-env NODE_ENV=development webpack-dev-server"
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
    "node-sass": "^4.11.0",
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
    "webpack-dev-server": "^3.2.1"
  }
}
  `;
  window.api.writeFile(filePath, data, err => {
    if (err) {
      console.log('package.json error:', err.message);
    } else {
      console.log('package.json written successfully');
    }
  });
};

export const createWebpack = (path, appName) => {
  const filePath = `${path}/${appName}/webpack.config.js`;
  const data = `
var status = process.env.NODE_ENV; //taken from script so we don't have to flip mode when using development/production
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
  window.api.writeFile(filePath, data, err => {
    if (err) {
      console.log('webpack error:', err.message);
    } else {
      console.log('webpack written successfully');
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
  window.api.writeFile(filePath, data, err => {
    if (err) {
      console.log('babelrc error:', err.message);
    } else {
      console.log('babelrc written successfully');
    }
  });
};

export const createTsConfig = (path, appName) => {
  const filePath = `${path}/${appName}/tsconfig.json`;
  const data = `
{
  "compilerOptions": {
    "outDir": "./dist/",
    "sourceMap": true,
    "noImplicitAny": true,
    "module": "commonjs",
    "target": "es6",
    "jsx": "react",
    "allowSyntheticDefaultImports": true
  },
  "include": ["./src/**/*"]
}
`;
  window.api.writeFile(filePath, data, err => {
    if (err) {
      console.log('TSConfig error:', err.message);
    } else {
      console.log('TSConfig written successfully');
    }
  });
};

export const createTsLint = (path, appName) => {
  const filePath = `${path}/${appName}/tslint.json`;
  const data = `
{
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
    // "jsx-key": false,
  }
}
`;
  window.api.writeFile(filePath, data, err => {
    if (err) {
      console.log('TSLint error:', err.message);
    } else {
      console.log('TSLint written successfully');
    }
  });
};

export const createServer = (path, appName) => {
  const filePath = `${path}/${appName}/server/server.js`;
  const data = `
const express = require('express');
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
  window.api.writeFile(filePath, data, err => {
    if (err) {
      console.log('server file error:', err.message);
    } else {
      console.log('server file written successfully');
    }
  });
};

async function createApplicationUtil({
  path,
  appName,
  components
}: {
  path: string;
  appName: string;
  components: Component[];
}) {
  console.log('in the createApplication util');

  await createIndexHtml(path, appName);
  await createIndexTsx(path, appName);
  await createDefaultCSS(path, appName, components);
  await createPackage(path, appName);
  await createWebpack(path, appName);
  await createBabel(path, appName);
  await createTsConfig(path, appName);
  await createTsLint(path, appName);
  await createServer(path, appName);
  await createFiles(components, path, appName, true);
}
export default createApplicationUtil;
