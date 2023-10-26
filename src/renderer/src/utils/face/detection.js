import { store, setProgress, setDetectionResult } from '../../store';
import { offWebCam } from './webcam';
import * as faceapi from '@vladmandic/face-api';
const numberOfImages = 10;
const intervalTime = 1000;
const detectionThreshold = 7.5;
let imagesArray = [];
let detections = [];

export const loadModels = async () => {
  const accountType = store.getState().account.accountType;
  try {
    if (accountType === 'student') {
      const { modelsPath } = await window.account.getPaths();
      await faceapi.nets.tinyFaceDetector.loadFromUri(modelsPath);
      console.log('Models Loaded');
    }
  } catch (error) {
    console.log('Error occur while Loading models', error);
  }
};

export const capturePhotos = async () => {
  imagesArray = [];
  store.dispatch(setDetectionResult({ images: [], result: -1 }));

  let interval;
  try {
    interval = setInterval(async () => {
      const pic = await captureImageFromWebcam();
      imagesArray.push(pic);
      store.dispatch(setProgress(imagesArray.length * numberOfImages));
      if (imagesArray.length >= numberOfImages) {
        console.log('Done Processing Detection');
        processDetection();
        clearInterval(interval);
      }
    }, intervalTime);
  } catch (error) {
    console.log(error);
  }
};

const processDetection = async () => {
  detections = [];
  try {
    await Promise.all(
      imagesArray.map(async (pic) => {
        const image = await faceapi.bufferToImage(pic);
        const detection = await faceapi.detectAllFaces(
          image,
          new faceapi.TinyFaceDetectorOptions()
        );
        detections.push(detection);
      })
    );

    processResult();
  } catch (error) {
    console.log(error);
  }
};

const processResult = () => {
  let result = 0;

  console.log('Processing Detection');

  for (const detection of detections) {
    console.log(detection);
    if (detection.length === 1) {
      console.log(detection[0]);
      result += detection[0].score;
    } else if (detection.length > 1 || detection.length === 0) {
      result = 0;
      break;
    }
  }

  console.log(result);

  if (result >= detectionThreshold) {
    offWebCam();
    store.dispatch(setDetectionResult({ images: imagesArray, result }));
  } else {
    store.dispatch(
      setDetectionResult({ images: [], statusText: 'retry', result })
    );
  }
  imagesArray = [];
  detections = [];
};

const captureImageFromWebcam = async () => {
  try {
    const { localStream } = store.getState().join;
    const cloneStream = localStream.clone();

    const videoElement = document.createElement('video');
    videoElement.style.display = 'none';
    document.body.appendChild(videoElement);
    videoElement.srcObject = cloneStream;
    videoElement.autoplay = true;
    videoElement.width = 584;
    videoElement.height = 485;

    // Wait for the video to be ready to avoid capturing blank frames
    await new Promise((resolve) => {
      videoElement.onloadeddata = resolve;
    });

    // Create a canvas element
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    const context = canvas.getContext('2d');
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    const imageBlob = await new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/png');
    });

    document.body.removeChild(videoElement);
    cloneStream.getTracks().forEach((track) => track.stop());

    return imageBlob;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const captureTenImages = async () => {
  const capturePromises = [];
  for (let i = 0; i < numberOfImages; i++) {
    const capturePromise = new Promise(async (resolve, reject) => {
      try {
        const pic = await captureImageFromWebcam();
        resolve(pic);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
    capturePromises.push(capturePromise);
  }
  try {
    return await Promise.all(capturePromises);
  } catch (error) {
    console.error('Error while capturing images', error);
    throw error;
  }
};
