import createApplicationUtil from './createApplication.util';
import createFiles from './createFiles.util';

const exportProject = (path: string, appName: string, genOption: number, components: any) => {
  console.log('in the export project file ');
  if (genOption === 1) {
    createApplicationUtil({ path, appName, components})
    .then(() => {
      console.log('CreateApplicationUtil has finished');
    })
    .catch(err => console.log(err));
  } else if (genOption === 0) {
    createFiles(components, path, appName, false);
  }
  
};

export default exportProject;
