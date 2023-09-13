import { createSlice } from '@reduxjs/toolkit';
import { generateClassroomCode } from '../../utils/util';

const option1Id = generateClassroomCode();
const examSessionSlice = createSlice({
  name: 'examSession',
  initialState: {
    questions: [],
    correctOption: option1Id,
    examSessionId: '',
    isShowExamSession: false,
    step: 'setup',
    isShowExamConfirm: false,
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
} = examSessionSlice.actions;
export const examSessionReducer = examSessionSlice.reducer;
