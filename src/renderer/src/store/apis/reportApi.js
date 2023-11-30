import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './classroomApi/prepareHeaders';
import { baseUrl, localhost } from '../../utils/url';

const reportApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl || localhost,
    prepareHeaders,
  }),
  endpoints(builder) {
    return {
      getClassSessions: builder.query({
        query: (classroomId) => {
          return {
            url: `/class-sessions/${classroomId}`,
            method: 'GET',
          };
        },
      }),
      getExamSessions: builder.query({
        query: (classroomId) => {
          return {
            url: `/exam-sessions/${classroomId}`,
            method: 'GET',
          };
        },
      }),
      getESStudents: builder.query({
        query: (examSessionId) => {
          return {
            url: `tutor/exam-session/students/${examSessionId}`,
            method: 'GET',
          };
        },
      }),
      getCSStudents: builder.query({
        query: (classSessionId) => {
          return {
            url: `tutor/class-session/students/${classSessionId}`,
            method: 'GET',
          };
        },
      }),
      getStudentES: builder.query({
        query: (studentId) => {
          return {
            url: `tutor/exam-session/student/${studentId}`,
            method: 'GET',
          };
        },
      }),
    };
  },
});

export const {
  useGetClassSessionsQuery,
  useGetExamSessionsQuery,
  useGetCSStudentsQuery,
  useGetESStudentsQuery,
  useGetStudentESQuery
} = reportApi;
export { reportApi };
