const { BrowserWindow } = require('electron');
const path = require('path');
const { height, width, x, y } = require('../util/examSession');

exports.createExamSessionWindow = (isShow) => {
  const examSessionWindow = new BrowserWindow({
    width,
    height,
    x,
    y,
    webPreferences: {
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
    title: 'monitor',
    show: isShow,
    icon: path.join(__dirname, '../../renderer/public/images/dlsms2.png'),
  });

  examSessionWindow.loadFile(
    path.join(__dirname, '../../renderer/public/examSession.html')
  );

  return examSessionWindow;
};
