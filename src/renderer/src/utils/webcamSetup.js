import {
  store,
  setLocalVideoStream,
  setLocalAudioStream,
  setMicEnable,
  setMicState,
} from '../store';
const webcamError = 'Error accessing webcam';
export const enableWebCam = () => {
  const { defaultVideoOutputDevice } = store.getState().session;

  let videoConstraints = false;
  if (defaultVideoOutputDevice) {
    videoConstraints = {
      deviceId: { ideal: defaultVideoOutputDevice },
      width: {
        min: 560,
        max: 1920,
      },
      height: {
        min: 400,
        max: 1080,
      },
    };
  }

  navigator.mediaDevices
    .getUserMedia({
      video: videoConstraints,
    })
    .then((stream) => {
      store.dispatch(setLocalVideoStream(stream));
    })
    .catch((error) => {
      console.log(webcamError, error);
    });
};

export const setUpWebCam = () => {
  const { defaultVideoOutputDevice, localVideoStream } =
    store.getState().session;
  if (localVideoStream) {
    disableWebCam();
  }
  navigator.mediaDevices
    .getUserMedia({
      video: defaultVideoOutputDevice
        ? {
            deviceId: { exact: defaultVideoOutputDevice },
            width: {
              min: 560,
              max: 1920,
            },
            height: {
              min: 400,
              max: 1080,
            },
          }
        : undefined,
    })
    .then((stream) => {
      store.dispatch(setLocalVideoStream(stream));
    })
    .catch((error) => {
      console.log(webcamError, error);
    });
};

export const disableWebCam = () => {
  const { localVideoStream } = store.getState().session;

  if (localVideoStream) {
    const tracks = localVideoStream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
    store.dispatch(setLocalVideoStream(null));
  }
};

export const enableMic = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
  });
  store.dispatch(setLocalAudioStream(stream));
  return stream;
};
export const disableMic = () => {
  const { localAudioStream } = store.getState().session;
  if (localAudioStream) {
    const tracks = localAudioStream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
    store.dispatch(setLocalAudioStream(null));
  }
};

export const unmuteMic = () => {
  const { localAudioStream } = store.getState().session;
  if (localAudioStream) {
    localAudioStream.getAudioTracks()[0].enabled = true;
    store.dispatch(setMicState('unmute'));
  }
};

export const muteMic = () => {
  const { localAudioStream } = store.getState().session;
  if (localAudioStream) {
    localAudioStream.getAudioTracks()[0].enabled = false;
    store.dispatch(setMicState('mute'));
  }
};
