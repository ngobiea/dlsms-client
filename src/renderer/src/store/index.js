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
  setMOdelsPath,
  setOnlineStatus,
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
  addPeerStream,
  addPeers,
  removePeer,
  disablePeerScreenStream,
  setPeerScreenStream,
  setTimer,
  setModelsLoaded,
} from './slices/sessionSlice';

import {
  examSessionReducer,
  setCorrectOption,
  addQuestion,
  removeQuestion,
  setShowExamSession,
  setIsShowExamConfirm,
  setExamSessionIdStep,
  setStudentCorrectOption,
  setQuestions,
  setExamSessionId,
} from './slices/examSessionSlice';

import {
  joinReducer,
  setDefaultWebcam,
  setLocalStream,
  setWebcams,
  resetJoin,
  addCaptureImage,
  setCaptureImages,
  setProgress,
  setDetectionResult,
  setJoinButtonText,
  setStudentImages,
  setRecognitionResult,
} from './slices/join';

import {
  assignmentReducer,
  setAssignedAssignment,
  addAssignedAssignment,
  setGradedAssignment,
  addGradedAssignment,
  setSubmittedAssignment,
  addSubmittedAssignment,
  setSubmissionId,
} from './slices/assignmentSlice';

import { accountApi } from './apis/accountsApi';
import { classroomApi } from './apis/classroomsApi';
import { examSessionApi } from './apis/examSessionApi';
import { reportApi } from './apis/reportApi';
import { assignmentApi } from './apis/assignmentApi';

const store = configureStore({
  reducer: {
    modal: modalReducer,
    account: accountReducer,
    classroom: classroomReducer,
    assignment: assignmentReducer,
    app: appReducer,
    session: sessionReducer,
    chat: chatReducer,
    examSession: examSessionReducer,

    join: joinReducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [classroomApi.reducerPath]: classroomApi.reducer,
    [examSessionApi.reducerPath]: examSessionApi.reducer,
    [reportApi.reducerPath]: reportApi.reducer,
    [assignmentApi.reducerPath]: assignmentApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
      .concat(accountApi.middleware)
      .concat(classroomApi.middleware)
      .concat(examSessionApi.middleware)
      .concat(reportApi.middleware)
      .concat(assignmentApi.middleware);
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
  setMOdelsPath,
  setOnlineStatus,

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
  addPeerStream,
  addPeers,
  removePeer,
  disablePeerScreenStream,
  setPeerScreenStream,
  setTimer,
  setModelsLoaded,

  //examSession slice
  setCorrectOption,
  addQuestion,
  removeQuestion,
  setShowExamSession,
  setIsShowExamConfirm,
  setExamSessionIdStep,
  setStudentCorrectOption,
  setQuestions,
  setExamSessionId,

  //join slice
  setDefaultWebcam,
  setLocalStream,
  setWebcams,
  resetJoin,
  addCaptureImage,
  setCaptureImages,
  setProgress,
  setDetectionResult,
  setJoinButtonText,
  setStudentImages,
  setRecognitionResult,

  //assignment slice
  setAssignedAssignment,
  addAssignedAssignment,
  setGradedAssignment,
  addGradedAssignment,
  setSubmittedAssignment,
  addSubmittedAssignment,
  setSubmissionId,
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
  useGetQuestionsQuery,
  usePostSubmitAnswersMutation,
  useGetStudentAnswersQuery,
  usePostGradeStudentMutation,
} from './apis/examSessionApi';

// Report Apis
export {
  useGetClassSessionsQuery,
  useGetExamSessionsQuery,
  useGetCSStudentsQuery,
  useGetESStudentsQuery,
  useGetStudentESQuery,
} from './apis/reportApi';

// Assignment Apis
export {
  usePostAssignmentMutation,
  useGetAssignedAssignmentQuery,
  useGetGradedAssignmentQuery,
  useGetAssignmentQuery,
  usePostSubmitAssignmentMutation,
  usePostGradeAssignmentMutation,
  useGetSubmittedAssignmentsQuery,
} from './apis/assignmentApi';
