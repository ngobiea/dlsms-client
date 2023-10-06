const { app, ipcMain, clipboard } = require('electron');
const path = require('path');

const Windows = require('../util/Windows');
const BrowserHistory = require('node-browser-history');

exports.createWindow = async () => {
  const windows = new Windows();
  const { setCookies, getCookie, removeCookies } = require('./cookies');

  const modelsPath = app.isPackaged
    ? path.join(process.resourcesPath, 'public', 'models')
    : path.join(__dirname, '../../renderer/public/models');
  ipcMain.handle('paths', () => {
    return { modelsPath };
  });

  const cookie = await getCookie('isLogin');
  if (cookie.length > 0) {
    windows.createMainWindow();
  } else {
    windows.createAccWindow();
  }

  ipcMain.on('exitApp', (_e) => {
    app.quit();
  });
  ipcMain.on('openMonitorWindow', (_e) => {
    windows.createMonitWindow();
  });

  ipcMain.on('openSessionWindow', (_e) => {
    windows.createSessionWindow();
  });
  ipcMain.on('openExamSessionWindow', () => {
    windows.createExamSessionWindow();
  });
  ipcMain.on('showScreenSources', async () => {
    windows.showScreenSources();
  });
  ipcMain.on('closeExamSessionWindow', () => {
    windows.closeExamSessionWindow();
  });
  ipcMain.on('openExamQuestionWindow', () => {
    windows.createExamQuestionWindow();
  });
  ipcMain.on('login', (_e, isLogin) => {
    setCookies(isLogin);
    windows.login();
  });
  ipcMain.on('logout', (_e) => {
    removeCookies('https://dlsms.com', 'isLogin');
    windows.logout();
  });
  ipcMain.on('closeSessionWindow', (_e) => {
    windows.closeSessionWindow();
  });
  ipcMain.on('copyCode', (_e, code) => {
    clipboard.writeText(code);
  });
};
