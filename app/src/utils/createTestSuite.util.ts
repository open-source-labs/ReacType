
// create config files
// add webpack dependencies
// create tests for components
// const createTestSuite = () => {
//   console.log('creating test suites');
// }

const initFolders = (path: string, appName: string) => {
  console.log(window); // remember to delete
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
  let data: `
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
}

export default createTestSuite;