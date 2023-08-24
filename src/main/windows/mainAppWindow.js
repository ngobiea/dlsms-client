const { BrowserWindow, screen } = require('electron');
const path = require('path');
const windowStateKeeper = require('electron-window-state');
const fs = require('fs');

exports.createAppWindow = (isShow) => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const winState = windowStateKeeper({
    defaultWidth: width,
    defaultHeight: height,
  });
  const mainWindow = new BrowserWindow({
    width: winState.width,
    height: winState.height,
    x: winState.x,
    y: winState.y,
    webPreferences: {
      // preload: path.join(__dirname, '../../preload/preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#064f32',
      symbolColor: 'white',
      height: 40,
    },
    title: 'Main App Window',
    show: isShow,
    icon: path.join(__dirname, '../../renderer/public/images/dlsms2.png'),
  });
  mainWindow.loadFile(path.join(__dirname, '../../renderer/public/index.html'));
 
  winState.manage(mainWindow);
  return mainWindow;
};
