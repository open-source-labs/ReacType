/* eslint-disable max-len */
import { Component } from '../interfaces/Interfaces';

/**
 * Determines whether a given component is a root component.
 * Root components are identified by their IDs being included in the provided rootArray.
 * @param {Component} component The component to check.
 * @param {number[]} rootArray An array of IDs that identify root components.
 * @returns {boolean} Returns true if the component is a root component, false otherwise.
 */
const isRoot = (component: Component, rootArray: number[]): boolean => (!!rootArray.includes(component.id));

/**
 * Asynchronously creates TypeScript component files for a Gatsby.js application, organizing them into 'pages' and 'components' directories.
 * This function categorizes components as root or non-root based on their IDs. Root components are stored in the 'pages' directory,
 * with the first root component specifically stored as 'index.tsx'. All other root components are named according to their component name.
 * Non-root components are stored in the 'components' directory.
 * @param {Component[]} components An array of component objects that contain the necessary data to generate files.
 * @param {string} path The base directory path for the Gatsby application.
 * @param {string} appName The name of the Gatsby application.
 * @param {number[]} rootComponents An array of component IDs that should be treated as root components.
 * @returns {Promise<any[]>} A promise that resolves when all component files have been successfully written to disk.
 * The promise returns an array of the paths where the files were created.
 */
const createGatsbyFiles = (
  components: Component[],
  path: string,
  appName: string,
  rootComponents: number[],
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
        fileName = `${dir}/src/pages/index.tsx`;
      } else {
        fileName = `${dir}/src/pages/${component.name}.tsx`;
      }
    } else {
      fileName = `${dir}/src/components/${component.name}.tsx`;
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
export default createGatsbyFiles;
