const path = require('path');

const {
  app,
  // The app module controls the application lifecycle (like reacting to the ready state of the application).
  BrowserWindow,
  // BrowserWindow - allows for window creation via Electron. This is what actually shows something for the user. T
  Menu,
  // Menu - allows you to create native application menus and context menus.
  shell,
  // shell - Manage files and URLs using their default applications — The shell module provides functions related to desktop integration. An example of opening a URL in the user's default browser.
  dialog,
  // dialog - Display native system dialogs for opening and saving files, alerting, etc
  ipcMain
  // ipcMain - Communicate asynchronously from the main process to renderer processes. It is an event emitter.
  // IPC stands for Inter-Process Communication. Electron uses IPC to send serialized JSON messages between the main and renderer processes.
} = require('electron');

// ** Uncomment below for hot reloading during development **

// below hard-resets the entire electron process so is more of a catch-all in terms of dev mode:
// require('electron-reload')(__dirname, {
//   electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
// });

// below loads contents of all active BrowserWindows within electron when the source files are changed. 
// ** You'll want to use this one when working in most files other than main.js
// require('electron-reload')(__dirname);

const isDev =
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';

// Keep a global reference of the window object, if you don't, the window will be closed automatically when the JavaScript object is garbage collected.
// We'll be working with one Window (mainWindow) in our application
let mainWindow;

const createWindow = () => {
  // Creates the browser window. This is triggered in an event listener that ensures that the content is fully loaded before creating the Window.
  const { width, height } = require('electron').
    screen.getPrimaryDisplay().size;
  // screen is an event emitter in electron. It can grant you information about the user's screen (or screens in the case that they have external monitors)
  // getPrimaryDisplay() - returns the display object which contains properties like size (which gives us the size of the screen)

  // create a new BrowserWindow within the createWindow function
  mainWindow = new BrowserWindow({
    // width & height have been extracted from the call to screen.getPrimaryDisplay() so that they match the full size of the users screen
    width,
    height,
    webPreferences: {
      // webFactor: default is 1.0 which is 100%
      zoomFactor: 0.8,
    },
    // if show is set to true, a blank window will appear at first until the rest of the application has loaded.
    show: false,

    icon: path.join(__dirname, '/src/public/icons/mac/icon.icns'),
    win: {
      icon: path.join(__dirname, '/src/public/icons/win/icon.ico'),
      target: ['portable']
    }
  });


  // mainWindow.loadURL returns a promise that then loads the local index.html file once the page has finished loading
  mainWindow.loadURL(`file://${__dirname}/build/index.html`);
  // mainWindow.once adds a one time listener function for the 'ready-to-show' event. The event listener is removed after it is invoked once.
  mainWindow.once('ready-to-show', () => {
    // .show - shows and gives focus to the window it's called on.
    mainWindow.show();
  });

  // this template will be used when creating the menu for our app - the template allows us to add additional menu items to the default menu item set
  const template = [
    {
      // label appears along the top of the menu on mac
      label: 'About',
      submenu: [
        {
          label: 'ReacType Info',
          // click() executes a function you've defined when the user clicks on the specific submenu item
          click() {
            // shell.openExternal - returns a promise and then opens an external link in the user's default browser
            shell.openExternal('https://github.com/oslabs-beta/ReacType');
          }
        }
      ]
    },
    {
      label: 'File',
      submenu: [
        {
          label: 'Open File',
          // The process.platform property returns a string identifying the operating system platform on which the Node.js process is running.
          // accelerator is used to define keyboard shortcuts 
          accelerator: process.platform === 'darwin' ? 'Cmd+O' : 'Ctrl+Shift+O',
          // click() allows you to define the functionality that will occur when the user clicks on an item in the submenu
          click() {

            openFile();
          }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        // role can be set to many different strings: https://www.electronjs.org/docs/api/menu-item
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
      label: 'Developer Tools',
      submenu: [
        {
          label: 'Toggle Developer Tools',
          accelerator:
            process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          click() {
            // open the console in the right side of the window
            mainWindow.webContents.toggleDevTools();
          }
        }
      ]
    }
  ];

  if (process.platform === 'darwin') {
    // if this isn't triggered, the app won't properly load on Mac but I haven't found a solid answer as to why that is.
    template.unshift({
      // app.getName() - returns a string that is the current application's name as found in the package.json file
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
  }

  // Menu.buildFromTemplate adds to the default Menu using properties from the template passed into it
  // the default menu props: File, Edit, View, Window and Help
  const menu = Menu.buildFromTemplate(template);
  // Menu.setApplicationMenu - Sets menu as the application menu on macOS. On Windows and Linux, the menu will be set as each window's top menu.
  Menu.setApplicationMenu(menu);

  mainWindow.on('closed', () => {
    // Emitted when the window is going to be closed. It's emitted before the beforeunload and unload event of the DOM. 
    mainWindow = null;
  });

};

// Open local image file for prototyping
function openFile() {
  // Opens file dialog looking for markdown
  const files = dialog.showOpenDialog(mainWindow, {
    // dialog.showOpenDialog - allows you to open files / folders
    // properties: ['openFile'] - allows files to be selected
    properties: ['openFile'],
    filters: [
      {
        // ensure only image files with specific extensions can be selected and uploaded into the app
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
  // webContents is an EventEmitter. It is responsible for rendering and controlling a web page and is a property of the BrowserWindow object
}

// Update file
ipcMain.on('update-file', () => {
  // openFile defined above - allows user to open a file from their local file system
  openFile();
});

// Choose directory to save / export your project
ipcMain.on('choose_app_dir', (event) => {
  const directory = dialog.showOpenDialog(mainWindow, {
    // openDirectory allows directories to be opened - 'Export' button appears from the directory selection pop-up after the user has clicked `export project` and selected their preferred export type (`Export components` or `Export components with application files`)
    properties: ['openDirectory'],
    buttonLabel: 'Export'
  });
  // if no directory is selected, do not export the files
  if (!directory) return;
  // event.sender.send sends to the main frame. Allows user to send the file to their file system / save it locally
  event.sender.send('app_dir_selected', directory[0]);
});

ipcMain.on('view_app_dir', (event, appDir) => {
  // shell.openItem - opens the given file in the desktop's default manner
  shell.openItem(appDir);
});


// This method will be called when Electron has finished initialization and is ready to create browser windows. Some APIs can only be used after this event occurs.
app.on('ready', () => {
  if (isDev) {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS
    } = require('electron-devtools-installer');
    [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS].forEach(extension => {
      installExtension(extension)
        // uncomment code below to test whether extensions have been installed correctly
        .then(/*(name) => console.log(`Added Extension: ${name}`)*/)
        .catch((err) => console.log('An error occurred: ', err));
    });
    createWindow();
  } else {
    // if not working in dev, we still want to create our window
    createWindow();
  }
});


app.on('activate', () => {
  // activate can be triggered when launching the application for the first time, attempting to re-launch the application when it's already running, or clicking on the application's dock or taskbar icon.
  if (mainWindow === null) {
    // we're only working with one main window in our application, so if that is set to null it means the window is not open. We want to open it when the user clicks on the icon in the dock.
    createWindow();
  }
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
