const { BrowserWindow } = require('electron');
const path = require('path');
exports.createAccountWindow = (isShow) => {
  const accountWindow = new BrowserWindow({
    width: 700,
    height: 750,
    frame: false,
    webPreferences: {
      // preload: path.join(__dirname, '../../preload/preload.js'),
      contextIsolation: false,
      nodeIntegration: true,
    },
    backgroundColor: '#759278',
    resizable: false,
    title: 'account',
    show: isShow,
    icon: path.join(__dirname, '../../renderer/public/images/dlsms2.png'),
    
  });
  accountWindow.loadFile(
    path.join(__dirname, '../../renderer/public/account.html')
  );

  return accountWindow;
};
