import { createSlice } from '@reduxjs/toolkit';

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    isMicEnable: false,
    isVideoEnable: false,
    isShowChat: false,
    isShowParticipants: false,
    isShareScreen: false,
    isRecording: false,
    activeBorder: '',
    isJoinedSession:false,
  },
  reducers: {
    setMicEnable(state, action) {
      state.isMicEnable = action.payload;
    },
    setVideoEnable(state, action) {
      state.isVideoEnable = action.payload;
    },
    setIsShowChat(state, action) {
      state.isShowChat = action.payload;
      if (action.payload) {
        state.activeBorder = 'chat';
        state.isShowParticipants = false;
      } else {
        state.activeBorder = '';
      }
    },
    setIsShowParticipants(state, action) {
      state.isShowParticipants = action.payload;
      if (action.payload) {
        state.activeBorder = 'participants';
        state.isShowChat = false;
      } else {
        state.activeBorder = '';
      }
    },
    setIsShareScreen(state, action) {
      state.isShareScreen = action.payload;
    },
    setIsRecording(state, action) {
      state.isRecording = action.payload;
    },
    setIsJoinedSession(state, action) {
      state.isJoinedSession = action.payload;
    },
  },
});

export const {
  setLocalStream,
  setMicEnable,
  setVideoEnable,
  setIsShowChat,
  setIsShowParticipants,
  setIsShareScreen,
  setIsRecording,
  setIsJoinedSession,
} = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;
