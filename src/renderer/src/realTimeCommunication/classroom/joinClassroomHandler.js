import { store, addStudent, addClassroom } from '../../store';

export const joinClassroomHandler = (value, navigate) => {
  const { classrooms } = store.getState().classroom;
  const { accountType } = store.getState().account;

  const userId = JSON.parse(localStorage.getItem('user')).userId;
  console.log(value);
  const { classroom, student } = value;

  const foundClassroom = classrooms.find(
    (classR) => classR._id.toString() === classroom._id
  );

  if (foundClassroom) {
    store.dispatch(addStudent(student));

    if (accountType === 'tutor') {
      const notification = new window.Notification(
        `New Student Join ${foundClassroom.name}`,
        {
          body: `${student.studentId} has join ${foundClassroom.name}`,
        }
      );
      notification.onclick = () => {
        navigate(`/${classroom._id.toString()}`);
      };
    }
  } else if (userId === student._id.toString()) {
    store.dispatch(addClassroom(classroom));
  }
};
