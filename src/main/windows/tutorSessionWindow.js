const { BrowserWindow } = require('electron');
const path = require('path');
const { height, width, x, y } = require('../util/examSession');

exports.createTutorSessionWindow = (isShow) => {
  const tutorSessionWindow = new BrowserWindow({
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
    title: 'tutorSession',
    show: isShow,
    icon: path.join(__dirname, '../../renderer/public/images/dlsms2.png'),
  });
  tutorSessionWindow.loadFile(
    path.join(__dirname, '../../renderer/public/tutorSession.html')
  );

  return tutorSessionWindow;
};
