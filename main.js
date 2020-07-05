const path = require('path');
//import for spalsh screen dependency
const { initSplashScreen, OfficeTemplate } = require('electron-splashscreen');
//path resolver dependency for splash screen
const { resolve } = require('app-root-path');

const {
  app,
  BrowserWindow,
  Menu,
  shell,
  dialog,
  ipcMain,
  globalShortcut
} = require('electron');

// Uncomment below for hot reloading during development
require('electron-reload')(__dirname);

// const isDev = true;
const isDev =
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Open image file
function openFile() {
  // Opens file dialog looking for markdown
  const files = dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      {
        name: 'Images',
        extensions: ['jpeg', 'jpg', 'png', 'gif', 'pdf']
      }
    ]
  });

  // if no files
  if (!files) return;
  const file = files[0];

  // Send fileContent to renderer
  mainWindow.webContents.send('new-file', file);
}

function escape() {
  mainWindow.webContents.send('escape');
}

//functions to replace the default behavior of undo and redo
function undo() {
  mainWindow.webContents.send('undo');
}

function redo() {
  mainWindow.webContents.send('redo');
}

function toggleTutorial() {
  mainWindow.webContents.send('tutorial_clicked');
}

// Choose directory
ipcMain.on('choose_app_dir', event => {
  const directory = dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory'],
    buttonLabel: 'Export'
  });

  if (!directory) return;
  event.sender.send('app_dir_selected', directory[0]);
});

ipcMain.on('view_app_dir', (event, appDir) => {
  shell.openItem(appDir);
});

// Update file
ipcMain.on('update-file', () => {
  openFile();
});

const createWindow = () => {
  // Create the browser window.
  // eslint-disable-next-line
  // const { width, height } = require('electron').screen.getPrimaryDisplay().size;
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      zoomFactor: 0.7
      // for proper security measures, nodeIntegration should be set to false, but this results in a blank page when serving app
      //nodeIntegration: false,
      //preload: 'preload.js'
      // enableRemoteModule: false
    },
    show: false,
    icon: path.join(__dirname, '/src/public/icons/png/256x256.png'),
    win: {
      icon: path.join(__dirname, '/src/public/icons/win/icon.ico'),
      target: ['portable']
    }
  });

  //splash screen deets
  const hideSplashscreen = initSplashScreen({
    mainWindow,
    icon: resolve('/src/public/icons/png/64x64.png'),
    url: OfficeTemplate,
    width: 500,
    height: 300,
    brand: 'OS Labs',
    productName: 'ReacType',
    logo: resolve('/src/public/icons/png/64x64.png'),
    color: '#3BBCAF',
    website: 'www.reactype.io',
    text: 'Initializing ...'
  });

  // code below loads app locally
  // mainWindow.loadURL(`file://${__dirname}/build/index.html`);

  // code below loads app from a server, this url will need to change when/if we decide to put reactype on the web
  mainWindow.loadURL(`https://localhost:8080`);
  // load page once window is loaded
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    hideSplashscreen();
  });

  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open Image',
          accelerator: process.platform === 'darwin' ? 'Cmd+O' : 'Ctrl+Shift+O',
          click() {
            openFile();
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: process.platform === 'darwin' ? 'Cmd+Z' : 'Ctrl+Z', //these hotkeys are a tad bit glitchy
          click() {
            undo();
          }
        },
        {
          label: 'Redo',
          accelerator:
            process.platform === 'darwin' ? 'Cmd+Shift+Z' : 'Ctrl+Shift+Z',
          click() {
            redo();
          }
        },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      role: 'window',
      submenu: [{ role: 'minimize' }, { role: 'close' }]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click() {
            shell.openExternal('https://reactype.io');
          }
        },
        {
          label: 'Tutorial',
          click() {
            toggleTutorial();
          }
        }
      ]
    },
    {
      label: 'Developer',
      submenu: [
        {
          label: 'Toggle Developer Tools',
          accelerator:
            process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          click() {
            mainWindow.webContents.toggleDevTools();
          }
        }
      ]
    }
  ];

  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services', submenu: [] },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    });

    // Edit menu
    template[2].submenu.push(
      {
        type: 'separator'
      },
      {
        label: 'Speech',
        submenu: [{ role: 'startspeaking' }, { role: 'stopspeaking' }]
      }
    );

    // Window menu
    template[4].submenu = [
      { role: 'close' },
      { role: 'minimize' },
      { role: 'zoom' },
      { type: 'separator' },
      { role: 'front' }
    ];
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  // UNCOMMENT THIS DURING DEVELOPMENT TO ENABLE CONSOLE TO OPEN UPON LAUNCH
  // dev tools opened on every browser creation
  mainWindow.webContents.once('dom-ready', () => {
    mainWindow.webContents.openDevTools();
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  if (isDev) {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS
    } = require('electron-devtools-installer');

    installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
      .then(() => {
        createWindow();
      })
      .catch(err => err);
  } else {
    createWindow();
  }
  globalShortcut.register('Escape', () => {
    escape();
  });
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// bypass ssl certification validation error
app.commandLine.appendSwitch('ignore-certificate-errors', 'true');
