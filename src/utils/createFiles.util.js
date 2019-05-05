import fs from 'fs';
import { format } from 'prettier';
import componentRender from './componentRender.util';

const createFiles = (data, path, appName, exportAppBool) => {
  // if (!dir.match(/`${appName}`|\*$/)) {
  let dir = path;
  if (exportAppBool === false) {
    if (!dir.match(/components|\*$/)) {
      if (fs.existsSync(`${dir}/src`)) {
        dir = `${dir}/src`;
      }
      dir = `${dir}/components`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
    }
  } else if (exportAppBool) {
    if (!dir.match(/${appName}|\*$/)) {
      dir = `${dir}/${appName}/src/components`;
    }
    // dir = `${dir}/${appName}/src/components`;
    // if (!fs.existsSync(dir)) {
    //   fs.mkdirSync(dir);
    // }
  }
  // if (dir.match(/${appName}|\*$/)) {
  // dir = `${dir}/${appName}/src`;
  // if (!dir.match(/components|\*$/)) {
  //   dir = `${dir}/components`;
  //   if (!fs.existsSync(dir)) {
  //     fs.mkdirSync(dir);
  //   }
  // }

  // if (!dir.match(/${appName}|\*$/)) {
  //   dir = `${dir}/${appName}/src`;
  //   if (!dir.match(/components|\*$/)) {
  //     dir = `${dir}/components`;
  //     if (!fs.existsSync(dir)) {
  //       fs.mkdirSync(dir);
  //     }
  //   }
  // }

  const promises = [];
  data.forEach((component) => {
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
        (err) => {
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
