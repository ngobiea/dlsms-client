import { store, setLocalStream } from '../store';
export const handleOnWebCam = () => {
  console.log('Webcam is already on');
  navigator.mediaDevices
    .getUserMedia({
      video: false,
      audio: false,
    })
    .then((stream) => {
      store.dispatch(setLocalStream(stream));
    })
    .catch((error) => {
      console.log('Error accessing webcam', error);
    });
};

export const handleOffWebCam = () => {
  const { localStream } = store.getState().session;
  if (localStream) {
    const tracks = localStream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
    // store.dispatch(setLocalStream(null));
  }
};

export const handleOnMic = (value) => {
  console.log(value);
  navigator.mediaDevices
    .getUserMedia({
      video: false,
      audio: true,
    })
    .then((stream) => {
      store.dispatch(setLocalStream(stream));
    })
    .catch((error) => {
      console.log('Error accessing webcam', error);
    });
};

export const handleOffMic = (value) => {
  console.log(value);
  const { localStream } = store.getState().session;
  if (localStream) {
    const tracks = localStream.getAudioTracks();
    tracks[0].stop();
  }
};
