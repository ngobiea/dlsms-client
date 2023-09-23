const { app, ipcMain, clipboard, desktopCapturer, Menu } = require('electron');
const path = require('path');
const { createAccountWindow } = require('./accountWindow');
const { createAppWindow } = require('./mainAppWindow');
const { createMonitorWindow } = require('./monitorWindow');
const { createSessionWindow } = require('./classSessionWindow');
const { createExamSessionWindow } = require('./examSessionWindow');
const { createExamQuestionWindow } = require('./examQuestionWindow');

const BrowserHistory = require('node-browser-history');

const { readyToShow } = require('../util/events');

exports.createWindow = async () => {
  const { setCookies, getCookie, removeCookies } = require('./cookies');

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
  let examSessionWindow;
  let examQuestionWindow;

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
  ipcMain.on('openExamSessionWindow', () => {
    examSessionWindow = createExamSessionWindow(false);
    examSessionWindow.on(readyToShow, () => {
      examSessionWindow.show();
    });
  });
  ipcMain.on('showScreenSources', async () => {
    try {
      const inputSources = await desktopCapturer.getSources({
        types: ['window', 'screen'],
      });

      const videoOptionsMenu = Menu.buildFromTemplate(
        inputSources.map((source) => {
          return {
            label: source.name,
            click: () => {
              if (examSessionWindow) {
                examSessionWindow.webContents.send('source', { source });
              }
              if (sessionWindow) {
                sessionWindow.webContents.send('source', { source });
              }
            },
          };
        })
      );
      videoOptionsMenu.popup();
    } catch (error) {
      console.log(error);
    }
  });
  ipcMain.on('closeExamSessionWindow', () => {
    examSessionWindow.close();
    examSessionWindow = null;
  });
  ipcMain.on('openExamQuestionWindow', () => {
    examQuestionWindow = createExamQuestionWindow(false);
    examQuestionWindow.on(readyToShow, () => {
      examQuestionWindow.show();
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
