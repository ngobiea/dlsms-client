import { store, setProgress, setDetectionResult } from '../../store';
import { offWebCam } from './webcam';
import * as faceapi from '@vladmandic/face-api';
const numberOfImages = 10;
const intervalTime = 1000;
const processTime = 11000;
const detectionThreshold = 0.75;

export class Detection {
  constructor() {
    this.detections = [];
    this.result = 0;
    this.imagesArray = [];
  }

  async loadModels() {
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
  }
  captureImages = async () => {
    const { localStream } = store.getState().join;
    await this.loadModels();

    let interval;
    try {
      interval = setInterval(async () => {
        const camera = new ImageCapture(localStream.getVideoTracks()[0]);
        const pic = await camera.takePhoto();
        this.imagesArray.push(pic);

        store.dispatch(setProgress(this.imagesArray.length * numberOfImages));
        const image = await faceapi.bufferToImage(pic);
        const detection = await faceapi.detectAllFaces(
          image,
          new faceapi.TinyFaceDetectorOptions()
        );
        console.log(detection);
        this.detections.push(detection);
        if (this.imagesArray.length >= numberOfImages) {
          clearInterval(interval);
        }
      }, intervalTime);
      setTimeout(() => {
        this.processDetection();
      }, processTime);
    } catch (error) {
      console.log(error);
    }
  };
  processDetection = () => {
    console.log('Processing Detection');
    this.detections.forEach((detection) => {
      if (detection.length === 1) {
        console.log(detection[0]);
        this.result += detection[0].score;
      }
    });
    console.log(this.result);

    store.dispatch(
      setDetectionResult({ images: this.imagesArray, result: this.result })
    );
    if (this.result >= detectionThreshold) {
      offWebCam();
    }
    this.detections = [];
    this.result = 0;
    this.imagesArray = [];
  };
}
