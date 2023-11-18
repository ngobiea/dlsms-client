import { ipcRenderer } from 'electron';
import { store, setRecordingStream } from '../../../store';
const { writeFile } = require('fs');
ipcRenderer.on('helpCloseExamQuestionWindow', (_e) => {
  stopRecording();
  ipcRenderer.send('closeExamSessionWindow');
});
let recodedChunks = [];

export const captureScreen = async () => {
  try {
    stopCaptureScreen();
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        mandatory: {
          chromeMediaSource: 'desktop',
        },
      },
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          minWidth: 1280,
          maxWidth: 1280,
          minHeight: 720,
          maxHeight: 720,
        },
      },
    });
    store.dispatch(setRecordingStream(stream));
    startRecording(stream);
  } catch (error) {
    console.log(error);
  }
};

export const stopCaptureScreen = () => {
  const { recordingStream } = store.getState().session;
  if (recordingStream) {
    console.log('stop capture screen');
    recordingStream.getTracks().forEach((track) => track.stop());
    store.dispatch(setRecordingStream(null));
  }
};

let mediaRecorder;

export const startRecording = (stream) => {
  try {
    if (stream) {
      mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm; codecs=vp9',
      });
      mediaRecorder.start();

      mediaRecorder.ondataavailable = onDataAvailableHandler;
      mediaRecorder.onstop = onStopHandler;
      mediaRecorder.onstart = onStartHandler;
    }
  } catch (error) {
    console.log(error);
  }
};

const onStartHandler = (_e) => {
  console.log('start recording');
  recodedChunks = [];
};
const onStopHandler = async (_e) => {
  const blob = new Blob(recodedChunks, {
    type: 'video/webm; codecs=vp9',
  });
  const buffer = Buffer.from(await blob.arrayBuffer());

  const { filePath } = await ipcRenderer.invoke('saveFilePath');
  console.log(filePath);
  if (filePath) {
    writeFile(filePath, buffer, () => {
      console.log('video saved successfully');
    });
  }
  stopCaptureScreen();
};
const onDataAvailableHandler = (e) => {
  console.log('data available');
  console.log(e.data);
  recodedChunks.push(e.data);
};
export const stopRecording = async () => {
  if (mediaRecorder) {
    mediaRecorder.stop();
  }
};
