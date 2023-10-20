import { addMessage, store } from '../../store';



export const examScheduleMessage = (data, navigate) => {
  const { classrooms, classroomId } = store.getState().classroom;
  const { accountType } = store.getState().account;

  const foundClassroom = classrooms.find(
    (classR) => classR._id.toString() === data.classroomId.toString()
  );

  if (foundClassroom) {
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
