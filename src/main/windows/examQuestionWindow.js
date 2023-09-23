const { BrowserWindow, screen } = require('electron');
const path = require('path');
const windowStateKeeper = require('electron-window-state');

exports.createExamQuestionWindow = (isShow) => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const winState = windowStateKeeper({
    defaultWidth: width,
    defaultHeight: height,
  });

  const examQuestionWindow = new BrowserWindow({
    width: winState.width,
    height: winState.height,
    x: winState.x,
    y: winState.y,
    webPreferences: {
      preload: path.join(__dirname, '../../preload/preload.js'),
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

  examQuestionWindow.loadFile(
    path.join(__dirname, '../../renderer/public/examQuestion.html')
  );

  examQuestionWindow.setContentProtection(true);

  winState.manage(examQuestionWindow);

  return examQuestionWindow;
};
