import { store, addMessage } from '../../store';

export const postAssignmentMessageHandler = (data, navigate) => {
  const { message } = data;
  const { assignment } = message;
  const { title } = assignment;

  const { classrooms, classroomId } = store.getState().classroom;

  const foundClassroom = classrooms.find(
    (classR) => classR._id.toString() === data.classroomId.toString()
  );
  if (foundClassroom) {
    if (classroomId === data.classroomId.toString()) {
      store.dispatch(addMessage(message));
    }
    const notification = new window.Notification(
      `New Assignment in ${foundClassroom.name}`,
      {
        body: `${title}`,
      }
    );
    notification.onclick = () => {
      navigate(`/${classroomId.toString()}`);
    };
  }
};
