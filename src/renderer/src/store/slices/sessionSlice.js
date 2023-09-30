import { createSlice } from '@reduxjs/toolkit';
import { params } from '../../utils/mediasoup/params';
const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    isMicEnable: false,
    micState: 'disable',
    isVideoEnable: false,
    isShowChat: false,
    isShowParticipants: false,
    isScreenEnable: false,
    isRecording: false,
    activeBorder: '',
    isJoinedSession: false,
    isProducer: false,
    isDeviceSet: false,
    defaultAudioInputDevice: null,
    defaultAudioOutputDevice: null,
    defaultVideoOutputDevice: null,
    localVideoStream: null,
    localScreenStream: null,
    localAudioStream: null,
    remoteStream: null,
    audioParams: {},
    remoteStreams: [],
    audioInputDevices: [],
    audioOutputDevices: [],
    videoOutputDevices: [],
    consumerTransports: [],
    videoParams: { params },
    screenShareParams: { params },
    studentStreams: [],
    studentMedia: {
      transportId: null,
      remoteVideoStream: null,
      remoteAudioSteam: null,
      remoteScreenSteam: null,
    },
  },
  reducers: {
    setMicEnable(state, action) {
      state.isMicEnable = action.payload;
    },
    setMicState(state, action) {
      state.micState = action.payload;
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
      state.isScreenEnable = action.payload;
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
    setLocalVideoStream(state, action) {
      state.localVideoStream = action.payload;
      if (action.payload) {
        state.videoParams = {
          ...state.videoParams,
          track: action.payload.getVideoTracks()[0],
          appData: { video: true },
        };
        state.isVideoEnable = true;
      } else {
        state.isVideoEnable = false;
      }
    },
    setScreenStream(state, action) {
      state.localScreenStream = action.payload;
      if (action.payload) {
        state.screenShareParams = {
          ...state.screenShareParams,
          track: action.payload.getVideoTracks()[0],
          appData: { screen: true },
        };
        state.isScreenEnable = true;
      } else {
        state.isScreenEnable = false;
      }
    },
    setLocalAudioStream(state, action) {
      state.localAudioStream = action.payload;
      console.log(action.payload);
      if (action.payload) {
        state.audioParams = {
          ...state.audioParams,
          track: action.payload.getAudioTracks()[0],
          appData: { audio: true },
        };
        state.micState = 'enable';
      } else {
        state.micState = 'disable';
      }
    },
    addRemoteStream(state, action) {
      state.remoteStreams.push(action.payload);
    },
    setShareScreenStreams(state, action) {
      state.screenShareParams = {
        ...state.screenShareParams,
        track: action.payload.getVideoTracks()[0],
        appData: { screen: true },
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
    addStudentStreams(state, action) {
      state.studentStreams.push(action.payload);
    },
  },
});

export const {
  setLocalVideoStream,
  setMicEnable,
  setMicState,
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
  setRemoteSteam,
  setIsProducer,
  setIsDeviceSet,
  setScreenStream,
  setShareScreenStreams,
  setLocalAudioStream,
  addStudentStreams,
} = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;
