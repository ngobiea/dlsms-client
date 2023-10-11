import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import {
  accountReducer,
  changeAccountType,
  changeEmail,
  login,
  logout,
  setUsers,
} from './slices/accountsSlice';

import {
  modalReducer,
  setCreateAssignment,
  setCreateClassroom,
  setJoinClassroom,
  setShowCode,
  setShowSchedule,
  setShowScheduleForm,
} from './slices/modalSlices';

import {
  classroomReducer,
  setClassRoomId,
  setName,
  setDescription,
  setCode,
  setStudents,
  addStudent,
  setClassrooms,
  addClassroom,
  setTutor,
} from './slices/classroomSlice';

import { assignmentReducer } from './slices/assignmentSlice';

import {
  appReducer,
  setIsWebcamActive,
  setVerificationResult,
  setPercentageCount,
  setEndDate,
  setStartDate,
  addFile,
  removeFile,
  removeAllFiles,
  setIsShowConfirmationModal,
  setNotification,
  setSocket,
} from './slices/appSlice';

import { chatReducer, addMessage, setMessages } from './slices/chatSlice';
import {
  sessionReducer,
  setMicEnable,
  setVideoEnable,
  setIsShowChat,
  setIsShowParticipants,
  setIsShareScreen,
  setIsRecording,
  setIsJoinedSession,
  setDevices,
  setDefaultAudioInputDevice,
  setDefaultAudioOutputDevice,
  setDefaultVideoOutputDevice,
  addRemoteStream,
  setLocalVideoStream,
  setRemoteSteam,
  setIsProducer,
  setIsDeviceSet,
  setScreenStream,
  setShareScreenStreams,
  setLocalAudioStream,
  setMicState,
  addStudentDetails,
  removeStudentFromActiveExamSession,
  addStudentStream,
  addStudentViolation,
  setSessionViolations,
  setRecordingStream,
  setScreenId,
} from './slices/sessionSlice';

import { mediasoupReducer } from './slices/mediasoupSlice';

import {
  examSessionReducer,
  setCorrectOption,
  addQuestion,
  removeQuestion,
  setShowExamSession,
  setIsShowExamConfirm,
  setExamSessionIdStep,
} from './slices/examSessionSlice';
import { accountApi } from './apis/accountsApi';
import { classroomApi } from './apis/classroomsApi';
import { examSessionApi } from './apis/examSessionApi';

const store = configureStore({
  reducer: {
    modal: modalReducer,
    account: accountReducer,
    classroom: classroomReducer,
    assignment: assignmentReducer,
    app: appReducer,
    session: sessionReducer,
    chat: chatReducer,
    mediasoup: mediasoupReducer,
    examSession: examSessionReducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [classroomApi.reducerPath]: classroomApi.reducer,
    [examSessionApi.reducerPath]: examSessionApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
      .concat(accountApi.middleware)
      .concat(classroomApi.middleware)
      .concat(examSessionApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
  store,
  // account slices
  changeAccountType,
  changeEmail,
  logout,
  login,
  setUsers,
  // modal slices
  setCreateAssignment,
  setCreateClassroom,
  setJoinClassroom,
  setShowCode,
  setShowSchedule,
  setShowScheduleForm,

  //app slices
  setIsWebcamActive,
  setVerificationResult,
  setPercentageCount,
  setEndDate,
  setStartDate,
  addFile,
  removeFile,
  removeAllFiles,
  setIsShowConfirmationModal,
  setNotification,
  setSocket,

  //classroom Slice
  setStudents,
  setTutor,
  setCode,
  setDescription,
  setName,
  setClassRoomId,
  addStudent,
  setClassrooms,
  addClassroom,

  //chat slice
  addMessage,
  setMessages,

  //session slice
  setMicEnable,
  setVideoEnable,
  setIsShowChat,
  setIsShowParticipants,
  setIsShareScreen,
  setIsRecording,
  setIsJoinedSession,
  setDevices,
  setDefaultAudioInputDevice,
  setDefaultAudioOutputDevice,
  setDefaultVideoOutputDevice,
  addRemoteStream,
  setLocalVideoStream,
  setRemoteSteam,
  setIsProducer,
  setIsDeviceSet,
  setScreenStream,
  setShareScreenStreams,
  setLocalAudioStream,
  setMicState,
  addStudentDetails,
  removeStudentFromActiveExamSession,
  addStudentStream,
  addStudentViolation,
  setSessionViolations,
  setRecordingStream,
  setScreenId,

  //examSession slice
  setCorrectOption,
  addQuestion,
  removeQuestion,
  setShowExamSession,
  setIsShowExamConfirm,
  setExamSessionIdStep,
};

// Account Apis
export {
  useLoginUserMutation,
  useSignupUserMutation,
  useResendEmailVerificationMutation,
} from './apis/accountsApi';

// Classroom Apis
export {
  useCreateClassroomMutation,
  useFetchClassroomsQuery,
  useFetchClassroomQuery,
  useVerifyClassroomCodeMutation,
  usePostJoinClassroomMutation,
  usePostScheduleClassSessionMutation,
  usePostJoinMutation,
} from './apis/classroomsApi';

// ExamSession Apis
export {
  usePostScheduleExamSessionMutation,
  useDeleteExamSessionMutation,
  usePostExamQuestionMutation,
  useDeleteExamQuestionMutation,
  usePostSaveExamSessionMutation,
} from './apis/examSessionApi';
