import { store, setProgress, setRecognitionResult } from '../../store';
import { ipcRenderer } from 'electron';
import { offWebCam } from './webcam';
import * as faceapi from '@vladmandic/face-api';
const numberOfImages = 10;
const recognitionThreshold = 2;
let recognitions = [];

export const loadModels = async () => {
  const accountType = store.getState().account.accountType;
  console.log(accountType);
  try {
    if (accountType === 'student') {
      const { modelsPath } = await ipcRenderer.invoke('paths');
      console.log(modelsPath);
      await faceapi.nets.tinyFaceDetector.loadFromUri(modelsPath);
      await faceapi.nets.ssdMobilenetv1.loadFromUri(modelsPath);
      await faceapi.nets.faceLandmark68Net.loadFromUri(modelsPath);
      await faceapi.nets.faceRecognitionNet.loadFromUri(modelsPath);
    }
  } catch (error) {
    console.log('Error occur while Loading models', error);
  }
};

const getLabeledFaceDescriptors = async () => {
  const labels = [store.getState().account.user.email];
  console.log(store.getState().join.studentImages.length);
  return Promise.all(
    labels.map(async (label) => {
      const descriptions = [];
      store.getState().join.studentImages.map(async (image) => {
        const img = await faceapi.fetchImage(image.location);
        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();
        if (detections) {
          descriptions.push(detections.descriptor);
        }
      });
      return new faceapi.LabeledFaceDescriptors(label, descriptions);
    })
  );
};

export const processRecognition = async (localStream) => {
  console.log(localStream);
  try {
    store.dispatch(setRecognitionResult({ result: -1 }));
    const labeledFaceDescriptors = await getLabeledFaceDescriptors();
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

    const interval = setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(localStream)
        .withFaceLandmarks()
        .withFaceDescriptors();

      const results = detections.map((detection) => {
        const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
        return {
          label: bestMatch.label,
          match: bestMatch.distance,
        };
      });

      console.log(results);
      recognitions.push(results);
      store.dispatch(setProgress(recognitions.length * numberOfImages));

      if (recognitions.length >= numberOfImages) {
        clearInterval(interval);
        processResult();
      }
    }, 2000);
  } catch (error) {
    console.log('Error occur while processing recognition', error);
  }
};

const processResult = () => {
  console.log('Processing Result');
  const label = store.getState().account.user.email;
  let result = 0;

  for (const recognition of recognitions) {
    if (recognition.length === 0) {
      result = 0;
      break;
    } else if (recognition.length === 1) {
      if (recognition[0].label === label) {
        result += recognition[0].match;
      }
    } else if (recognition.length > 1) {
      result = 0;
      break;
    }
  }
  if (result >= recognitionThreshold) {
    offWebCam();
    store.dispatch(setRecognitionResult({ result }));
  } else {
    store.dispatch(setRecognitionResult({ result, statusText: 'retry' }));
  }
  recognitions = [];
};
