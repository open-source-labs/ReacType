
// create config files
// add webpack dependencies
// create tests for components
// const createTestSuite = () => {
//   console.log('creating test suites');
// }

const initFolders = (path: string, appName: string) => {
  let dir = path;
  dir = `${dir}/${appName}`;
  if (!window.api.existsSync(`${dir}/__mocks__`)) {
    window.api.mkdirSync(`${dir}/__mocks__`);
  }
  if (!window.api.existsSync(`${dir}/__tests__`)) {
    window.api.mkdirSync(`${dir}/__tests__`);
  }
}

const createMocksFiles = (path: string, appName: string) => {
  const filePath:string = `${path}/${appName}/__mocks__/file-mock.js`;
  let data = `module.exports = "test-file-stub";`
  window.api.writeFile(filePath, data, err => {
    if (err) {
      console.log('createTestSuite.util createMocksFiles error', err.message);
    } else {
      console.log('createTestSuite.util createMocksFiles written successfully');
    }
  });

}



const createTestsFiles = (path: string, appName: string) => {
  const filePath:string = `${path}/${appName}/__mocks__/gatspy.js`;
  let data = `
  const React = require("react")
  const gatsby = jest.requireActual("gatsby")

  module.exports = {
    ...gatsby,
    Link: jest.fn().mockImplementation(
      ({
        activeClassName,
        activeStyle,
        getProps,
        innerRef,
        partiallyActive,
        ref,
        replace,
        to,
        ...rest
      }) =>
        React.createElement("a", {
          ...rest,
          href: to,
        })
    ),
    StaticQuery: jest.fn(),
    useStaticQuery: jest.fn(),
  }
`;
  window.api.writeFile(filePath, data, err => {
    if (err) {
      console.log('createTestSuite.util createTestsFiles error', err.message);
    } else {
      console.log('createTestSuite.util createTestsFiles written successfully');
    }
  });
}

async function createJestConfigFile(path: String, appName: String){
  const filePath:string = `${path}/${appName}/jest.config.js`;
  const data:string = `
  module.exports = {
    transform: {
      "^.+\\.tsx?$": "ts-jest",
      "^.+\\.jsx?$": "<rootDir>/jest-preprocess.js",
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.([tj]sx?)$",
    moduleNameMapper: {
      ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
      ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/file-mock.js",
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    testPathIgnorePatterns: ["node_modules", ".cache"],
    transformIgnorePatterns: ["node_modules/(?!(gatsby)/)"],
    globals: {
      __PATH_PREFIX__: '',
    }
  }
  `
  window.api.writeFile(filePath, data, err => {
    if (err) {
      console.log('createTestSuite.util createJestConfigFile error:', err.message);
    } else {
      console.log('createTestSuit.util createJestConfigFile written successfully');
    }
  });
};

async function createJestPreprocessFile(path: string, appName: string){
  const filePath: string = `${path}/${appName}/jest-preprocess.js`;
  const data:string = `
  const babelOptions = {
    presets: ["babel-preset-gatsby"],
  }

  module.exports = require("babel-jest").default.createTransformer(babelOptions)`;

  window.api.writeFile(filePath, data, err => {
    if (err) {
      console.log('createTestSuite.util createJestPreprocessFile error:', err.message);
    } else {
      console.log('createTestSuit.util createJestPreprocessFile written successfully');
    }
  });
}

async function createComponentTests(path: string, appName: string, components: Component[]) {
  const filePath: string = `${path}/${appName}/__tests__/test.tsx`;
  console.log(JSON.stringify(components))
  console.log(components);

  let data:string = `
  import React from "react"
  import renderer from "react-test-renderer"
  import Enzyme, { shallow } from 'enzyme';


  import Adapter from 'enzyme-adapter-react-16';
  Enzyme.configure({ adapter: new Adapter() });
  `;

  components.forEach(page => {

    let importString = `
  import ${capitalize(page.name)} from "../src/pages/${page.name}";`;
    data = data + importString;
  })

  //let describe = `describe("${page.name}", () => {`
  components.forEach(page => {
    data = data + `
    
  describe("${capitalize(page.name)}", () => {`
  

  data = data + `
    it("renders correctly", () => {
      const tree = renderer
          .create(<${capitalize(page.name)} />)
          .toJSON()
      expect(tree).toMatchSnapshot()
    })`


    data = data + `
  });`
  })

  
  
  window.api.writeFile(filePath, data, err => {
    if (err) {
      console.log('createTestSuite.util createComponentTests error:', err.message);
    } else {
      console.log('createTestSuit.util createComponentTests written successfully');
    }
  });
}

const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


async function createTestSuite({
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
  console.log('in the createGatsbyApplication util');
  console.log('testchecked: ', testchecked);

  await initFolders(path, appName);
  await createMocksFiles(path, appName);
  await createTestsFiles(path, appName);
  await createJestConfigFile(path, appName);
  await createJestPreprocessFile(path, appName);
  await createComponentTests(path, appName, components);
}

export default createTestSuite;