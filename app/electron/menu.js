const { Menu } = require('electron');
const { BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');
const isMac = process.platform === 'darwin';
const port = 5000;
const Protocol = require('./protocol');
const tutorialRoute = `http://localhost:${port}/tutorial`;

// Create a template for a menu and create menu using that template
var MenuBuilder = function(mainWindow, appName) {
  // https://electronjs.org/docs/api/menu#main-process
  // "roles" are predefined by Electron and used for standard actions
  // https://www.electronjs.org/docs/api/menu-item
  // you can also create custom menu items with their own "on click" functionality if you need to
  // different roles are available between mac and windows

  const openTutorial = () => {
    const tutorial = new BrowserWindow({
      width: 1180,
      height: 900,
      minWidth: 665,
      title: 'Tutorial',
      webPreferences: {
        nodeIntegration: false,
        nodeIntegrationInWorker: false,
        nodeIntegrationInSubFrames: false,
        contextIsolation: true,
        enableRemoteModule: false,
        zoomFactor: 1.0,
        devTools: false
      }
    });
    if (process.env.NODE_ENV === 'development') {
      tutorial.loadURL(`http://localhost:8080/#/tutorial`);
    } else {
      tutorial.loadURL(`${Protocol.scheme}://rse/index-prod.html#/tutorial`);
    }
    tutorial.show();
  };

  let defaultTemplate = function() {
    return [
      // { role: "appMenu" }
      ...(isMac
        ? [
            {
              // on Mac, the first menu item name should be the name of the app
              label: appName,
              submenu: [
                {
                  role: 'about'
                },
                {
                  type: 'separator'
                },
                {
                  role: 'services'
                },
                {
                  type: 'separator'
                },
                {
                  role: 'hide'
                },
                {
                  role: 'hideothers'
                },
                {
                  role: 'unhide'
                },
                {
                  type: 'separator'
                },
                {
                  role: 'quit'
                }
              ]
            }
          ]
        : []),
      {
        label: 'File',
        submenu: [
          isMac
            ? {
                role: 'close'
              }
            : {
                role: 'quit'
              }
        ]
      },
      {
        label: 'Edit',
        submenu: [
          {
            role: 'undo'
          },
          {
            role: 'redo'
          },
          {
            type: 'separator'
          },
          {
            role: 'cut'
          },
          {
            role: 'copy'
          },
          {
            role: 'paste'
          },
          ...(isMac
            ? [
                {
                  role: 'pasteAndMatchStyle'
                },
                {
                  role: 'delete'
                },
                {
                  role: 'selectAll'
                },
                {
                  type: 'separator'
                },
                {
                  label: 'Speech',
                  submenu: [
                    {
                      role: 'startspeaking'
                    },
                    {
                      role: 'stopspeaking'
                    }
                  ]
                }
              ]
            : [
                {
                  role: 'delete'
                },
                {
                  type: 'separator'
                },
                {
                  role: 'selectAll'
                }
              ])
        ]
      },
      // { role: "viewMenu" }
      {
        label: 'View',
        submenu: [
          {
            role: 'reload'
          },
          {
            role: 'forcereload'
          },
          {
            role: 'toggledevtools'
          },
          {
            type: 'separator'
          },
          {
            role: 'resetzoom'
          },
          {
            role: 'zoomin'
          },
          {
            role: 'zoomout'
          },
          {
            type: 'separator'
          },
          {
            role: 'togglefullscreen'
          }
        ]
      },

      {
        label: 'Window',
        submenu: [
          {
            role: 'minimize'
          },
          {
            role: 'zoom'
          },
          ...(isMac
            ? [
                {
                  type: 'separator'
                },
                {
                  role: 'front'
                },
                {
                  type: 'separator'
                },
                {
                  role: 'window'
                }
              ]
            : [
                {
                  role: 'close'
                }
              ])
        ]
      },
      {
        role: 'help',
        submenu: [
          {
            label: 'Learn More',
            click: async () => {
              const { shell } = require('electron');
              await shell.openExternal(
                'https://github.com/open-source-labs/ReacType'
              );
            }
          },
          {
            label: 'Tutorial',
            click: () => openTutorial()
          }
        ]
      }
    ];
  };

  // constructs menu from default template
  return {
    buildMenu: function() {
      const menu = Menu.buildFromTemplate(defaultTemplate());
      Menu.setApplicationMenu(menu);

      return menu;
    }
  };
};

module.exports = MenuBuilder;
