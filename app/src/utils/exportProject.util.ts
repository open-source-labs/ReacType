import createApplicationUtil from './createApplication.util';
import createNextApp from './createNextApp.util';
import createFiles from './createFiles.util';

const exportProject = (
  path: string,
  appName: string,
  genOption: number,
  projectType: string,
  components: any,
  rootComponents: number[]
) => {
  if (genOption === 1 && projectType === 'Classic React') {
    console.log('in exportProject, genOption 1');
    createApplicationUtil({ path, appName, components })
      .then(() => {
        console.log('CreateApplicationUtil has finished');
      })
      .catch(err => console.log(err));
  } else if (genOption === 0) {
    console.log('in exportProject, genOption 0');
    createFiles(components, path, appName, false);
  } else if (genOption === 1 && projectType === 'Next.js') {
    console.log('in exportProject, genOption 2');
    createNextApp({ path, appName, components, rootComponents })
      .then(() => {
        console.log('CreateNextApp has finished');
      })
      .catch(err => console.log(err));
  }
};

export default exportProject;
