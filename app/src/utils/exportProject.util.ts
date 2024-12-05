import createApplicationUtil from './createApplication.util';
import createNextApp from './createNextApp.util';
import createFiles from './createFiles.util';
import createGatsbyApp from './createGatsbyApp.util';

/**
 * Handles the exporting of projects in various configurations based on user selections.
 * This function supports the creation of Classic React applications, Next.js applications,
 * Gatsby.js apps, and a basic export of component files without full application scaffolding.
 *
 * @param {string} path - The directory path where the project should be exported.
 * @param {string} appName - The name of the application to be created.
 * @param {number} genOption - Indicates the type of generation:
 *                           0 for only component files, 1 for complete application setup.
 * @param {string} projectType - Specifies project type: 'Classic React', 'Next.js', or 'Gatsby.js'.
 * @param {any[]} components - An array of components to be included in the project.
 * @param {number[]} rootComponents - An array of indices identifying root components.
 * @param {boolean} [tests] - Optional. Whether to include test setups in the generated application.
 * @returns {void} - This function does not return a value but will log the outcome of the file writing operation to the console.
 */
const exportProject = (
  path: string,
  appName: string,
  genOption: number,
  projectType: string,
  components: any,
  rootComponents: number[],
  tests?: boolean,
): void => {
  // Create fully functional classic react application
  if (genOption === 1 && projectType === 'Classic React') {
    createApplicationUtil({
      path,
      appName,
      components,
      testchecked: tests,
    }).catch((err) => console.log(err));
  } else if (genOption === 0) {
    // export all component files, but don't create all application files
    createFiles(components, path, appName, false);
  } else if (genOption === 1 && projectType === 'Next.js') {
    // Create fully functional Next.js and Gatsby.js application files
    createNextApp({
      path,
      appName,
      components,
      rootComponents,
      testchecked: tests,
    }).catch((err) => console.log(err));
  } else if (genOption === 1 && projectType === 'Gatsby.js') {
    createGatsbyApp({
      path,
      appName,
      components,
      rootComponents,
      testchecked: tests,
    }).catch((err) => console.log(err));
  }
};

export default exportProject;
