import createGatsbyFiles from './createGatsbyFiles.util';
import createTestSuite from './createTestSuite.util';
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
export const createPackage = (path, appName, test) => {
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
            test ? `,
          "test": "jest"`: '' }
        },
        "dependencies": {
          "gatsby": "^2.26.1",
          "react": "16.13.1",
          "react-dom": "16.13.1"
        },
        "devDependencies": {
          "@types/node": "^14.0.20",
          "@types/react": "^16.9.41",
          "typescript": "^3.9.6"${
            test ? tsjest : '' }
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
export const createTsConfig = (path:string, appName:string) => {
  const filePath:string = `${path}/${appName}/tsconfig.json`;
  //running 'gatsby dev' will autopopulate this with default values
  const data:string = `{
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
  window.api.writeFile(filePath, data, err => {
    if (err) {
      console.log('TSConfig error:', err.message);
    } else {
      console.log('TSConfig written successfully');
    }
  });
};

//createDefaultCSS
export const createDefaultCSS = (path:string, appName:string, components) => {
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
  console.log(components);
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
  if (!window.api.existsSync(dir)) {
    window.api.mkdirSync(dir);
    window.api.mkdirSync(`${dir}/src`)
    dirPages = `${dir}/src/pages`;
    window.api.mkdirSync(dirPages);
    dirComponents = `${dir}/src/components`;
    window.api.mkdirSync(dirComponents);
  }
};

//createBaseTsx
export const createBaseTsx = (path: string, appName: string) => {
  const filePath:string = `${path}/${appName}/src/pages/_app.tsx`;
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

async function createGatsbyAppUtil({
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
    await createTestSuite({path, appName, components, rootComponents, testchecked});
  }
  await createGatsbyFiles(components, path, appName, rootComponents);
}
export default createGatsbyAppUtil;
