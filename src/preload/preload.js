// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('account', {
  exitApp: () => ipcRenderer.send('exitApp'),
  login: (isLogin) => ipcRenderer.send('login', isLogin),
  logout: () => ipcRenderer.send('logout'),
  getEmail: (email) => ipcRenderer.on('getEmail', email),
  getUserType: (userType) => ipcRenderer.on('getUserType', userType),
  getToken: (token) => ipcRenderer.on('getToken', token),
  getUserId: (userId) => ipcRenderer.on('getUserId', userId),
  getAuth: (auth) => ipcRenderer.on('getAuth', auth),
  copyCode: (code) => ipcRenderer.send('copyCode', code),
  openMonitorWindow: () => ipcRenderer.send('openMonitorWindow'),
  getPaths: () => ipcRenderer.invoke('paths'),
  getRequire: () => ipcRenderer.invoke('require'),
  getMediasoup: () => ipcRenderer.invoke('mediasoup-client'),
  openSessionWindow: () => ipcRenderer.send('openSessionWindow'),
  openTutorSessionWindow: () => ipcRenderer.send('openTutorSessionWindow'),
  closeSessionWindow: () => ipcRenderer.send('closeSessionWindow'),
  openExamSessionWindow: () => ipcRenderer.send('openExamSessionWindow'),
  openExamQuestionWindow: () => ipcRenderer.send('openExamQuestionWindow'),
  closeExamSessionWindow: () => ipcRenderer.send('closeExamSessionWindow'),
  closeExamQuestionWindow: () => ipcRenderer.send('closeExamQuestionWindow'),
  blurExamQuestionWindow: (callback) => ipcRenderer.on('blur', callback),
  minimizeExamQuestionWindow: (callback) =>
    ipcRenderer.on('minimize', callback),
  maximizeExamQuestionWindow: (callback) =>
    ipcRenderer.on('maximize', callback),
  focusExamQuestionWindow: (callback) => ipcRenderer.on('focus', callback),
  isExamSessionWindowOpen: () => ipcRenderer.invoke('isExamSessionWindowOpen'),
});
