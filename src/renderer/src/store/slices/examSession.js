import { createSlice } from '@reduxjs/toolkit';

const examSessionSlice = createSlice({
  name: 'examSession',
  initialState: {
    questions: [],
    mcq: {
      question: '',
      options: [],
    },
  },
});
