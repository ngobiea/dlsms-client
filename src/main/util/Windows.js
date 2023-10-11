const { createAccountWindow } = require('../windows/accountWindow');
const { createAppWindow } = require('../windows/mainAppWindow');
const { createMonitorWindow } = require('../windows/monitorWindow');
const { createSessionWindow } = require('../windows/classSessionWindow');
const { createExamSessionWindow } = require('../windows/examSessionWindow');
const { createExamQuestionWindow } = require('../windows/examQuestionWindow');
const { readyToShow } = require('../util/events');
const { app, ipcMain, desktopCapturer, Menu, session } = require('electron');
const { get } = require('react-hook-form');

module.exports = class Windows {
  constructor() {
    this.mainWindow = null;
    this.accWindow = null;
    this.monitWindow = null;
    this.sessionWindow = null;
    this.examSessionWindow = null;
    this.examQuestionWindow = null;
    this.session = session.defaultSession;
  }

  createMainWindow() {
    if (this.mainWindow) {
      return;
    }
    this.mainWindow = createAppWindow(false);
    this.mainWindow.on(readyToShow, () => {
      this.mainWindow.show();
    });
    this.mainWindow.on('closed', () => {
      this.mainWindow = null;
    });
    this.mainWindow.on('close', (e) => {
      if (
        this.examQuestionWindow ||
        this.examSessionWindow ||
        this.sessionWindow ||
        this.monitWindow
      ) {
        e.preventDefault();
      }
    });
  }
  createAccWindow() {
    if (this.accWindow) {
      return;
    }
    this.accWindow = createAccountWindow(false);
    this.accWindow.on(readyToShow, () => {
      this.accWindow.show();
    });
    this.accWindow.on('closed', () => {
      this.accWindow = null;
    });
  }
  createMonitWindow() {
    if (!this.monitWindow) {
      this.monitWindow = createMonitorWindow(false);
      this.monitWindow.on(readyToShow, () => {
        this.monitWindow.show();
      });
      this.monitWindow.on('closed', () => {
        this.monitWindow = null;
      });
    }
  }
  createSessionWindow() {
    if (!this.sessionWindow) {
      this.sessionWindow = createSessionWindow(false);
      this.sessionWindow.on(readyToShow, () => {
        this.sessionWindow.show();
      });
      this.sessionWindow.on('closed', () => {
        this.sessionWindow = null;
      });
    }
  }
  createExamSessionWindow() {
    if (!this.examSessionWindow) {
      this.examSessionWindow = createExamSessionWindow(false);
      this.examSessionWindow.on(readyToShow, () => {
        this.examSessionWindow.show();
      });
      this.examSessionWindow.on('closed', async () => {
        this.examSessionWindow = null;
        console.log(await this.getCookie('record'));
      });
      this.examSessionWindow.on('close', (e) => {
        if (this.examQuestionWindow) {
          e.preventDefault();
        }
      });
    }
  }
  createExamQuestionWindow() {
    if (!this.examQuestionWindow && this.examSessionWindow) {
      this.examQuestionWindow = createExamQuestionWindow(false);

      this.examQuestionWindow.on(readyToShow, () => {
        this.examQuestionWindow.show();

        this.setCookie({
          url: 'https://dlsms.com',
          name: 'record',
          value: true,
          expirationDate: 1713117329.737435,
        });
      });

      this.examQuestionWindow.on('closed', () => {
        this.examQuestionWindow = null;
        setTimeout(() => {
          this.closeExamSessionWindow();
        }, 3000);
      });
      this.examQuestionWindow.on('close', async (e) => {
        const record = await this.getCookie('record');
        if (record.length > 0) {
          e.preventDefault();
          this.removeCookie('https://dlsms.com', 'record');
          this.examSessionWindow.webContents.send(
            'helpCloseExamQuestionWindow'
          );
        }
      });

      this.examQuestionWindow.on('blur', () => {
        this.examQuestionWindow.webContents.send('blur');
      });

      this.examQuestionWindow.on('focus', () => {
        this.examQuestionWindow.webContents.send('focus');
      });

      this.examQuestionWindow.on('maximize', (_e) => {
        this.examQuestionWindow.webContents.send('maximize');
      });

      this.examQuestionWindow.on('minimize', (_e) => {
        this.examQuestionWindow.webContents.send('minimize');
      });
    }
  }
  closeMainWindow() {
    if (this.mainWindow) {
      this.mainWindow.close();
    }
  }
  closeAccWindow() {
    if (this.accWindow) {
      this.accWindow.close();
    }
  }
  closeMonitWindow() {
    if (this.monitWindow) {
      this.monitWindow.close();
    }
  }
  closeSessionWindow() {
    if (this.sessionWindow) {
      this.sessionWindow.close();
    }
  }
  closeExamSessionWindow() {
    if (this.examSessionWindow) {
      this.examSessionWindow.close();
    }
  }
  closeExamQuestionWindow() {
    this.examQuestionWindow.close();
  }

  async showScreenSources() {
    try {
      const inputSources = await desktopCapturer.getSources({
        types: ['window', 'screen'],
      });

      if (this.examSessionWindow) {
        this.examSessionWindow.webContents.send('source', {
          source: inputSources[0],
        });
      } else {
        const videoOptionsMenu = Menu.buildFromTemplate(
          inputSources.map((source) => {
            return {
              label: source.name,
              click: () => {
                if (this.sessionWindow) {
                  this.sessionWindow.webContents.send('source', { source });
                }
              },
            };
          })
        );
        videoOptionsMenu.popup();
      }
    } catch (error) {
      console.log(error);
    }
  }
  logout() {
    this.removeCookie('https://dlsms.com', 'isLogin');
    if (this.monitWindow) {
      this.closeMonitWindow();
    }
    if (this.sessionWindow) {
      this.closeSessionWindow();
    }
    if (this.examSessionWindow) {
      this.closeExamSessionWindow();
    }
    if (this.examQuestionWindow) {
      this.closeExamQuestionWindow();
    }
    if (this.mainWindow) {
      this.closeMainWindow();
    }
    this.createAccWindow();
  }
  login(isLogin) {
    if (this.accWindow) {
      this.closeAccWindow();
    }
    this.createMainWindow();
    this.setCookie(isLogin);
  }
  async getCookie(data) {
    try {
      return await this.session.cookies.get({ name: data });
    } catch (error) {
      console.log(error);
    }
  }
  async removeCookie(url, name) {
    try {
      await this.session.cookies.remove(url, name);
    } catch (error) {
      console.log(error);
    }
  }
  async setCookie(data) {
    try {
      await this.session.cookies.set(data);
    } catch (error) {
      console.log(error);
    }
  }
  async getCookies() {
    try {
      return await this.session.cookies.get({});
    } catch (error) {
      console.log(error);
      return [];
    }
  }
};
