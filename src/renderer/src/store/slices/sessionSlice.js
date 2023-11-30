import { createSlice } from '@reduxjs/toolkit';
import { params } from '../../utils/mediasoup/params';
const sessionSlice = createSlice({
  name: 'session',
  initialState: {
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
    cloneVideoStream: null,
    localScreenStream: null,
    localAudioStream: null,
    recordingStream: null,
    audioParams: {},
    remoteStreams: [],
    audioInputDevices: [],
    audioOutputDevices: [],
    videoOutputDevices: [],
    consumerTransports: [],
    videoParams: { params },
    screenShareParams: { params },
    activeStudentsInExamSession: [],
    peers: [],
    sessionViolations: [{}],
    screenId: null,
    isScreenShare: false,
    screenShareStream: null,
    recordButtonText: 'Start Recording',
    timer: '--:--',
    isModelsLoaded: false,
  },
  reducers: {
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
      state.isScreenShare = action.payload;
    },
    setIsRecording(state, action) {
      state.isRecording = action.payload;
      state.recordButtonText = action.payload
        ? 'Stop Recording'
        : 'Start Recording';
    },
    setTimer(state, action) {
      state.timer = action.payload;
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
        state.cloneVideoStream = action.payload.clone();
      } else {
        state.isVideoEnable = false;
      }
    },
    setScreenStream(state, action) {
      state.localScreenStream = action.payload;
      state.screenShareStream = action.payload;

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
    setIsProducer(state, action) {
      state.isProducer = action.payload;
    },

    setIsDeviceSet(state, action) {
      state.isDeviceSet = action.payload;
    },

    addStudentDetails(state, action) {
      state.activeStudentsInExamSession.push({ ...action.payload });
    },
    addPeers(state, action) {
      state.peers.push(action.payload);
    },

    addStudentStream(state, action) {
      const { id } = action.payload;
      state.activeStudentsInExamSession = state.activeStudentsInExamSession.map(
        (student) => {
          return student._id.toString() === id
            ? { ...student, ...action.payload }
            : student;
        }
      );
    },
    addPeerStream(state, action) {
      const { id, appData, screen } = action.payload;
      if (appData?.screen) {
        state.screenShareStream = screen;
        state.isScreenShare = true;
      } else {
        state.peers = state.peers.map((peer) => {
          return peer._id.toString() === id
            ? { ...peer, ...action.payload }
            : peer;
        });
      }
    },
    removeStudentFromActiveExamSession(state, action) {
      state.activeStudentsInExamSession =
        state.activeStudentsInExamSession.filter(
          (student) => student._id.toString() !== action.payload
        );
    },
    removePeer(state, action) {
      state.peers = state.peers.filter(
        (peer) => peer._id.toString() !== action.payload
      );
    },
    addStudentViolation(state, action) {
      const { id } = action.payload;
      // student violation is an array of objects
      state.activeStudentsInExamSession = state.activeStudentsInExamSession.map(
        (student) => {
          return student._id.toString() === id
            ? {
                ...student,
                violations: [...student.violations, action.payload],
              }
            : student;
        }
      );
      state.sessionViolations = [action.payload, ...state.sessionViolations];
    },
    setSessionViolations(state, action) {
      state.sessionViolations = action.payload;
    },

    setRecordingStream(state, action) {
      state.recordingStream = action.payload;
    },

    setScreenId(state, action) {
      state.screenId = action.payload;
    },
    setPeerScreenStream(state, action) {
      const foundPeer = state.peers.find(
        (peer) => peer._id.toString() === action.payload
      );
      if (foundPeer) {
        state.screenShareStream = foundPeer.screen;
        state.isScreenShare = true;
      }
    },
    disablePeerScreenStream(state) {
      console.log(state.screenShareStream);
      state.isScreenShare = false;
      state.screenShareStream = null;
    },
    setModelsLoaded(state, action) {
      state.isModelsLoaded = action.payload;
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
  addStudentDetails,
  removeStudentFromActiveExamSession,
  addStudentStream,
  addStudentViolation,
  setSessionViolations,
  setRecordingStream,
  setScreenId,
  addPeerStream,
  addPeers,
  removePeer,
  setPeerScreenStream,
  disablePeerScreenStream,
  setTimer,
  setModelsLoaded,
} = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;
