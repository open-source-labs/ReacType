// contextBridge is what allows context to be translated between the main process and the render process
const { contextBridge } = require('electron');
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
  github
} = require('./preloadFunctions/cookies');

// Expose protected methods that allow the renderer process to use select node methods
// without exposing all node functionality. This is a critical security feature
// 'mainWorld" is the context that the main renderer runs in
// with contextIsolation on (see webpreferences on main.js), this preload script runs isolated
// "api" is the key that injects the api into the window
// to access these keys in the renderer process, we'll do window.api
// the api object (second arg) can contain functions, strings, bools, numbers, arrays, obects in value
// data primitives sent on the bridge are immutable and changes in one context won't carry over to another context
contextBridge.exposeInMainWorld('api', {
  formatCode,
  chooseAppDir,
  addAppDirChosenListener,
  removeAllAppDirChosenListeners,
  existsSync,
  writeFileSync,
  mkdirSync,
  writeFile,
  setCookie,
  getCookie,
  delCookie,
  github
});
