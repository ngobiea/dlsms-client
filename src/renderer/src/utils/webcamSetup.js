import {
  store,
  setLocalStream,
  setMediaStreams,
  setVideoEnable,
  setIsProducer,
} from '../store';
const webcamError = 'Error accessing webcam';
export const onWebCam = (isAudio, isVideo) => {
  const { defaultVideoOutputDevice } = store.getState().session;

  let videoConstraints = false;
  if (isVideo && defaultVideoOutputDevice) {
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
      audio: true,
    })
    .then((stream) => {
      store.dispatch(setLocalStream(stream));
      store.dispatch(setMediaStreams(stream));
      store.dispatch(setIsProducer(true));
      if (!isAudio) {
        disableMic();
      }
    })
    .catch((error) => {
      console.log(webcamError, error);
    });
};

export const setUpWebCam = () => {
  const { defaultVideoOutputDevice, localStream } = store.getState().session;
  if (localStream) {
    offWebCam();
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
      audio: true,
    })
    .then((stream) => {
      store.dispatch(setVideoEnable(true));
      store.dispatch(setLocalStream(stream));
      store.dispatch(setMediaStreams(stream));
    })
    .catch((error) => {
      console.log(webcamError, error);
    });
};

export const offWebCam = () => {
  const { localStream } = store.getState().session;

  if (localStream) {
    const tracks = localStream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
    store.dispatch(setLocalStream(null));
  }
};

export const enableMic = () => {
  const { localStream } = store.getState().session;
  if (localStream) {
    console.log(localStream.getAudioTracks()[0]);
    localStream.getAudioTracks()[0].enabled = true;
  }
};
export const disableMic = () => {
  const { localStream } = store.getState().session;
  if (localStream) {
    localStream.getAudioTracks()[0].enabled = false;
  }
};
