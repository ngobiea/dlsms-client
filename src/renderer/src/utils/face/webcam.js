import {
  store,
  setWebcams,
  setLocalStream,
  setWebcamStatus,
} from '../../store';

export const onWebCam = async () => {
  const { defaultWebcam, localStream } = store.getState().join;
  if (localStream) {
    offWebCam();
  }
  try {
    store.dispatch(setWebcamStatus(true));

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        deviceId: { ideal: defaultWebcam.deviceId },
        width: {
          max: 1280,
          min: 480,
        },
        height: {
          max: 1280,
          min: 480,
        },
      },
    });
    store.dispatch(setLocalStream(stream));
  } catch (error) {
    console.log(error);
  }
};

export const offWebCam = () => {
  const { localStream } = store.getState().join;
  if (localStream) {
    console.log('stop capture screen');
    localStream.getTracks().forEach((track) => track.stop());
    store.dispatch(setLocalStream(null));
  }
};

export const getWebCams = async () => {
  try {
    const webcams = await navigator.mediaDevices.enumerateDevices();
    store.dispatch(setWebcams(webcams));
  } catch (error) {
    console.error('Error getting webcam list:', error);
  }
};
