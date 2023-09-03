module.exports = {
  testEnvironment: 'jsdom',
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
  transform: {
    '\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.js?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)',
  ],
  testRegex: '/__tests__/.*\\.(ts|tsx|js)$',
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
};
