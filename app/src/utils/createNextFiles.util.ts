/* eslint-disable max-len */
// Create all component files for a next.js application
// "Root" level components are stored in a pages directory
// all other components will be in a components directory
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
 * Asynchronously creates TypeScript component files for a Next.js application, organizing them into 'pages' and 'components' directories.
 * Components identified as root components (based on their IDs in the 'rootComponents' array) are placed in the 'pages' directory,
 * with the first root component specifically stored as 'index.tsx'. All other root components are named according to their component name.
 * Non-root components are stored in the 'components' directory.
 * @param {Component[]} components An array of component objects that include necessary data for generating files.
 * @param {string} path The base directory path for the Next.js application.
 * @param {string} appName The name of the Next.js application.
 * @param {number[]} rootComponents An array of component IDs designated as root components.
 * @returns {Promise<any[]>} A promise that resolves when all component files have been successfully written to disk.
 * The promise returns an array of the paths where the files were created, which can be used for further processing or verification.
 */
const createNextFiles = (
  components: Component[],
  path: string,
  appName: string,
  rootComponents: number[],
): Promise<any[]> => {
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
