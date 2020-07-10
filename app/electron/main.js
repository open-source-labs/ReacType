const {
  app,
  protocol,
  dialog,
  BrowserWindow,
  session,
  ipcMain,
  Menu
} = require('electron');
// The splash screen is what appears while the app is loading
const { initSplashScreen, OfficeTemplate } = require('electron-splashscreen');
const { resolve } = require('app-root-path');
const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS
} = require('electron-devtools-installer');
const debug = require('electron-debug');

const Protocol = require('./protocol');
// menu from another file to modularize the code
const MenuBuilder = require('./menu');

const path = require('path');
// const fs = require('fs');

console.log('NODE ENV is ', process.env.NODE_ENV);
const isDev = process.env.NODE_ENV === 'development';
const port = 8080;
const selfHost = `http://localhost:${port}`;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let menuBuilder;

async function createWindow() {
  if (isDev) {
    await installExtension([REACT_DEVELOPER_TOOLS])
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(err => console.log('An error occurred: ', err));
  } else {
    // Needs to happen before creating/loading the browser window;
    // not necessarily instead of extensions, just using this code block
    // so I don't have to write another 'if' statement
    protocol.registerBufferProtocol(Protocol.scheme, Protocol.requestHandler);
  }

  // Create the browser window.
  win = new BrowserWindow({
    // full screen
    width: 1920,
    height: 1080,
    // window title
    title: `ReacType`,
    show: false,
    icon: path.join(__dirname, '../src/public/icons/png/256x256.png'),
    win: {
      icon: path.join(__dirname, '../src/public/icons/win/icon.ico'),
      target: ['portable']
    },
    webPreferences: {
      zoomFactor: 0.7,
      // enable devtools
      devTools: true,
      // crucial security feature - blocks rendering process from having access to node moduels
      nodeIntegration: false,
      // web workers will not have access to node
      nodeIntegrationInWorker: false,
      // disallow experimental feature to allow node.js suppport in subframes (iframes/child windows)
      nodeIntegrationInSubFrames: false,
      // runs electron apis and preload script in a seperate JS context
      // sepearate context has access to document/window but has it's own built-ins and is isolate from chagnes to gloval environment by locaded page
      // Electron API only available from preload, not loaded page
      contextIsolation: true,
      // disables remote module. critical for ensuring that rendering process doesn't have access to node functionality
      enableRemoteModule: false,
      // path of preload script. preload is how the renderer page will have access to electron functionality
      preload: path.join(__dirname, 'preload.js')
    }
  });

  console.log('PATH is ', resolve('/'));

  //splash screen deets
  // TODO: splash screen logo/icon aren't loading in dev mode
  const hideSplashscreen = initSplashScreen({
    mainWindow: win,
    icon: resolve('app/src/public/icons/png/64x64.png'),
    url: OfficeTemplate,
    width: 500,
    height: 300,
    brand: 'OS Labs',
    productName: 'ReacType',
    logo: resolve('app/src/public/icons/png/64x64.png'),
    color: '#3BBCAF',
    website: 'www.reactype.io',
    text: 'Initializing ...'
  });

  // Load app
  if (isDev) {
    // load app from webdev server
    win.loadURL(selfHost);
  } else {
    // load local file if in production
    win.loadURL(`${Protocol.scheme}://rse/index-prod.html`);
  }

  // load page once window is loaded
  win.once('ready-to-show', () => {
    win.show();
    hideSplashscreen();
  });

  // Only do these things when in development
  if (isDev) {
    // automatically open DevTools when opening the app
    win.webContents.once('dom-ready', () => {
      debug();
      win.webContents.openDevTools();
    });
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  // https://electronjs.org/docs/tutorial/security#4-handle-session-permission-requests-from-remote-content
  // TODO: is this the same type of sessions that have in react type
  // Could potentially remove this session capability - it appears to be more focused on approving requests from 3rd party notifications
  const ses = session;
  const partition = 'default';
  ses
    .fromPartition(partition)
    .setPermissionRequestHandler((webContents, permission, callback) => {
      let allowedPermissions = []; // Full list here: https://developer.chrome.com/extensions/declare_permissions#manifest

      if (allowedPermissions.includes(permission)) {
        callback(true); // Approve permission request
      } else {
        console.error(
          `The application tried to request permission for '${permission}'. This permission was not whitelisted and has been blocked.`
        );

        callback(false); // Deny
      }
    });

  // https://electronjs.org/docs/tutorial/security#1-only-load-secure-content;
  // The below code can only run when a scheme and host are defined, I thought
  // we could use this over _all_ urls
  ses
    .fromPartition(partition)
    .webRequest.onBeforeRequest({ urls: ['http://localhost./*'] }, listener => {
      if (listener.url.indexOf('http://') >= 0) {
        listener.callback({
          cancel: true
        });
      }
    });

  menuBuilder = MenuBuilder(win, 'ReacType');
  menuBuilder.buildMenu();
}

// TODO: unclear of whether this is necsssary or not. Looks like a security best practice but will likely introduce complications
// Needs to be called before app is ready;
// gives our scheme access to load relative files,
// as well as local storage, cookies, etc.
// https://electronjs.org/docs/api/protocol#protocolregisterschemesasprivilegedcustomschemes
protocol.registerSchemesAsPrivileged([
  {
    scheme: Protocol.scheme,
    privileges: {
      standard: true,
      secure: true
    }
  }
]);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  } else {
    // TODO: remove i18nextbackend
    // i18nextBackend.clearMainBindings(ipcMain);
    ContextMenu.clearMainBindings(ipcMain);
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// https://electronjs.org/docs/tutorial/security#12-disable-or-limit-navigation
// limits navigation within the app to a whitelisted array
// redirects are a common attack vector
// TODO: add github to the validOrigins whitelist array

// after the contents of the webpage are rendered, set up event listeners on the webContents
app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    const validOrigins = [
      selfHost,
      'https://localhost:8081',
      'https://github.com/'
    ];
    // Log and prevent the app from navigating to a new page if that page's origin is not whitelisted
    if (!validOrigins.includes(parsedUrl.origin)) {
      console.error(
        `The application tried to navigate to the following address: '${parsedUrl}'. This origin is not whitelisted and the attempt to navigate was blocked.`
      );
      // if the requested URL is not in the whitelisted array, then don't navigate there
      event.preventDefault();
      return;
    }
  });

  contents.on('will-redirect', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    //console.log('parsedUrl is', parsedUrl);
    //console.log('parsedUrl.origin is', parsedUrl.origin);
    const validOrigins = [
      selfHost,
      'https://localhost:8081',
      'https://github.com',
      'app://rse/'
    ];

    // Log and prevent the app from redirecting to a new page
    if (
      !validOrigins.includes(parsedUrl.origin) &&
      !validOrigins.includes(parsedUrl.href)
    ) {
      console.error(
        `The application tried to redirect to the following address: '${navigationUrl}'. This attempt was blocked.`
      );

      event.preventDefault();
      return;
    }
  });

  // https://electronjs.org/docs/tutorial/security#11-verify-webview-options-before-creation
  // The web-view is used to embed guest content in a page
  // This event listener deletes webviews if they happen to occur in the app
  // https://www.electronjs.org/docs/api/web-contents#event-will-attach-webview
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    // Strip away preload scripts if unused or verify their location is legitimate
    delete webPreferences.preload;
    delete webPreferences.preloadURL;

    // Disable Node.js integration
    webPreferences.nodeIntegration = false;
  });

  // https://electronjs.org/docs/tutorial/security#13-disable-or-limit-creation-of-new-windows
  contents.on('new-window', async (event, navigationUrl) => {
    // Log and prevent opening up a new window
    console.error(
      `The application tried to open a new window at the following address: '${navigationUrl}'. This attempt was blocked.`
    );

    event.preventDefault();
    return;
  });
});

// Filter loading any module via remote;
// you shouldn't be using remote at all, though
// https://electronjs.org/docs/tutorial/security#16-filter-the-remote-module
app.on('remote-require', (event, webContents, moduleName) => {
  event.preventDefault();
});

// built-ins are modules such as "app"
app.on('remote-get-builtin', (event, webContents, moduleName) => {
  event.preventDefault();
});

app.on('remote-get-global', (event, webContents, globalName) => {
  event.preventDefault();
});

app.on('remote-get-current-window', (event, webContents) => {
  event.preventDefault();
});

app.on('remote-get-current-web-contents', (event, webContents) => {
  event.preventDefault();
});

// When a user selects "Export project", a function (chooseAppDir loaded via preload.js)
// is triggered that sends a "choose_app_dir" message to the main process
// when the "choose_app_dir" message is received it triggers this event listener
ipcMain.on('choose_app_dir', event => {
  // dialog displays the native system's dialogue for selecting files
  // once a directory is chosen send a message back to the renderer with the path of the directory
  dialog
    .showOpenDialog(win, {
      properties: ['openDirectory'],
      buttonLabel: 'Export'
    })
    .then(directory => {
      if (!directory) return;
      event.sender.send('app_dir_selected', directory.filePaths[0]);
    })
    .catch(err => console.log('ERROR on "choose_app_dir" event: ', err));
});

// bypass ssl certification validation error
// app.commandLine.appendSwitch('ignore-certificate-errors', 'true');
