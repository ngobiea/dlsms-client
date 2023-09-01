import { createSlice } from '@reduxjs/toolkit';
import { params } from '../../utils/mediasoup/params';
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
    isJoinedSession: false,
    isProducer: false,
    isDeviceSet: false,
    defaultAudioInputDevice: null,
    defaultAudioOutputDevice: null,
    defaultVideoOutputDevice: null,
    localStream: null,
    remoteStream: null,
    audioParams: null,
    remoteStreams: [],
    audioInputDevices: [],
    audioOutputDevices: [],
    videoOutputDevices: [],
    consumerTransports: [],
    videoParams: { params },
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
    setDevices(state, action) {
      const audioInputDevices = action.payload.filter(
        (device) => device.kind === 'audioinput'
      );
      const audioOutputDevices = action.payload.filter(
        (device) => device.kind === 'audiooutput'
      );
      const videoOutputDevices = action.payload.filter(
        (device) => device.kind === 'videoinput'
      );
      state.audioInputDevices = audioInputDevices;
      state.audioOutputDevices = audioOutputDevices;
      state.videoOutputDevices = videoOutputDevices;
      state.defaultAudioInputDevice = audioInputDevices[0];
      state.defaultAudioOutputDevice = audioOutputDevices[0];
      state.defaultVideoOutputDevice = videoOutputDevices[0];
    },
    setDefaultAudioInputDevice(state, action) {
      state.defaultAudioInputDevice = action.payload;
    },
    setDefaultAudioOutputDevice(state, action) {
      state.defaultAudioOutputDevice = action.payload;
    },
    setDefaultVideoOutputDevice(state, action) {
      state.defaultVideoOutputDevice = action.payload;
    },
    setLocalStream(state, action) {
      state.localStream = action.payload;
    },
    addRemoteStream(state, action) {
      state.remoteStreams.push(action.payload);
    },
    setMediaStreams(state, action) {
      state.audioParams = {
        ...state.audioParams,
        track: action.payload.getAudioTracks()[0],
      };
      state.videoParams = {
        ...state.videoParams,
        track: action.payload.getVideoTracks()[0],
      };
    },
    setRemoteSteam(state, action) {
      state.remoteStream = action.payload;
    },
    setIsProducer(state, action) {
      state.isProducer = action.payload;
    },
    addConsumerTransports(state, action) {
      state.consumerTransports.push(action.payload);
    },
    setIsDeviceSet(state, action) {
      state.isDeviceSet = action.payload;
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
  setDefaultAudioInputDevice,
  setDefaultAudioOutputDevice,
  setDefaultVideoOutputDevice,
  setDevices,
  addRemoteStream,
  setMediaStreams,
  setRemoteSteam,
  setIsProducer,
  setIsDeviceSet,
} = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;
