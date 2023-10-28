const { desktopCapturer, Menu, session } = require('electron');
const path = require('path');
const { createAccountWindow } = require('../windows/accountWindow');
const { createAppWindow } = require('../windows/mainAppWindow');
const { createMonitorWindow } = require('../windows/monitorWindow');
const { createSessionWindow } = require('../windows/classSessionWindow');
const { createExamSessionWindow } = require('../windows/examSessionWindow');
const { createExamQuestionWindow } = require('../windows/examQuestionWindow');
const { createTutorSessionWindow } = require('../windows/tutorSessionWindow');
const { readyToShow } = require('../util/events');
const BrowserHistory = require('node-browser-history');

module.exports = class Windows {
  constructor() {
    this.mainWindow = null;
    this.accWindow = null;
    this.monitWindow = null;
    this.sessionWindow = null;
    this.examSessionWindow = null;
    this.examQuestionWindow = null;
    this.tutorSessionWindow = null;
    this.session = session.defaultSession;
    this.bHInterval = null;
    this.bHIntervalTime = 0.25;
    this.intervalTime = 15000;
    this.cookieUrl = 'https://dlsms.com';
    this.closeESWInterval = 3000;
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

        this.bHInterval = setInterval(() => {
          BrowserHistory.getAllHistory(this.bHIntervalTime)
            .then((histories) => {
              histories.forEach((history) => {
                if (history.length > 0) {
                  console.log(history);
                  this.examSessionWindow.webContents.send('bHistory', {
                    history,
                  });
                }
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }, this.intervalTime);
      });

      this.examQuestionWindow.on('closed', () => {
        this.examQuestionWindow = null;
        clearInterval(this.bHInterval);
        this.bHInterval = null;
        this.examSessionWindow.webContents.send('stopRecord');
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
  createTutorSessionWindow() {
    if (!this.tutorSessionWindow) {
      this.tutorSessionWindow = createTutorSessionWindow(false);
      this.tutorSessionWindow.on(readyToShow, () => {
        this.tutorSessionWindow.show();
      });
      this.tutorSessionWindow.on('closed', () => {
        this.tutorSessionWindow = null;
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
  closeTutorSessionWindow() {
    if (this.tutorSessionWindow) {
      this.tutorSessionWindow.close();
    }
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
      return [];
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
