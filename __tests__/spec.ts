import 'regenerator-runtime/runtime'; // if there is an error with moduleNameMapper, npm -S install regenerator-runtime

//const { Application } = require('spectron');
const electronPath = require('electron');
const path = require('path');

let app;

beforeAll(() => {
  // create a new app to test with setTimeout to be 15000 because the app takes a few seconds to spin up
  app = new Application({
    path: electronPath,
    chromeDriverArgs: ['--disable-extensions'],
    args: [path.join(__dirname, '../app/electron/main.js')] // this is the path from this test file to main.js inside electron folder
  });
  return app.start();
}, 15000);

// getWindowsCount() will return 2 instead of 1 in dev mode (one for the actual app, one in the browser at localhost:8080 in dev mode)
xtest('Displays App window', async () => {
  const windowCount = await app.client.getWindowCount();
  // expect(windowCount).toBe(1); // this returns true/passed if in production mode, change mode in script "test" to 'production' instead of 'test'
  expect(windowCount).toBe(2); // 'dev' or 'test' mode results in 2 windows (one for the app and one for the browser)
});

/* we want to test other functionalities of app.client such as text, title, etc. but even the examples from the official spectron website 
or github repo did not yield the same outcomes as demonstrated. So we stopped testing Electron app here */ 
afterAll(() => {
  if (app && app.isRunning()) {
    return app.stop();
  }
});
