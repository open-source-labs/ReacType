export {};

// The 'api' key on the global window object is where preload.js
// is storing main.js functions so they can be available to the renderer process
declare global {
  interface Window {
    api: any;
  }
}

let api = window.api; // ok now
