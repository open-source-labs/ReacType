import { ipcRenderer, IpcRendererEvent } from 'electron';

type GetCookieCallback = (cookie: string) => void;

const setCookie = (): void => {
  ipcRenderer.send('set_cookie');
};

const getCookie = (callback: GetCookieCallback): void => {
  ipcRenderer.on('give_cookie', (event: IpcRendererEvent, cookie: string) => {
    callback(cookie);
  });
};

const delCookie = (): void => {
  ipcRenderer.send('delete_cookie');
};

const github = (): void => {
  ipcRenderer.send('github');
};

const tutorial = (): void => {
  ipcRenderer.send('tutorial');
};

export { setCookie, getCookie, delCookie, github, tutorial };
