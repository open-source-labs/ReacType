const { ipcRenderer } = require('electron');

const chooseAppDir = () => {
  return ipcRenderer.send('choose_app_dir');
};

// once an app directory is chosen, the main process will send an "app_dir_selected" event
// when this event occurs, exucte the callback passed in by the user
const addAppDirChosenListener = callback => {
  return ipcRenderer.on('app_dir_selected', (event, path) => {
    callback(path);
  });
};

// removes all listeners for the app_dir_selected event
// this is important because otherwise listeners will pile up and events will trigger multiple events
const removeAllAppDirChosenListeners = () => {
  ipcRenderer.removeAllListeners('app_dir_selected');
};

module.exports = {
  chooseAppDir,
  addAppDirChosenListener,
  removeAllAppDirChosenListeners
};
