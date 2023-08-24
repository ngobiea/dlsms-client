export const createClassroomQuery = ({ classroom, accountType }) => {
  return {
    url: `/${accountType}/classroom`,
    method: 'POST',
    body: classroom,
  };
};
