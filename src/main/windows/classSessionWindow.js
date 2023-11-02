const { BrowserWindow, screen } = require('electron');
const path = require('path');

exports.createSessionWindow = (isShow) => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const classSessionWindow = new BrowserWindow({
    width,
    height,
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
    title: 'session',
    show: isShow,
    icon: path.join(__dirname, '../../renderer/public/images/dlsms2.png'),
  });

  classSessionWindow.loadFile(
    path.join(__dirname, '../../renderer/public/classSession.html')
  );

  return classSessionWindow;
};
