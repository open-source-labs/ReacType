const { ipcRenderer } = require('electron');

const chooseAppDir = () => {
  return ipcRenderer.send('choose_app_dir');
};

// once an app directory is chosen, the main process will send an "app_dir_selected" event
// when this event occurs, exucte the callback passed in by the user
const appDirChosen = callback => {
  return ipcRenderer.on('app_dir_selected', (event, path) => {
    callback(path);
  });
};

module.exports = { chooseAppDir, appDirChosen };
