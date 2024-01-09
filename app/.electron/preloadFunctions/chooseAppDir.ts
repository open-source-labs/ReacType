import { ipcRenderer, IpcRendererEvent } from 'electron';
import { type } from 'os';

type AppDirSelectedCallback = (path: string) => void;

const chooseAppDir = (): void => {
  ipcRenderer.send('choose_app_dir');
};

// once an app directory is chosen, the main process will send an "app_dir_selected" event
// when this event occurs, exucte the callback passed in by the user
const addAppDirChosenListener = (callback: AppDirSelectedCallback): void => {
  ipcRenderer.on(
    'app_dir_selected',
    (event: IpcRendererEvent, path: string) => {
      callback(path);
    }
  );
};

// removes all listeners for the app_dir_selected event
// this is important because otherwise listeners will pile up and events will trigger multiple events
const removeAllAppDirChosenListeners = (): void => {
  ipcRenderer.removeAllListeners('app_dir_selected');
};

export {
  chooseAppDir,
  addAppDirChosenListener,
  removeAllAppDirChosenListeners
};
