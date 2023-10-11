import { store, setScreenStream, setIsShareScreen } from '../store';

export const shareScreen = async (sourceId) => {
  try {
    if (!sourceId) return console.log('No sourceId');
    store.dispatch(setIsShareScreen(true));
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
    store.dispatch(setIsShareScreen(false));
    localScreenStream.getTracks().forEach((track) => track.stop());
    store.dispatch(setScreenStream(null));
  }
};
