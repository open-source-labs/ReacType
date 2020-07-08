// contextBridge is what allows context to be translated between the main process and the render process
// ipcRenderer sends messsages between render process and the main process
const { contextBridge, ipcRenderer } = require('electron');
// const fs = require("fs");
// const i18nextBackend = require("i18next-electron-fs-backend");
// const Store = require("secure-electron-store").default;
// const ContextMenu = require("secure-electron-context-menu").default;

// Create the electron store to be made available in the renderer process
// the store is a way to persist user preferences and data
// let store = new Store();

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
// 'mainWorld" is the context that the main renderer runs in
// with contextIsolation on (see webpreferences on main.js), this preload script runs isolated
// "api" is the key that injects the api into the window
// to access these keys in the renderer process, we'll do window.key
// the api object (second arg) can contain functions, strings, bools, numbers, arrays, obects in value
// data primitives sent on the bridge are immutable and changes in one context won't carry over to another context
contextBridge.exposeInMainWorld('api', {
  // i18nextElectronBackend: i18nextBackend.preloadBindings(ipcRenderer),
  // generally the store uses fs directly from the renderer to access the store
  // this beinding will access the store using the
  // store: store.preloadBindings(ipcRenderer, fs),
  contextMenu: ContextMenu.preloadBindings(ipcRenderer)
});
