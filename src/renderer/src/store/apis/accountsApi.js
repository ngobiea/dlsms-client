import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { baseUrl, localhost } from '../../utils/url';
const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl || localhost,
  }),
  endpoints(builder) {
    return {
      signupUser: builder.mutation({
        query: (user) => {
          return {
            method: 'POST',
            url: `/${user.accountType}/signup`,
            body: user,
          };
        },
      }),
      loginUser: builder.mutation({
        query: (user) => {
          return {
            method: 'POST',
            url: `/${user.accountType}/login`,
            body: user,
          };
        },
      }),
      resendEmailVerification: builder.mutation({
        query: (user) => {
          return {
            method: 'POST',
            url: `/resend-verification-code`,
            body: user,
          };
        },
      }),
    };
  },
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useResendEmailVerificationMutation,
} = accountApi;

export { accountApi };
