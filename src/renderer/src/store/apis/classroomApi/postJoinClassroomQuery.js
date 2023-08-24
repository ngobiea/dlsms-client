export const postJoinClassroomQuery = ({ images, classroomId }) => {
  const formData = new FormData();
  formData.append('classroomId', classroomId);
  images.forEach((image) => {
    formData.append(`files`, image);
  });
  return {
    url: '/student/join-classroom',
    method: 'POST',
    body: formData,
  };
};
