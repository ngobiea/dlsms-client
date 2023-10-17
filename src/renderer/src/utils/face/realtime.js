import { store } from '../../store';
import { ipcRenderer } from 'electron';
import { socket } from '../../context/realtimeContext';
import * as faceapi from '@vladmandic/face-api';

const examSessionId = localStorage.getItem('examSessionId');
let camera;
export const loadModels = async () => {
  const accountType = store.getState().account.accountType;
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

export const realTimeRecognition = async () => {
  const { localVideoStream } = store.getState().session;
  if (localVideoStream) {
    const labeledFaceDescriptors = await getLabeledFaceDescriptors();
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);
    camera = new ImageCapture(localVideoStream.getVideoTracks()[0]);
    const pic = await takePhoto(camera.track);
    const image = await faceapi.bufferToImage(pic);
    const detections = await faceapi
      .detectAllFaces(image)
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
    if (results.length === 0) {
      socket.emit('violation', {
        examSessionId,
        violation: {
          title: 'No face',
          description: 'No face detected',
          time: new Date(),
        },
      });
    } else if (results.length === 1) {
      if (results[0].label !== store.getState().account.user.email) {
        socket.emit('violation', {
          examSessionId,
          violation: {
            title: 'Not recognized',
            description: 'Face not recognized',
            time: new Date(),
          },
        });
      } else if (results.length > 1) {
        socket.emit('violation', {
          examSessionId,
          violation: {
            title: 'Multiple faces',
            description: 'More than one face detected',
            time: new Date(),
          },
        });
      }
    }
  }
  try {
  } catch (error) {
    console.log('Error occur while processing recognition', error);
  }
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
