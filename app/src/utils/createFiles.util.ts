/**
 * Creates TypeScript component files for each component provided in the components array. These files
 * are placed in a "components" directory within the specified path. The function can differentiate
 * between exporting files for a full application or just locally within a specified directory, based
 * on the `exportAppBool` flag. It handles file creation asynchronously and resolves once all files
 * are successfully written, or rejects upon any error.
 *
 * @param {any[]} components - An array of objects representing components, each with a `name` and `code` property.
 * @param {string} path - The base directory path where component files are to be created.
 * @param {string} appName - The name of the application, used to structure the directory if exporting as part of an application setup.
 * @param {boolean} exportAppBool - A boolean flag that indicates whether the components are being exported as part of a full application setup.
 * @returns {Promise<Array<string>>} - A promise that resolves with an array of paths where files have been created, or rejects with an error message.
 */

const createFiles = (
  components: any,
  path: string,
  appName: string,
  exportAppBool: boolean
): Promise<Array<string>> => {
  let dir = path;
  if (exportAppBool === false) {
    if (!dir.match(/components|\*$/)) {
      if (window.api.existsSync(`${dir}/src`)) {
        dir = `${dir}/src`;
      }
      dir = `${dir}/components`;
      if (!window.api.existsSync(dir)) {
        window.api.mkdirSync(dir);
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
      window.api.writeFileSync(
        `${dir}/${component.name}.tsx`,

        //this formatCodefunction has asynchronous issue
        // window.api.formatCode(component.code),
        component.code,
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
