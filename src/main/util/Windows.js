const { createAccountWindow } = require('../windows/accountWindow');
const { createAppWindow } = require('../windows/mainAppWindow');
const { createMonitorWindow } = require('../windows/monitorWindow');
const { createSessionWindow } = require('../windows/classSessionWindow');
const { createExamSessionWindow } = require('../windows/examSessionWindow');
const { createExamQuestionWindow } = require('../windows/examQuestionWindow');
const { readyToShow } = require('../util/events');
const { app, ipcMain, desktopCapturer, Menu } = require('electron');
const path = require('path');

module.exports = class Windows {
  constructor() {
    this.mainWindow = null;
    this.accWindow = null;
    this.monitWindow = null;
    this.sessionWindow = null;
    this.examSessionWindow = null;
    this.examQuestionWindow = null;
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
      this.examSessionWindow.on('closed', () => {
        this.examSessionWindow = null;
      });
    }
  }
  createExamQuestionWindow() {
    if (!this.examQuestionWindow && this.examSessionWindow) {
      this.examQuestionWindow = createExamQuestionWindow(false);
      this.examQuestionWindow.on(readyToShow, () => {
        this.examQuestionWindow.show();
      });
      this.examQuestionWindow.on('closed', () => {
        this.examQuestionWindow = null;
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
      const videoOptionsMenu = Menu.buildFromTemplate(
        inputSources.map((source) => {
          return {
            label: source.name,
            click: () => {
              if (this.examSessionWindow) {
                this.examSessionWindow.webContents.send('source', { source });
              }
              if (this.sessionWindow) {
                this.sessionWindow.webContents.send('source', { source });
              }
            },
          };
        })
      );
      videoOptionsMenu.popup();
    } catch (error) {
      console.log(error);
    }
  }
  logout() {
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
  login() {
    if (this.accWindow) {
      this.closeAccWindow();
    }
    this.createMainWindow();
  }
};
