import { addMessage, store } from '../../../store';
export const classroomScheduleMessageHandle = (data, navigate) => {
  console.log(data);
  const { classrooms, classroomId } = store.getState().classroom;
  const { accountType } = store.getState().account;

  const foundClassroom = classrooms.find(
    (classR) => classR._id.toString() === data.classroomId.toString()
  );
  console.log(classrooms);
  console.log(foundClassroom);
  console.log(accountType);
  if (foundClassroom && accountType === 'student') {
    if (classroomId === data.classroomId.toString()) {
      store.dispatch(addMessage(data.message));
    }
    const notification = new window.Notification(
      `New Scheduled Class Session in ${foundClassroom.name}`,
      {
        body: `@${data.message.stateDate}`,
      }
    );
    notification.onclick = () => {
      navigate(`/${classroomId.toString()}`);
    };
  }
};
