import { createSlice } from '@reduxjs/toolkit';
import {
  add15MinutesToEndTime,
  calculateDateDifference,
  isValidTimeRange,
} from '../../utils/dateTime';
const appSlice = createSlice({
  name: 'app',
  initialState: {
    isWebcamActive: false,
    verificationResult: -1,
    percentageCount: 5,
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    isValidTime: false,
    duration: '15m',
    files: [],
    isShowConfirmationModal: false,
    notification: {
      title: 'Success',
      message: '',
      type: 'success',
      isActive: false,
    },
    isOnline: true,
    socket: null,
    modelsPath: '',
    downloadProgress: 0,
  },
  reducers: {
    setIsWebcamActive(state, action) {
      state.isWebcamActive = action.payload;
    },
    setVerificationResult(state, action) {
      state.verificationResult = action.payload;
    },
    setPercentageCount(state, action) {
      state.percentageCount = action.payload;
    },
    setStartDate(state, action) {
      state.startDate = action.payload;
      state.endDate = add15MinutesToEndTime(
        new Date(action.payload)
      ).toISOString();
      state.duration = calculateDateDifference(
        new Date(action.payload),
        add15MinutesToEndTime(new Date(action.payload))
      );
      state.isValidTime = isValidTimeRange(
        new Date(action.payload),
        add15MinutesToEndTime(new Date(action.payload))
      );
    },
    setEndDate(state, action) {
      state.endDate = action.payload;
      state.duration = calculateDateDifference(
        new Date(state.startDate),
        new Date(action.payload)
      );
      state.isValidTime = isValidTimeRange(
        new Date(state.startDate),
        new Date(action.payload)
      );
    },
    addFile(state, action) {
      const updatedFiles = [...state.files, ...action.payload];
      state.files = updatedFiles;
    },
    removeFile(state, action) {
      const newFiles = state.files.filter((file) => {
        return file.id !== action.payload;
      });
      state.files = newFiles;
    },
    removeAllFiles(state, _action) {
      state.files = [];
    },
    setIsShowConfirmationModal(state, action) {
      state.isShowConfirmationModal = action.payload;
    },
    setNotification(state, action) {
      state.notification = action.payload;
    },
    setSocket(state, action) {
      state.socket = action.payload;
    },
    setMOdelsPath(state, action) {
      state.modelsPath = action.payload;
    },
    setOnlineStatus(state, action) {
      state.isOnline = action.payload;
    },
    setDownloadProgress(state, action) {
      state.downloadProgress = action.payload;
    },
  },
});
export const {
  setIsWebcamActive,
  setPercentageCount,
  setVerificationResult,
  setEndDate,
  setStartDate,
  addFile,
  removeFile,
  removeAllFiles,
  setIsShowConfirmationModal,
  setNotification,
  setSocket,
  setMOdelsPath,
  setOnlineStatus,
  setDownloadProgress,
} = appSlice.actions;
export const appReducer = appSlice.reducer;
