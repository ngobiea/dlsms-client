export const prepareHeaders = (header) => {
  const cookie = localStorage.getItem('user');
  const token = JSON.parse(cookie).token;
  if (token) {
    header.set('authorization', `Bearer ${token}`);
  }
  return header;
};
