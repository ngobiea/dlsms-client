import { store, setScreenStream } from '../store';

export const shareScreen = async (sourceId) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: sourceId,
          minWidth: 1280,
          maxWidth: 1280,
          minHeight: 720,
          maxHeight: 720,
        },
      },
    });
    store.dispatch(setScreenStream(stream));
  } catch (error) {
    console.log(error);
  }
};

export const stopShareScreen = () => {
  const { localScreenStream } = store.getState().session;
  if (localScreenStream) {
    localScreenStream.getTracks().forEach((track) => track.stop());
    store.dispatch(setScreenStream(null));
  }
};
