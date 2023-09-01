import { setIsDeviceSet, store } from '../../store';

export const handleLoadDevice = async (device, rtpCapabilities) => {
  try {
    await device.load({ routerRtpCapabilities: rtpCapabilities });
    console.log('Device RTP Capabilities', device.rtpCapabilities);
    store.dispatch(setIsDeviceSet(true));
  } catch (error) {
    console.log(error);
    if (error.name === 'UnsupportedError') {
      console.warn('browser not supported');
    }
  }
};
