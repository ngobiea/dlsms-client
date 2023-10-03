// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { baseUrl } from '../../utils/url';
// const chatApi = createApi({
//   reducerPath: 'chatApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl,
//     prepareHeaders: (header) => {
//       const cookie = localStorage.getItem('user');
//       const token = JSON.parse(cookie).token;
//       if (token) {
//         header.set('authorization', `Bearer ${token}`);
//       }
//       return header;
//     },
//   }),
// });
