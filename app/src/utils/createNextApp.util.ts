// Create all files necessary to run a next.js application

import createNextFiles from './createNextFiles.util';
import { Component } from '../interfaces/Interfaces';

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

//createPackage
export const createPackage = (path, appName) => {
  const filePath = `${path}/${appName}/package.json`;
  const data = `
{
  "name": "reactype-next",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "9.3.5",
    "react": "16.13.1",
    "react-dom": "16.13.1"
  },
  "devDependencies": {
    "@types/node": "^14.0.20",
    "@types/react": "^16.9.41",
    "typescript": "^3.9.6"
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
//createTSConfig (empty)
export const createTsConfig = (path, appName) => {
  const filePath = `${path}/${appName}/tsconfig.json`;
  //running 'next dev' will autopopulate this with default values
  window.api.writeFile(filePath, '', err => {
    if (err) {
      console.log('TSConfig error:', err.message);
    } else {
      console.log('TSConfig written successfully');
    }
  });
};

//createDefaultCSS
export const createDefaultCSS = (path, appName, components) => {
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
  components.forEach(comp => {
    data += compToCSS(comp);
  })
  window.api.writeFile(filePath, data, err => {
    if (err) {
      console.log('global.css error:', err.message);
    } else {
      console.log('global.css written successfully');
    }
  });
}

export const initFolders = (path:string, appName: string) => {
  let dir = path;
  let dirPages;
  let dirComponents;
  dir = `${dir}/${appName}`;
  if(!window.api.existsSync(dir)){
    window.api.mkdirSync(dir);
    dirPages = `${dir}/pages`;
    window.api.mkdirSync(dirPages);
    dirComponents = `${dir}/components`;
    window.api.mkdirSync(dirComponents);
  }
}

//createBaseTsx
export const createBaseTsx = (path, appName) => {

  const filePath:string = `${path}/${appName}/pages/_app.tsx`;
  const data:string = `
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
  window.api.writeFile(filePath, data, err => {
    if (err) {
      console.log('_app.tsx error:', err.message);
    } else {
      console.log('_app.tsx written successfully');
    }
  });
};

async function createNextAppUtil({
  path,
  appName,
  components,
  rootComponents
}: {
  path: string;
  appName: string;
  components: Component[];
  rootComponents: number[];
}) {
  console.log('in the createNextApplication util');

  await initFolders(path, appName);
  await createBaseTsx(path, appName);
  await createDefaultCSS(path, appName, components);
  await createPackage(path, appName);
  await createTsConfig(path, appName);
  await createNextFiles(components, path, appName, rootComponents);

}
export default createNextAppUtil;
