// Create all files necessary to run a next.js application
import createNextFiles from './createNextFiles.util';
import { Component } from '../interfaces/Interfaces';
import createTestSuiteNext from './createTestSuiteNext.util';
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
export const createPackage = (path, appName, test) => {
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
    "start": "next start"${
      test ? `,
    "test": "jest"`: '' }
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
    "typescript": "^3.9.6"${
      test ? testpackages : '' 
  }
  }
}
`;
  window.api.writeFile(filePath, data, err => {
    if (err) {
      console.log('createNextApp.util package.json error:', err.message);
    } else {
      console.log('createNextApp.util package.json written successfully');
    }
  });
};
//createTSConfig (empty)
export const createTsConfig = (path, appName) => {
  const filePath = `${path}/${appName}/tsconfig.json`;
  //running 'next dev' will autopopulate this with default values
  const data:string = `{
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
  window.api.writeFile(filePath, data, err => {
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
  rootComponents,
  testchecked,
}: {
  path: string;
  appName: string;
  components: Component[];
  rootComponents: number[];
  testchecked: boolean;
}) {
  await initFolders(path, appName);
  await createBaseTsx(path, appName);
  await createDefaultCSS(path, appName, components);
  await createPackage(path, appName, testchecked);
  await createTsConfig(path, appName);
  if (testchecked) {
    await createTestSuiteNext({path, appName, components, rootComponents, testchecked});
  }
  await createNextFiles(components, path, appName, rootComponents);
}
export default createNextAppUtil;
