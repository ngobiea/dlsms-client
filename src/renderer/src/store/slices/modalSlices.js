import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isCreateClassroom: false,
    isCreateAssignment: false,
    isJoinClassroom: false,
    isShowCode: false,
    isShowSchedule: false,
    isShowScheduleForm: false,
  },
  reducers: {
    setCreateClassroom(state, action) {
      state.isCreateClassroom = action.payload;
    },
    setCreateAssignment(state, action) {
      state.isCreateAssignment = action.payload;
    },
    setJoinClassroom(state, action) {
      state.isJoinClassroom = action.payload;
    },
    setShowCode(state, action) {
      state.isShowCode = action.payload;
    },
    setShowSchedule(state, action) {
      state.isShowSchedule = action.payload;
    },
    setShowScheduleForm(state, action) {
      state.isShowScheduleForm = action.payload;
    }
  },
});

export const {
  setCreateAssignment,
  setCreateClassroom,
  setJoinClassroom,
  setShowCode,
  setShowSchedule,
  setShowScheduleForm,
} = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
