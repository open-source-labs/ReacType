import createApplicationUtil from './createApplication.util';

const exportProject = (path: string, appName: string, genOption: number) => {
  console.log('in the export project file ');
  createApplicationUtil({ path, appName, genOption })
    .then(() => console.log('CreateApplicationUtil has finished'))
    .catch(err => console.log(err));
};

export default exportProject;
