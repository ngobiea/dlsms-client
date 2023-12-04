import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './classroomApi/prepareHeaders';
import { baseUrl, localhost } from '../../utils/url';
const accountType = JSON.parse(localStorage.getItem('accountType'));

const assignmentApi = createApi({
  reducerPath: 'assignmentApi',
  tagTypes: ['assignment', 'assignmentSubmission'],
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl || localhost,
    prepareHeaders,
  }),
  endpoints(builder) {
    return {
      postAssignment: builder.mutation({
        query: ({ assignment, classroomId }) => {
          return {
            url: '/tutor/assignment/' + classroomId,
            method: 'POST',
            body: assignment,
          };
        },
      }),
      getAssignedAssignment: builder.query({
        query: ({ classroomId }) => {
          return {
            url: `/assigned/assignment/${classroomId}`,
            method: 'GET',
          };
        },
      }),
      getGradedAssignment: builder.query({
        query: ({ classroomId }) => {
          return {
            url: `/tutor/graded/assignment/${classroomId}`,
            method: 'GET',
          };
        },
      }),
      getSubmittedAssignments: builder.query({
        query: ({ classroomId }) => {
          return {
            url: `/student/assignment/submitted/${classroomId}`,
            method: 'GET',
          };
        },
      }),
      getAssignment: builder.query({
        providesTags: ['assignmentSubmission'],
        query: ({ assignmentId }) => {
          return {
            url: `/assignment/${assignmentId}`,
            method: 'GET',
          };
        },
      }),
      postSubmitAssignment: builder.mutation({
        invalidatesTags: ['assignmentSubmission'],
        query: ({ assignmentId, submission }) => {
          return {
            url: `/student/assignment/submit/${assignmentId}`,
            method: 'POST',
            body: submission,
          };
        },
      }),

      postGradeAssignment: builder.mutation({
        invalidatesTags: ['assignmentSubmission'],
        query: (body) => {
          return {
            url: `/tutor/assignment/grade`,
            method: 'POST',
            body,
          };
        },
      }),

      deleteAssignment: builder.mutation({
        query: ({ assignmentId, id }) => {
          return {
            url: `/tutor/assignment/question/${assignmentId}?id=${id}`,
            method: 'DELETE',
          };
        },
      }),

      updateAssignment: builder.mutation({
        query: ({ assignmentId }) => {
          const formData = new FormData();
          formData.append('assignmentId', assignmentId);
          return {
            url: `/tutor/assignment/save`,
            method: 'PATCH',
            body: { assignmentId },
          };
        },
      }),
    };
  },
});

export const {
  usePostAssignmentMutation,
  useGetAssignedAssignmentQuery,
  useGetGradedAssignmentQuery,
  useGetAssignmentQuery,
  usePostSubmitAssignmentMutation,
  usePostGradeAssignmentMutation,
  useGetSubmittedAssignmentsQuery,
} = assignmentApi;
export { assignmentApi };
