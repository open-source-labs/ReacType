const initFolders = (path: string, appName: string) => {
  let dir = path;
  dir = `${dir}/${appName}`;
  if (!window.api.existsSync(`${dir}/__mocks__`)) {
    window.api.mkdirSync(`${dir}/__mocks__`);
  }
  if (!window.api.existsSync(`${dir}/__tests__`)) {
    window.api.mkdirSync(`${dir}/__tests__`);
  }
};

async function createJestConfigFile(path: String, appName: String) {
  const filePath: string = `${path}/${appName}/jest.config.js`;
  const data: string = `
module.exports = {
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js"
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "<rootDir>/jest-preprocess.js",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.([tj]sx?)$",
  globals: {
    "ts-jest": {
      babelConfig: true,
      tsconfig: "jest.tsconfig.json"
    }
  },
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "enzyme.js"
  ],
  coverageReporters: [
    "json",
    "lcov",
    "text",
    "text-summary"
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/file-mock.js",
    "\\.(css|less|scss)$": "identity-obj-proxy",
    "^uuid$": "uuid",
  }
}
`;
  window.api.writeFile(filePath, data, (err) => {
    if (err) {
      console.log(
        'createTestSuiteNext.util createJestConfigFile error:',
        err.message
      );
    } else {
      console.log(
        'createTestSuitNext.util createJestConfigFile written successfully'
      );
    }
  });
}

async function createJestTsconfigJsonFile(path: String, appName: String) {
  const filePath: string = `${path}/${appName}/jest.tsconfig.json`;
  const data: string = `
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "esnext",
    "jsx": "react",
    "sourceMap": false,
    "experimentalDecorators": true,
    "noImplicitUseStrict": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "lib": [
      "es2017",
      "dom"
    ],
    "typeRoots": [
      "node_modules/@types"
    ]
  },
  "exclude": [
    "node_modules",
    "out",
    ".next"
  ]
}
`;
  window.api.writeFile(filePath, data, (err) => {
    if (err) {
      console.log(
        'createTestSuiteNext.util createJestTsconfigJsonFile error:',
        err.message
      );
    } else {
      console.log(
        'createTestSuitNext.util createJestTsconfigJsonFile written successfully'
      );
    }
  });
}

async function createJestPreprocessFile(path: string, appName: string) {
  const filePath: string = `${path}/${appName}/jest-preprocess.js`;
  const data: string = `
const babelOptions = {
  presets: ["next/babel"],
}

module.exports = require("babel-jest").default.createTransformer(babelOptions)`;
  window.api.writeFile(filePath, data, (err) => {
    if (err) {
      console.log(
        'createTestSuite.util createJestPreprocessFile error:',
        err.message
      );
    } else {
      console.log(
        'createTestSuit.util createJestPreprocessFile written successfully'
      );
    }
  });
}

async function createEnzymeFile(path: string, appName: string) {
  const filePath: string = `${path}/${appName}/enzyme.js`;
  const data: string = `const Adapter = require('enzyme-adapter-react-16');
require('enzyme').configure({adapter: new Adapter()});`;

  window.api.writeFile(filePath, data, (err) => {
    if (err) {
      console.log('createTestSuite.util createEnzymeFile error:', err.message);
    } else {
      console.log('createTestSuit.util createEnzymeFile written successfully');
    }
  });
}

async function createComponentTests(
  path: string,
  appName: string,
  components: Component[]
) {
  const filePath: string = `${path}/${appName}/__tests__/test.tsx`;

  let data: string = `
  import { shallow } from 'enzyme'
  import React from 'react';
  `;

  components.forEach((page) => {
    let importString = '';
    if (page.isPage) {
      importString = `
import ${capitalize(page.name)} from "../pages/${page.name}";`;
      data = data + importString;
    } else {
      importString = `
import ${capitalize(page.name)} from "../components/${page.name}";`;
      data = data + importString;
    }
  });

  components.forEach((page) => {
    data =
      data +
      `
    
  describe("${capitalize(page.name)}", () => {`;

    data =
      data +
      `
  it('renders snapshots, too', () => {
      const wrapper = shallow(< ${capitalize(page.name)} />)
      expect(wrapper).toMatchSnapshot()
    })`;

    data =
      data +
      `
  });`;
  });

  window.api.writeFile(filePath, data, (err) => {
    if (err) {
      console.log(
        'createTestSuiteNext.util createComponentTests error:',
        err.message
      );
    } else {
      console.log(
        'createTestSuitNext.util createComponentTests written successfully'
      );
    }
  });
}

const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

async function createTestSuite({
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
}) {
  await initFolders(path, appName);
  await createJestConfigFile(path, appName);
  await createJestTsconfigJsonFile(path, appName);
  await createJestPreprocessFile(path, appName);
  await createEnzymeFile(path, appName);
  await createComponentTests(path, appName, components);
}

export default createTestSuite;
