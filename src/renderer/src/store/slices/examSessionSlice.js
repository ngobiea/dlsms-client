import { createSlice } from '@reduxjs/toolkit';
import { generateClassroomCode } from '../../utils/util';

const option1Id = generateClassroomCode();
const examSessionSlice = createSlice({
  name: 'examSession',
  initialState: {
    questions: [],
    mcqQuestions: [],
    correctOption: option1Id,
    examSessionId: localStorage.getItem('examSessionId') || '',
    isShowExamSession: false,
    step: 'setup',
    isShowExamConfirm: false,
    examSessionId: '',
  },
  reducers: {
    setCorrectOption(state, action) {
      state.correctOption = action.payload;
    },
    addQuestion(state, action) {
      if (
        state.questions.length !== 0 &&
        (state.questions[state.questions.length - 1].type === 'mcqForm' ||
          state.questions[state.questions.length - 1].type === 'sqForm' ||
          state.questions[state.questions.length - 1].type === 'lqForm')
      ) {
        state.questions.pop();
      }
      state.questions.push(action.payload);
    },
    removeQuestion(state, action) {
      const updatedQuestions = state.questions.filter((question) => {
        return question.id !== action.payload;
      });
      state.questions = updatedQuestions;
    },
    setShowExamSession(state, action) {
      state.isShowExamSession = action.payload;
    },
    setIsShowExamConfirm(state, action) {
      state.isShowExamConfirm = action.payload;
    },
    setExamSessionIdStep(state, action) {
      const { examSessionId, step } = action.payload;
      state.examSessionId = examSessionId;
      state.step = step;
    },
    removeAllQuestions(state, _action) {
      state.questions = [];
    },
    setStudentCorrectOption(state, action) {
      const { questionId, optionId } = action.payload;
      state.questions = state.questions.map((question) => {
        if (question._id === questionId) {
          question.correctOption = optionId;
        }
        return question;
      });
      state.mcqQuestions = state.mcqQuestions.map((question) => {
        if (question._id === questionId) {
          question.correctOption = optionId;
        }
        return question;
      });
    },
    setQuestions(state, action) {
      state.questions = action.payload;
      state.mcqQuestions = action.payload.filter(
        (question) => question.type === 'mcq'
      );
    },
    setExamSessionId(state, action) {
      state.examSessionId = action.payload;
    }
  },
});

export const {
  setCorrectOption,
  addQuestion,
  removeQuestion,
  setIsShowExamConfirm,
  setShowExamSession,
  setExamSessionIdStep,
  removeAllQuestions,
  setStudentCorrectOption,
  setQuestions,
  setExamSessionId,
} = examSessionSlice.actions;
export const examSessionReducer = examSessionSlice.reducer;
