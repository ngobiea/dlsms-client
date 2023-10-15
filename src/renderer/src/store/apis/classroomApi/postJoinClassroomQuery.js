export const postJoinClassroomQuery = (formData) => {
  return {
    url: '/student/join-classroom',
    method: 'POST',
    body: formData,
  };
};
