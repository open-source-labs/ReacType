const path = require('path');
//sfsdfsdfsdfasdasd
//sdfasdfsadf

// ** electron notes:
// IPCMain and IPCRenderer are used to send messages between main and renderer processes.
// IPCMain - The main process takes care of starting and running your app. It is the entry point for an application.
// IPCRenderer - The renderer process takes care of showing your app in the Chromium browser

const {
  // ** look into how this is working - the code is the same here as in react proto **
  app,
  //app - the lifecycle of the application is managed through electron.app
  BrowserWindow,
  // BrowserWindow - windows can be created using the electron.BrowserWindow class
  Menu,
  // Menu - allows you to create native application menus and context menus.
  shell,
  // shell - Manage files and URLs using their default applications — The shell module provides functions related to desktop integration. An example of opening a URL in the user's default browser.
  dialog,
  // dialog - Display native system dialogs for opening and saving files, alerting, etc
  ipcMain
  // ipcMain - Communicate asynchronously from the main process to renderer processes. It is an event emitter.
} = require('electron');

// ** Uncomment below for hot reloading during development **

// below hard-resets the entire electron process so is more of a catch-all in terms of dev mode
require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});

// below loads contents of all active BrowserWindows within electron when the source files are changed:
// require('electron-reload')(__dirname);

const isDev =
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Open image file
function openFile() {
  // Opens file dialog looking for markdown
  const files = dialog.showOpenDialog(mainWindow, {
    // dialog.showOpenDialog - allows you to open files / folders
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

// Choose directory
ipcMain.on('choose_app_dir', (event) => {
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
  const { width, height } = require('electron').screen.getPrimaryDisplay().size;
  mainWindow = new BrowserWindow({
    width,
    height,
    webPreferences: {
      zoomFactor: 0.7,
      'node-Integration': false
    },
    show: false,
    icon: path.join(__dirname, '/src/public/icons/mac/icon.icns'),
    win: {
      icon: path.join(__dirname, '/src/public/icons/win/icon.ico'),
      target: ['portable']
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/build/index.html`);
  // load page once window is loaded
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open File',
          accelerator: process.platform === 'darwin' ? 'Cmd+O' : 'Ctrl+Shift+O',
          click() {
            openFile();
          }
        }
      ]
    },
    // {
    //   label: 'Edit',
    //   submenu: [
    //     { role: 'undo' },
    //     { role: 'redo' },
    //     { type: 'separator' },
    //     { role: 'cut' },
    //     { role: 'copy' },
    //     { role: 'paste' },
    //     { role: 'pasteandmatchstyle' },
    //     { role: 'delete' },
    //     { role: 'selectall' },
    //   ],
    // },
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
            shell.openExternal('https://electronjs.org');
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
      .catch((err) => err);
  } else {
    createWindow();
  }
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
