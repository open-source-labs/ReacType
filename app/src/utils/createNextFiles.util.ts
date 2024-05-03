// Create all component files for a next.js application
// "Root" level components are stored in a pages directory
// all other components will be in a components directory
import { Component } from '../interfaces/Interfaces';

const isRoot = (component: Component, rootArray: number[]) => {
  return rootArray.includes(component.id) ? true : false;
};

const createNextFiles = (
  components: Component[],
  path: string,
  appName: string,
  rootComponents: number[]
) => {
  let dir = path;
  dir = `${dir}/${appName}`;

  const promises: Array<any> = [];
  components.forEach((component: Component) => {
    let code: string;
    let fileName: string;
    if (isRoot(component, rootComponents)) {
      if (component.id === 1) {
        // first root component must be index.tsx
        fileName = `${dir}/pages/index.tsx`;
      } else {
        fileName = `${dir}/pages/${component.name}.tsx`;
      }
    } else {
      fileName = `${dir}/components/${component.name}.tsx`;
    }
    const newPromise = new Promise((resolve, reject) => {
      window.api.writeFileSync(fileName, component.code, (err: any) => {
        if (err) return reject(err.message);
        return resolve(path);
      });
    });

    promises.push(newPromise);
  });
  return Promise.all(promises);
};

export default createNextFiles;
