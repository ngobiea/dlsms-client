import { v4 as uuidv4 } from 'uuid';
import { ipcRenderer } from 'electron';
// import {} from 'electron'
const pad = 2;
const code8 = 8;

export const getCapitalLetters = (str) => {
  const words = str.split(' ');
  let result = '';
  for (const element of words) {
    const word = element;
    if (word.length > 0) {
      result += word[0].toUpperCase();
    }
  }
  return result;
};


export const isTimeBeforeDate = (time, date) => {
  const currentTime = new Date();
  const selectedDateTime = new Date(`${date}T${time}:00`);
  return currentTime > selectedDateTime;
};

export const generateClassroomCode = () => {
  return uuidv4().replace(/-/g, '').substring(0, code8);
};

export const generateUniqueId = () => {
  return uuidv4();
};

export const logoutHandler = () => {
  localStorage.removeItem('user');
  ipcRenderer.send('logout')
};
