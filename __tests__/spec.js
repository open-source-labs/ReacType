import 'regenerator-runtime/runtime';

const { Application } = require('spectron');
const electronPath = require('electron');
const path = require('path');

let app;

beforeAll(() => {
  app = new Application({
    path: electronPath,
    chromeDriverArgs: ['--disable-extensions'],
    args: [path.join(__dirname, '../app/electron/main.js')]
  });
  return app.start();
}, 15000);

// getWindowsCount() will return 2 instead of 1 in dev mode; refer to main.js
test('Displays App window', async () => {
  const windowCount = await app.client.getWindowCount();
  // expect(windowCount).toBe(1); // this returns true/passed if in production mode, change script "test" to production
  expect(windowCount).toBe(2); // 'dev' or 'test' mode results in 2 windows (one for the app and one for the browser)
});

afterAll(() => {
  if (app && app.isRunning()) {
    return app.stop();
  }
});
