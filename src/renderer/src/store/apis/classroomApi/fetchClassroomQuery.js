export const fetchClassroomQuery = ({ accountType, classroomId }) => {
  return {
    url: `/${accountType}/classroom/${classroomId}`,
    method: 'GET',
  };
};
