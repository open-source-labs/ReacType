import fs from 'fs';
import { format } from 'prettier';
import componentRender from './componentRender.util.ts';

function createIndexHtml(path, appName) {
  let dir = path;
  let dirSrc;
  let dirServer;
  let dirComponent;
  if (!dir.match(/`${appName}`|\*$/)) {
    dir = `${dir}/${appName}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      dirSrc = `${dir}/src`;
      fs.mkdirSync(dirSrc);
      dirServer = `${dir}/server`;
      fs.mkdirSync(dirServer);
      dirComponent = `${dirSrc}/components`;
      fs.mkdirSync(dirComponent);
    }
  }

  const filePath: string = `${dir}/index.html`;
  const data: string = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>ReacType App</title>
    </head>
    <body>
      <div id="root"></div>
      <script src="./build/bundle.js"></script>
    </body>
  </html>
  `;
  fs.writeFileSync(filePath, data, err => {
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
  import * as React from 'react';
  import * as ReactDOM from 'react-dom';
  
  import { App } from './components/App';
  
  ReactDOM.render(<App />, document.getElementById('root'));
  `;
  fs.writeFile(filePath, data, err => {
    if (err) {
      console.log('index.tsx error:', err.message);
    } else {
      console.log('index.tsx written successfully');
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
"license": "ISC",
"depenencies": {
  "react": "^16.4.1",
  "react-dom": "^16.4.1"
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
      // proxy: {
      //   '/testDev': 'http://localhost:3000',
      // },
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
      ],
    },
  };
  `;
  fs.writeFile(filePath, data, err => {
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
  fs.writeFile(filePath, data, err => {
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
      "outDir": "./build/",
      "sourceMap": true,
      "noImplicitAny": true,
      "module": "commonjs",
      "target": "es6",
      "jsx": "react"
    },
    "include": ["./src/**/*"],
    "exclude": ["node_modules"]
  }
`;
  fs.writeFile(filePath, data, err => {
    if (err) {
      console.log('TSConfig error:', err.message);
    } else {
      console.log('TSConfig written successfully');
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
  
  app.listen(3000, () => {
    console.log('listening on port 3000');
  }); //listens on port 3000 -> http://localhost:3000/
`;
  fs.writeFile(filePath, data, err => {
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
  genOption,
}: {
  path: string;
  appName: string;
  genOption: number;
}) {
  if (genOption === 1) {
    await createIndexHtml(path, appName);
    await createIndexTsx(path, appName);
    await createPackage(path, appName);
    await createWebpack(path, appName);
    await createBabel(path, appName);
    await createTsConfig(path, appName);
    await createServer(path, appName);
  }
}
export default createApplicationUtil;
