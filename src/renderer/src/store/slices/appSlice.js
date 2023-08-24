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
      console.log('setState Date')
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
  },
});
export const {
  setIsWebcamActive,
  setPercentageCount,
  setVerificationResult,
  setEndDate,
  setStartDate,
} = appSlice.actions;
export const appReducer = appSlice.reducer;
