import { store, setStudents, addClassroom } from '../../store';

export const joinClassroomHandler = (value, navigate) => {
  const { classroomId, classrooms } = store.getState().classroom;
  const { accountType } = store.getState().account;

  const userId = JSON.parse(localStorage.getItem('user')).userId;

  const { classroom, students, studentId } = value;

  const foundClassroom = classrooms.find(
    (classR) => classR._id.toString() === classroom._id.toString()
  );

  if (foundClassroom) {
    if (classroomId === classroom._id.toString()) {
      store.dispatch(setStudents(students));
    }
    if (accountType === 'tutor') {
      const notification = new window.Notification(
        `New Student Join ${classroom.name}`,
        {
          body: `${studentId} has join ${classroom.name}`,
        }
      );
      notification.onclick = () => {
        navigate(`/${classroom._id.toString()}`);
      };
    }
  } else {
    if (userId === studentId) {
      store.dispatch(addClassroom(classroom));

      const notification = new window.Notification(
        `Successfully joined ${classroom.name}`,
        {
          body: `Welcome to ${classroom.name}`,
        }
      );
      notification.onclick = () => {
        console.log('first');
      };
    }
  }
};
