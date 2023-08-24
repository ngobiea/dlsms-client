export const fetchClassroomsQuery = (accountType) => {
  return {
    url: `/${accountType}/classroom`,
    method: 'GET',
  };
};
