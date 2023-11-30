import { ipcRenderer } from 'electron';
import * as faceapi from '@vladmandic/face-api';
import { offWebCam } from './webcam';
import { socket } from '../../context/realtimeContext';
const examSessionId = localStorage.getItem('examSessionId');
const classSessionId = localStorage.getItem('sessionId');

console.log(document.title);
import {
  store,
  setProgress,
  setRecognitionResult,
  setModelsLoaded,
} from '../../store';
const numberOfImages = 10;
const intervalTime = 2000;
const recognitionThreshold = 2;
const realtimeThreshold = 0.2;
const rTInterval = 5000;
const matchLimit = 3;
const unknownLimit = 5;
const emptyLimit = 8;
let intervalRef = null;
let recognitions = [];
const esaValue = 3000;

export default class FaceApi {
  static realtimeInterval = rTInterval;
  static labeledFaceDescriptors = null;
  static ESA = esaValue;

  static async loadRecognitionModels() {
    const accountType = store.getState().account.accountType;
    try {
      if (accountType === 'student') {
        const { modelsPath } = await ipcRenderer.invoke('paths');
        await faceapi.nets.tinyFaceDetector.loadFromUri(modelsPath);
        await faceapi.nets.ssdMobilenetv1.loadFromUri(modelsPath);
        await faceapi.nets.faceLandmark68Net.loadFromUri(modelsPath);
        await faceapi.nets.faceRecognitionNet.loadFromUri(modelsPath);

        this.getLabeledFaceDescriptors().then((lfd) => { 
          FaceApi.labeledFaceDescriptors = lfd;
          store.dispatch(setModelsLoaded(true));
        });
      }
    } catch (error) {
      console.log('Error occur while Loading models', error);
    }
  }

  static async getLabeledFaceDescriptors() {
    const labels = [store.getState().account.user.email];
    console.log(store.getState().join.studentImages.length);
    return Promise.all(
      labels.map(async (label) => {
        const descriptions = [];
        store.getState().join.studentImages.forEach(async (image) => {
          const img = await faceapi.fetchImage(image.location);
          const detectedFaces = await faceapi
            .detectSingleFace(img)
            .withFaceLandmarks()
            .withFaceDescriptor();
          if (detectedFaces) {
            descriptions.push(detectedFaces.descriptor);
          }
        });
        return new faceapi.LabeledFaceDescriptors(label, descriptions);
      })
    );
  }

  static async processRecognition(videoElement) {
    recognitions = [];
    try {
      store.dispatch(setRecognitionResult({ result: -1 }));
      const faceMatcher = new faceapi.FaceMatcher(
        FaceApi.labeledFaceDescriptors
      );
      let interval = null;
      interval = setInterval(async () => {
        const detectedFaces = await faceapi
          .detectAllFaces(videoElement)
          .withFaceLandmarks()
          .withFaceDescriptors();

        const results = detectedFaces.map((detection) => {
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
          FaceApi.processRecognitionResult();
          clearInterval(interval);
        }
      }, intervalTime);
    } catch (error) {
      console.log('Error occur while processing recognition', error);
    }
  }

  static async processRecognitionResult() {
    console.log('Processing Result');
    const label = store.getState().account.user.email;
    let result = 0;

    for (const recognition of recognitions) {
      console.log(recognition);
      if (
        recognition.length === 0 ||
        recognition.length > 1 ||
        recognition[0].label !== label
      ) {
        result = 0;
        break;
      } else if (recognition.length === 1 && recognition[0].label === label) {
        result += recognition[0].match;
      }
    }
    if (result >= recognitionThreshold) {
      offWebCam();
      store.dispatch(setRecognitionResult({ result }));
    } else {
      store.dispatch(setRecognitionResult({ result, statusText: 'retry' }));
    }
    recognitions = [];
  }
  static async processRealTimeRecognition(videoElement) {
    recognitions = [];
    try {
      const labeledFaceDescriptors = await FaceApi.getLabeledFaceDescriptors();
      const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

      intervalRef = setInterval(async () => {
        const detectedFaces = await faceapi
          .detectAllFaces(videoElement)
          .withFaceLandmarks()
          .withFaceDescriptors();

        const results = detectedFaces.map((detection) => {
          const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
          return {
            label: bestMatch.label,
            match: bestMatch.distance,
          };
        });

        console.log(results);
        recognitions.push(results);
        if (recognitions.length >= numberOfImages) {
          if (document.title === 'examSession') {
            FaceApi.processRealTimeRecognitionResult();
          } else if (document.title === 'classSession') {
            FaceApi.processClassRealTimeRecognitionResult();
          } else {
            console.log('No Session');
          }
        }
      }, rTInterval);
    } catch (error) {
      console.log('Error occur while processing recognition', error);
    }
  }

  static processRealTimeRecognitionResult() {
    console.log('Processing Result for examSession');

    const {
      countUnknownLabels,
      countEmptyResults,
      countMatchingLabels,
      moreFaces,
    } = FaceApi.processUtil();
    if (moreFaces) {
      return;
    }
    console.log(countMatchingLabels, countUnknownLabels, countEmptyResults);
    if (countMatchingLabels >= matchLimit) {
      console.log('verified');
    } else if (countUnknownLabels >= unknownLimit) {
      console.log('unknown');
      socket.emit('violation', {
        examSessionId,
        violation: {
          type: 'unknown',
          title: 'Unknown Person',
          description: 'UnKnown person Detected',
          time: new Date(),
        },
      });
    } else if (countEmptyResults >= emptyLimit) {
      console.log('empty');
      socket.emit('violation', {
        examSessionId,
        violation: {
          type: 'empty',
          title: 'No Face',
          description: 'No face or person detected',
          time: new Date(),
        },
      });
    }

    recognitions = [];
  }
  static stopRealTimeRecognition() {
    clearInterval(intervalRef);
  }
  static processUtil() {
    let countMatchingLabels = 0;
    let countUnknownLabels = 0;
    let countEmptyResults = 0;
    const label = store.getState().account.user.email;

    for (const recognition of recognitions) {
      if (recognition.length > 1) {
        socket.emit('violation', {
          examSessionId,
          violation: {
            type: 'moreFaces',
            title: 'More Faces Detected',
            description: 'More than one face detected',
            time: new Date(),
          },
        });
        recognitions = [];
        return { moreFaces: true };
      }

      if (
        recognition.length === 1 &&
        recognition[0].label === label &&
        recognition[0].match > realtimeThreshold
      ) {
        countMatchingLabels++;
      }
      if (recognition.length === 1 && recognition[0].label !== label) {
        countUnknownLabels++;
      }
      if (recognition.length === 0) {
        countEmptyResults++;
      }
    }
    return { countMatchingLabels, countUnknownLabels, countEmptyResults };
  }
  static processClassRealTimeRecognitionResult() {
    console.log('Processing Result for class session');

    const {
      countUnknownLabels,
      countEmptyResults,
      countMatchingLabels,
      moreFaces,
    } = FaceApi.processClassUtil();
    if (moreFaces) {
      return;
    }
    console.log(countMatchingLabels, countUnknownLabels, countEmptyResults);
    if (countMatchingLabels >= matchLimit) {
      console.log('verify');
      socket.emit('verify', {
        classSessionId,
        verify: {
          isVerify: true,
        },
      });
    } else if (countUnknownLabels >= unknownLimit) {
      console.log('unknown');
      socket.emit('verify', {
        classSessionId,
        verify: {
          isVerify: false,
        },
      });
    } else if (countEmptyResults >= emptyLimit) {
      console.log('empty');
      socket.emit('verify', {
        classSessionId,
        verify: {
          isVerify: false,
        },
      });
    }

    recognitions = [];
  }

  static processClassUtil() {
    let countMatchingLabels = 0;
    let countUnknownLabels = 0;
    let countEmptyResults = 0;
    const label = store.getState().account.user.email;

    for (const recognition of recognitions) {
      if (recognition.length > 1) {
        socket.emit('verify', {
          classSessionId,
          verify: {
            isVerify: false,
          },
        });
        recognitions = [];
        return { moreFaces: true };
      }

      if (
        recognition.length === 1 &&
        recognition[0].label === label &&
        recognition[0].match > realtimeThreshold
      ) {
        countMatchingLabels++;
      }
      if (recognition.length === 1 && recognition[0].label !== label) {
        countUnknownLabels++;
      }
      if (recognition.length === 0) {
        countEmptyResults++;
      }
    }
    return { countMatchingLabels, countUnknownLabels, countEmptyResults };
  }
}
