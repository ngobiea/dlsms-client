import { store, setDevices } from '../store';

export const getDevices = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    store.dispatch(setDevices(devices));
  } catch (error) {
    console.error('Error getting device list:', error);
  }
};
