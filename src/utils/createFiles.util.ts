import fs from 'fs';
import { format } from 'prettier';
import componentRender from './componentRender.util.ts';

const createFiles = (
  components: any,
  path: string,
  appName: string,
  exportAppBool: boolean
) => {
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
  }

  const promises: Array<any> = [];
  components.forEach((component: any) => {
    const newPromise = new Promise((resolve, reject) => {
      fs.writeFile(
        `${dir}/${component.title}.tsx`,
        format(componentRender(component, components), {
          singleQuote: true,
          trailingComma: 'es5',
          bracketSpacing: true,
          jsxBracketSameLine: true,
          parser: 'typescript'
        }),
        (err: any) => {
          if (err) return reject(err.message);
          return resolve(path);
        }
      );
    });

    promises.push(newPromise);
  });
  return Promise.all(promises);
};

export default createFiles;
