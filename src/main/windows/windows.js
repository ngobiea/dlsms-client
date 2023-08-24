const { app, ipcMain, clipboard } = require('electron');
const path = require('path');
const { createAccountWindow } = require('./accountWindow');
const { createAppWindow } = require('./mainAppWindow');
const { createMonitorWindow } = require('./monitorWindow');
const { createSessionWindow } = require('./sessionWindow');
const BrowserHistory = require('node-browser-history');
const { readyToShow } = require('../util/events');

exports.createWindow = async () => {

  const {
    setCookies,
    getCookie,
    removeCookies,
  } = require('./cookies');


  const modelsPath = app.isPackaged
    ? path.join(process.resourcesPath, 'public', 'models')
    : path.join(__dirname, '../../renderer/public/models');
  ipcMain.handle('paths', () => {
    return { modelsPath };
  });

  let mainWindow;
  let accWindow;
  let monitWindow;
  let sessionWindow;

  const cookie = await getCookie('isLogin');
  if (cookie.length > 0) {
    mainWindow = createAppWindow(false);
    mainWindow.on(readyToShow, () => {
      mainWindow.show();
    });
  } else {
    accWindow = createAccountWindow(false);
    accWindow.on(readyToShow, () => {
      accWindow.show();
    });
  }

  ipcMain.on('exitApp', (_e) => {
    app.quit();
  });
  ipcMain.on('openMonitorWindow', (_e) => {
    if (!monitWindow) {
      monitWindow = createMonitorWindow(false);
    }
    monitWindow.on(readyToShow, () => {
      monitWindow.show();
    });
    monitWindow.on('closed', () => {
      monitWindow = null;
    });
  });

  ipcMain.on('openSessionWindow', (_e) => {
    if (!sessionWindow) {
      sessionWindow = createSessionWindow(false);
    }
    sessionWindow.on(readyToShow, () => {
      sessionWindow.show();
    });
    sessionWindow.on('closed', () => {
      sessionWindow = null;
    });
  });

  ipcMain.on('login', (_e, isLogin) => {
    setCookies(isLogin);
    accWindow.close();
    mainWindow = createAppWindow(false);
    mainWindow.on('ready-to-show', () => {
      mainWindow.show();
    });
  });
  ipcMain.on('logout', (_e) => {
    removeCookies('https://dlsms.com', 'isLogin');
    mainWindow.close();
    accWindow = createAccountWindow(false);
    accWindow.on('ready-to-show', () => {
      accWindow.show();
    });
  });
  ipcMain.on('closeSessionWindow', (_e) => {
    sessionWindow.close();
  });
  if (sessionWindow) {
    sessionWindow.on('closed', () => {
      sessionWindow = null;
    });
  }
  ipcMain.on('copyCode', (_e, code) => {
    clipboard.writeText(code);
  });
};
