const depcheck = require('depcheck');

const options = {
  parsers: {
    '*.js': depcheck.parser.es6,
    '*.jsx': depcheck.parser.jsx,
    '*.json': [depcheck.parser.json1, depcheck.parser.json2],
    '*.ts': depcheck.parser.typescript,
    '*.tsx': depcheck.parser.typescript
  },
  detectors: [
    depcheck.special.babel,
    depcheck.special.eslint,
    depcheck.special.tslint,
    depcheck.special.ttypescript,
    depcheck.special.webpack,
    depcheck.special.jest
  ]
};

depcheck(
  '/Users/tylersullberg/Codesmith/reactype/ReacType',
  options,
  unused => {
    console.log(unused.dependencies); // an array containing the unused dependencies
    console.log(unused.devDependencies); // an array containing the unused devDependencies
    console.log(unused.missing); // a lookup containing the dependencies missing in `package.json` and where they are used
    console.log(unused.using); // a lookup indicating each dependency is used by which files
    console.log(unused.invalidFiles); // files that cannot access or parse
    console.log(unused.invalidDirs); // directories that cannot access
  }
);
