import { addMessage, store } from '../../store';
import { formatDateTime } from '../../utils/dateTime';

export const examScheduleMessage = (data, navigate) => {
  const { classrooms, classroomId } = store.getState().classroom;

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
        body: `@${formatDateTime(data.message.startDate)}`,
      }
    );
    notification.onclick = () => {
      navigate(`/${classroomId.toString()}`);
    };
  }
};
