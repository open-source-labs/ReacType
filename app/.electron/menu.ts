import { Menu, BrowserWindow, Shell } from 'electron';
const isMac = process.platform === 'darwin';
import Protocol from './protocol';
/* 
DESCRIPTION: This file generates an array containing a menu based on the operating system the user is running.
menuBuilder: The entire file is encompassed in menuBuilder. Ultimately, menuBuilder returns a function called
  buildMenu that uses defaultTemplate to construct a menu at the top of the application (as invoked in main.js)

  Standard menu roles (e.g., undo, redo, quit, paste, etc.) come from Electron API and need not be separately coded

openTutorial: opens browser window containing tutorial on how to use the app
  -Creates a browser window
  -Tutorial is invoked within the "Help" menu

defaultTemplate: returns an array of submenus (each an array)
  -First, checks whether user is on a Mac (node returns 'darwin' for process.platform)
    -Then generates a dropdown menu at the top of the screen (e.g., "File") accordingly
    -The Mac check is necessary primarily for the first menu column, which is the name of the app
  -If user is not on a Mac, alternative menus are generated
  -Each menu:
    -"label" is the field at the top of each menu (e.g., "File", "Edit", "View", etc.)
    -"role" is a subitem within each menu (e.g., under "File," "Quit")
    -"type: separator" creates a horizontal line in a menu (e.g., under "Redo" in the "Edit" menu)
*/

// Create a template for a menu and create menu using that template
var MenuBuilder = function (mainWindow, appName) {
  // https://electronjs.org/docs/api/menu#main-process
  // "roles" are predefined by Electron and used for standard actions
  // https://www.electronjs.org/docs/api/menu-item
  // you can also create custom menu items with their own "on click" functionality if you need to
  // different roles are available between mac and windows

  function openTutorial(): void {
    const tutorial = new BrowserWindow({
      width: 1180,
      height: 900,
      minWidth: 665,
      title: 'Tutorial',
      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInWorker: false,
        nodeIntegrationInSubFrames: false,
        contextIsolation: true,
        enableRemoteModule: true,
        zoomFactor: 1.0,
        devTools: false
      }
    });
    if (import.meta.env.NODE_ENV === 'development') {
      tutorial.loadURL(`http://localhost:8080/#/tutorial`);
    } else {
      tutorial.loadURL(`${Protocol.scheme}://rse/index-prod.html#/tutorial`);
    }
    tutorial.show();
  }

  const defaultTemplate= (): Electron.MenuItemConstructorOptions[] => [
      ...(isMac
        ? [
            {
              // on Mac, the first menu item name should be the name of the app
              label: appName,
              submenu: [
                {role: 'about'},
                {type: 'separator'},
                {role: 'services'},
                {type: 'separator'},
                {role: 'hide'},
                {role: 'hideothers'},
                {role: 'unhide'},
                {type: 'separator'},
                {role: 'quit'}
              ] as Electron.MenuItemConstructorOptions[],
            } ,
          ]
        : []),Electron.MenuItemConstructorOptions[],
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

    return template;
  }

  // constructs menu from default template
  return {
    buildMenu: function () {
      const menu = Menu.buildFromTemplate(defaultTemplate());
      Menu.setApplicationMenu(menu);

      return menu;
    }
  };
};

export { MenuBuilder };
