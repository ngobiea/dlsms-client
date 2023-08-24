import React from 'react';
import ClassroomNav from '../../components/classrooms/ClassRoomNav';
import { useSelector } from 'react-redux';
import ClassRooms from '../../components/classrooms/Classrooms';
import CreateClassroomForm from '../../components/classrooms/CreateClassroomForm';
import JoinClassroomForm from '../../components/classrooms/JoinClassroomForm';
const ClassRoomsPage = () => {
  const { isCreateClassroom, isJoinClassroom } = useSelector((state) => {
    return state.modal;
  });

  return (
    <div className='relative pt-10 pl-20 h-screen overflow-hidden'>
      <ClassroomNav />
      {isCreateClassroom && <CreateClassroomForm />}
      {isJoinClassroom && <JoinClassroomForm />}
      <ClassRooms />
    </div>
  );
};

export default ClassRoomsPage;
