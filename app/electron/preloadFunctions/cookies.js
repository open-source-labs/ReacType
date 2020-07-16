const { ipcRenderer } = require('electron');

const setCookie = () => {
  return ipcRenderer.send('set_cookie');
};

const getCookie = callback => {
  return ipcRenderer.on('give_cookie', (event, cookie) => {
    callback(cookie);
  });
};

const delCookie = () => {
  return ipcRenderer.send('delete_cookie');
};

const github = () => {
  return ipcRenderer.send('github');
};

module.exports = { setCookie, getCookie, delCookie, github };
