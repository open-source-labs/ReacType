import fs from 'fs';
import { format } from 'prettier';
import componentRender from './componentRender.util';

const createFiles = (data, path, appName, exportAppBool) => {
  // if (!dir.match(/`${appName}`|\*$/)) {
  let dir = path;
  if (!dir.match(/components|\*$/)) {
    if (fs.existsSync(`${dir}/src`)) {
      dir = `${dir}/src`;
    }
  } else if (exportAppBool) {
    if (!dir.match(/${appName}|\*$/)) {
      dir = `${dir}/${appName}/src/components`;
    }
  }
  const promises = [];
  data.forEach(component => {
    const newPromise = new Promise((resolve, reject) => {
      fs.writeFile(
        `${dir}/${component.title}.tsx`,
        format(componentRender(component, data), {
          singleQuote: true,
          trailingComma: 'es5',
          bracketSpacing: true,
          jsxBracketSameLine: true,
          parser: 'typescript',
        }),
        err => {
          if (err) return reject(err.message);
          return resolve(path);
        },
      );
    });

    promises.push(newPromise);
  });

  return Promise.all(promises);
};

export default createFiles;
