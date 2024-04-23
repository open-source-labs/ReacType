// Creates all component files (but not the full application files) and places them in a "components" directory
const createFiles = (
  components: any,
  path: string,
  appName: string,
  exportAppBool: boolean
) => {
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
