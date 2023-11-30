import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './classroomApi/prepareHeaders';
import { baseUrl, localhost } from '../../utils/url';
const examSessionApi = createApi({
  reducerPath: 'examSessionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl || localhost,
    prepareHeaders,
  }),
  endpoints(builder) {
    return {
      postScheduleExamSession: builder.mutation({
        query: (schedule) => {
          return {
            url: '/tutor/exam-session',
            method: 'POST',
            body: schedule,
          };
        },
      }),
      deleteExamSession: builder.mutation({
        query: (examSessionId) => {
          return {
            url: `/tutor/exam-session/${examSessionId}`,
            method: 'DELETE',
          };
        },
      }),
      postExamQuestion: builder.mutation({
        query: ({ question, examSessionId }) => {
          return {
            url: `/tutor/exam-session/question/${examSessionId}`,
            method: 'POST',
            body: question,
          };
        },
      }),
      deleteExamQuestion: builder.mutation({
        query: ({ examSessionId, id }) => {
          return {
            url: `/tutor/exam-session/question/${examSessionId}?id=${id}`,
            method: 'DELETE',
          };
        },
      }),
      postSaveExamSession: builder.mutation({
        query: ({ examSessionId }) => {
          const formData = new FormData();
          console.log('examSessionId in api', examSessionId);
          formData.append('examSessionId', examSessionId);
          return {
            url: `/tutor/exam-session/save`,
            method: 'PATCH',
            body: { examSessionId },
          };
        },
      }),
   
      postSubmitAnswers: builder.mutation({
        query: (body) => {
          return {
            url: `/student/exam-session/submit`,
            method: 'POST',
            body,
          };
        },
      }),
      getQuestions: builder.query({
        query: (examSessionId) => {
          return {
            url: `/student/exam-session/questions/${examSessionId}`,
            method: 'GET',
          };
        },
      }),
    };
  },
});

export const {
  usePostScheduleExamSessionMutation,
  useDeleteExamSessionMutation,
  usePostExamQuestionMutation,
  useDeleteExamQuestionMutation,
  usePostSaveExamSessionMutation,
  useGetQuestionsQuery,
  usePostSubmitAnswersMutation,
} = examSessionApi;

export { examSessionApi };
