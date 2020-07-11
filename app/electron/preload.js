// contextBridge is what allows context to be translated between the main process and the render process
// ipcRenderer sends messsages between render process and the main process
const { contextBridge, ipcRenderer } = require('electron');
const { existsSync, writeFileSync, mkdirSync, writeFile } = require('fs');
const formatCode = require('./preloadFunctions/format');
const {
  chooseAppDir,
  addAppDirChosenListener,
  removeAllAppDirChosenListeners
} = require('./preloadFunctions/chooseAppDir');
const {
  setCookie,
  getCookie,
  delCookie,
  reload
} = require('./preloadFunctions/cookies');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
// 'mainWorld" is the context that the main renderer runs in
// with contextIsolation on (see webpreferences on main.js), this preload script runs isolated
// "api" is the key that injects the api into the window
// to access these keys in the renderer process, we'll do window.key
// the api object (second arg) can contain functions, strings, bools, numbers, arrays, obects in value
// data primitives sent on the bridge are immutable and changes in one context won't carry over to another context
contextBridge.exposeInMainWorld('api', {
  formatCode: formatCode,
  chooseAppDir: chooseAppDir,
  addAppDirChosenListener: addAppDirChosenListener,
  removeAllAppDirChosenListeners: removeAllAppDirChosenListeners,
  existsSync: existsSync,
  writeFileSync: writeFileSync,
  mkdirSync: mkdirSync,
  writeFile: writeFile,
  setCookie: setCookie,
  getCookie: getCookie,
  delCookie: delCookie
});
