import { store, setProgress, setDetectionResult } from '../../store';
import { offWebCam } from './webcam';
import * as faceapi from '@vladmandic/face-api';
const numberOfImages = 10;
const intervalTime = 1000;
const processTime = 11000;
const detectionThreshold = 7.5;
let detections = [];
let result = 0;
let camera = null;
let imagesArray = [];

export const loadModels = async () => {
  const accountType = store.getState().account.accountType;
  console.log(accountType);
  try {
    if (accountType === 'student') {
      const { modelsPath } = await window.account.getPaths();
      console.log(modelsPath);
      await faceapi.nets.tinyFaceDetector.loadFromUri(modelsPath);
    }
  } catch (error) {
    console.log('Error occur while Loading models', error);
  }
};

export const capturePhotos = async () => {
  const { localStream } = store.getState().join;
  imagesArray = [];
  detections = [];
  store.dispatch(setDetectionResult({ images: [], result: -1 }));

  let interval;
  try {
    await loadModels();

    interval = setInterval(async () => {
      camera = new ImageCapture(localStream.getVideoTracks()[0]);
      const pic = await takePhoto(camera.track);
      imagesArray.push(pic);

      store.dispatch(setProgress(imagesArray.length * numberOfImages));
      const image = await faceapi.bufferToImage(pic);
      const detection = await faceapi.detectAllFaces(
        image,
        new faceapi.TinyFaceDetectorOptions()
      );
      console.log(detection);
      detections.push(detection);
      if (imagesArray.length >= numberOfImages) {
        clearInterval(interval);
      }
    }, intervalTime);
    setTimeout(() => {
      processDetection();
    }, processTime);
  } catch (error) {
    console.log(error);
  }
};
export const processDetection = () => {
  console.log('Processing Detection');
  for (const detection of detections) {
    if (detection.length === 1) {
      console.log(detection[0]);
      result += detection[0].score;
    } else if (detection.length > 1 || detection.length === 0) {
      result = 0;
      break;
    }
  }

  console.log(result);

  store.dispatch(setDetectionResult({ images: imagesArray, result }));
  if (result >= detectionThreshold) {
    offWebCam();
  }
  detections = [];
  result = 0;
  imagesArray = [];
};
export const takePhoto = (track) => {
  // 1. Check readyState
  if (track.readyState !== 'live') {
    return Promise.reject(new DOMException('InvalidStateError'));
  }

  // 2. Create promise
  // 4. Return promise
  return new Promise((resolve, reject) => {
    // 3. Run in parallel
    track.readyState === 'live' &&
      (async () => {
        try {
          // 3a. Gather data into Blob
          const blob = await camera.takePhoto({
            /* settings */
          });

          // 3b. Reject on error
          if (!blob) {
            reject(new DOMException('UnknownError'));
            return;
          }

          // 3c. Resolve with Blob
          resolve(blob);
        } catch (error) {
          reject(error);
        }
      })();
  });
};
