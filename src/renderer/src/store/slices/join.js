import { createSlice } from '@reduxjs/toolkit';

const joinSlice = createSlice({
  name: 'join',
  initialState: {
    localStream: null,
    cloneStream: null,
    webcams: [],
    defaultWebcam: null,
    progress: 0,
    captureImages: [],
    result: -1,
    buttonText: 'verify',
    detectionThreshold: 7.5,
    recognitionThreshold: 2,
    studentImages: [],
    recognitionResult: -1,
  },
  reducers: {
    setLocalStream(state, action) {
      state.localStream = action.payload;
      if (!action.payload) {
        state.buttonText = 'verify';
      } else {
        state.cloneStream = action.payload.clone();
        state.result = -1;
        state.recognitionResult = -1;
        state.progress = 0;
        state.captureImages = [];
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
      state.progress = 0;
      state.captureImages = [];
      state.result = -1;
      state.buttonText = 'verify';
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
      const { images, result, statusText } = action.payload;

      if (result < 0) {
        state.buttonText = 'verify';
      } else if (result < state.detectionThreshold) {
        state.buttonText = statusText;
      }
      state.result = result;
      state.captureImages = images;
    },
    setRecognitionResult(state, action) {
      const { result, statusText } = action.payload;
      if (result < 0) {
        state.buttonText = 'verify';
      } else if (result < state.recognitionThreshold) {
        state.buttonText = statusText;
      }
      state.recognitionResult = result;
    },
    setJoinButtonText(state, action) {
      state.buttonText = action.payload;
    },
    setStudentImages(state, action) {
      state.studentImages = action.payload;
    },
  },
});

export const {
  setLocalStream,
  setWebcams,
  setDefaultWebcam,
  resetJoin,
  setProgress,
  addCaptureImage,
  setCaptureImages,
  setDetectionResult,
  setJoinButtonText,
  setStudentImages,
  setRecognitionResult,
} = joinSlice.actions;
export const joinReducer = joinSlice.reducer;
