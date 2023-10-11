import { ipcRenderer } from 'electron';
import { store, setRecordingStream } from '../../../store';
const examSessionId = localStorage.getItem('examSessionId');

ipcRenderer.on('helpCloseExamQuestionWindow', (_e) => {
  stopRecording();
  ipcRenderer.send('closeExamSessionWindow');
});
export const recordScreen = async (sourceId) => {
  try {
    if (!sourceId) return console.log('No sourceId');
    stopRecordScreen();
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
    store.dispatch(setRecordingStream(stream));
  } catch (error) {
    console.log(error);
  }
};

export const stopRecordScreen = () => {
  const { recordingStream } = store.getState().session;
  if (recordingStream) {
    recordingStream.getTracks().forEach((track) => track.stop());
    store.dispatch(setRecordingStream(null));
  }
};

let mediaRecorder;
let interval;
const intervalTime = 180000;
let index = 0;

export const startRecording = (socket) => {
  try {
    const { recordingStream } = store.getState().session;
    if (recordingStream) {
      mediaRecorder = new MediaRecorder(recordingStream, {
        mimeType: 'video/webm; codecs=vp9',
      });
      mediaRecorder.start();

      mediaRecorder.ondataavailable = (e) => {
        console.log('data available');
        console.log(e.data);
        socket.emit('ESR-Chunk', { examSessionId, index, chunk: e.data });
      };
      mediaRecorder.onstart = () => {
        index = 0;
      };
      mediaRecorder.onstop = () => {
        index = 0;
      };
      interval = setInterval(() => {
        getData();
        index++;
      }, intervalTime);
    }
  } catch (error) {
    console.log(error);
  }
};
const getData = () => {
  if (mediaRecorder.state === 'recording') {
    mediaRecorder.requestData();
  }
};
export const stopRecording = () => {
  if (mediaRecorder) {
    mediaRecorder.stop();
    clearInterval(interval);
    stopRecordScreen();
  }
};
