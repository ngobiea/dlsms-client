const { app, ipcMain, clipboard, dialog } = require('electron');
const path = require('path');

const Windows = require('../util/Windows');

exports.createWindow = async () => {
  const windows = new Windows();

  ipcMain.handle('paths', () => {
    return { modelsPath: path.join(__dirname, '../../renderer/public/models') };
  });

  const cookie = await windows.getCookie('isLogin');
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
  ipcMain.on('showScreenSources', async (_e, source) => {
    windows.showScreenSources(source);
  });
  ipcMain.on('closeExamSessionWindow', () => {
    windows.closeExamSessionWindow();
  });
  ipcMain.on('openExamQuestionWindow', () => {
    windows.createExamQuestionWindow();
  });
  ipcMain.on('openTutorSessionWindow', () => {
    windows.createTutorSessionWindow();
  });

  ipcMain.on('login', (_e, isLogin) => {
    windows.login(isLogin);
  });
  ipcMain.on('logout', (_e) => {
    windows.logout();
  });
  ipcMain.on('closeSessionWindow', (_e) => {
    windows.closeSessionWindow();
  });
  ipcMain.on('copyCode', (_e, code) => {
    clipboard.writeText(code);
  });
  ipcMain.handle('isExamSessionWindowOpen', () => {
    return windows.examSessionWindow !== null;
  });
  ipcMain.handle('closeExamWindow', () => {
    try {
      windows.closeExamQuestionWindow();
      return true;
    } catch (error) {
      return false;
    }
  });
  ipcMain.on('closeExamQuestionWindow', () => {
    windows.closeExamQuestionWindow();
  });
  ipcMain.handle('saveFilePath', async () => {
    const { filePath } = await dialog.showSaveDialog({
      buttonLabel: 'Save video',
      defaultPath: `vid-${Date.now()}.webm`,
    });
    return { filePath };
  });
};
