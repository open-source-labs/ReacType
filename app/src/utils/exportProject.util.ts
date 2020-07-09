import createApplicationUtil from './createApplication.util';
import createFiles from './createFiles.util';
import { generatePath } from 'react-router-dom';

const exportProject = (
  path: string,
  appName: string,
  genOption: number,
  components: any
) => {
  if (genOption === 1) {
    createApplicationUtil({ path, appName, components })
      .then(() => {
        console.log('CreateApplicationUtil has finished');
      })
      .catch(err => console.log(err));
  } else if (genOption === 0) {
    createFiles(components, path, appName, false);
  }
};

export default exportProject;
