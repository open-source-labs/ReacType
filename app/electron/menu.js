const { Menu } = require("electron");
const isMac = process.platform === "darwin";

// Create a template for a menu and create menu using that template
var MenuBuilder = function (mainWindow, appName) {
  // https://electronjs.org/docs/api/menu#main-process
  // "roles" are predefined by Electron and used for standard actions
  // https://www.electronjs.org/docs/api/menu-item
  // you can also create custom menu items with their own "on click" functionality if you need to
  // different roles are available between mac and windows
  let defaultTemplate = function () {
    return [
      // { role: "appMenu" }
      ...(isMac
        ? [
            {
              // on Mac, the first menu item name should be the name of the app
              label: appName,
              submenu: [
                {
                  role: "about",
                },
                {
                  type: "separator",
                },
                {
                  role: "services",
                },
                {
                  type: "separator",
                },
                {
                  role: "hide",
                },
                {
                  role: "hideothers",
                },
                {
                  role: "unhide",
                },
                {
                  type: "separator",
                },
                {
                  role: "quit",
                },
              ],
            },
          ]
        : []),
      {
        label: "File",
        submenu: [
          isMac
            ? {
                role: "close",
              }
            : {
                role: "quit",
              },
        ],
      },
      {
        label: "Edit",
        submenu: [
          {
            role: "undo",
          },
          {
            role: "redo",
          },
          {
            type: "separator",
          },
          {
            role: "cut",
          },
          {
            role: "copy",
          },
          {
            role: "paste",
          },
          ...(isMac
            ? [
                {
                  role: "pasteAndMatchStyle",
                },
                {
                  role: "delete",
                },
                {
                  role: "selectAll",
                },
                {
                  type: "separator",
                },
                {
                  label: "Speech",
                  submenu: [
                    {
                      role: "startspeaking",
                    },
                    {
                      role: "stopspeaking",
                    },
                  ],
                },
              ]
            : [
                {
                  role: "delete",
                },
                {
                  type: "separator",
                },
                {
                  role: "selectAll",
                },
              ]),
        ],
      },
      // { role: "viewMenu" }
      {
        label: "View",
        submenu: [
          {
            role: "reload",
          },
          {
            role: "forcereload",
          },
          {
            role: "toggledevtools",
          },
          {
            type: "separator",
          },
          {
            role: "resetzoom",
          },
          {
            role: "zoomin",
          },
          {
            role: "zoomout",
          },
          {
            type: "separator",
          },
          {
            role: "togglefullscreen",
          },
        ],
      },

      {
        label: "Window",
        submenu: [
          {
            role: "minimize",
          },
          {
            role: "zoom",
          },
          ...(isMac
            ? [
                {
                  type: "separator",
                },
                {
                  role: "front",
                },
                {
                  type: "separator",
                },
                {
                  role: "window",
                },
              ]
            : [
                {
                  role: "close",
                },
              ]),
        ],
      },
      {
        role: "help",
        submenu: [
          {
            label: "Learn More",
            click: async () => {
              const { shell } = require("electron");
              await shell.openExternal(
                "https://github.com/open-source-labs/ReacType"
              );
            },
          },
        ],
      },
    ];
  };

  // constructs menu from default template
  return {
    buildMenu: function () {
      const menu = Menu.buildFromTemplate(defaultTemplate());
      Menu.setApplicationMenu(menu);

      return menu;
    },
  };
};

module.exports = MenuBuilder;
