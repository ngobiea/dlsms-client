export const verifyClassroomCodeQuery = (classroomCode) => {
  return {
    url: `/student/verify`,
    method: 'POST',
    body: classroomCode,
  };
};
