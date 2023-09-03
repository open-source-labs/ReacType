module.exports = {
  testEnvironment: 'node',
  bail: true,
  moduleNameMapper: {
    '^.+\\.(css|scss|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'identity-obj-proxy',
    '^d3$': '<rootDir>/node_modules/d3/dist/d3.min.js',
  },
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
  ],
  modulePathIgnorePatterns: [
    '__tests__/playwright',
    '__tests__/spec.ts',
    '__tests__/userAuth.test.ts',
  ],
  testMatch: [
    '**/__tests__/nodetest/**/*.[jt]s?(x)', // Pattern for Node.js tests
  ],
  transform: {
    '\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.js?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)',
  ],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
};
