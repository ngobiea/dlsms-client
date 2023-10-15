import { createSlice } from '@reduxjs/toolkit';

const joinSlice = createSlice({
  name: 'join',
  initialState: {
    localStream: null,
    webcams: [],
    defaultWebcam: null,
    webcamStatus: false,
    progress: 0,
    captureImages: [],
    result: -1,
    buttonText: 'verify',
    detectionThreshold: 7.5,
  },
  reducers: {
    setLocalStream(state, action) {
      state.localStream = action.payload;

      if (!action.payload) {
        state.webcamStatus = false;
        state.buttonText = 'verify';
      }
    },
    setWebcams(state, action) {
      const webcams = action.payload.filter(
        (device) => device.kind === 'videoinput'
      );
      state.webcams = webcams;
      state.defaultWebcam = webcams[0];
    },
    setDefaultWebcam(state, action) {
      state.defaultWebcam = action.payload;
    },
    resetJoin(state, _action) {
      state.localStream = null;
      state.webcams = [];
      state.defaultWebcam = null;
      state.webcamStatus = false;
      state.progress = 0;
      state.captureImages = [];
      state.result = -1;
      state.buttonText = 'verify';
    },
    setWebcamStatus(state, action) {
      state.webcamStatus = action.payload;
      if (action.payload) {
        state.result = -1;
        state.progress = 0;
        state.captureImages = [];
      }
    },
    setProgress(state, action) {
      state.progress = action.payload;
    },
    addCaptureImage(state, action) {
      state.captureImages.push(action.payload);
    },
    setCaptureImages(state, action) {
      const { images, result } = action.payload;
      state.captureImages = images;
      state.result = result;
    },
    setDetectionResult(state, action) {
      const { images, result } = action.payload;
      state.result = result;

      if (result >= state.detectionThreshold) {
        state.captureImages = images;
      } else if (result < state.detectionThreshold) {
        state.buttonText = 'Retry';
        state.progress = 0;
      }
      console.log(state.captureImages);
    },
    setJoinButtonText(state, action) {
      state.buttonText = action.payload;
    },
  },
});

export const {
  setLocalStream,
  setWebcams,
  setDefaultWebcam,
  resetJoin,
  setWebcamStatus,
  setProgress,
  addCaptureImage,
  setCaptureImages,
  setDetectionResult,
  setJoinButtonText,
} = joinSlice.actions;
export const joinReducer = joinSlice.reducer;
