import React, { useEffect, useContext } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import ClassRoomSideBar from '../../components/classrooms/ClassRoomSideBar';
import ClassroomCode from '../../components/classrooms/ClassroomCode';
import ScheduleClassSession from '../../components/classrooms/ClassSession/ScheduleClassSession';
import RealtimeContext from '../../context/realtimeContext';
import './classroomPage.css';
import {
  useFetchClassroomQuery,
  setStudents,
  setTutor,
  setName,
  setCode,
  setDescription,
  setShowSchedule,
  setClassRoomId,
  setMessages,
} from '../../store';
import { useSelector, useDispatch } from 'react-redux';

const ClassRoomPage = () => {
  const { socket } = useContext(RealtimeContext);
  const dispatch = useDispatch();
  const params = useParams();
  const { classroomId } = params;

  const { accountType } = useSelector((state) => {
    return state.account;
  });

  const { data, isSuccess } = useFetchClassroomQuery({
    accountType,
    classroomId,
  });
  useEffect(() => {
    dispatch(setClassRoomId(classroomId));
    if (socket) {
      socket.emit('update-classroom', classroomId);
    }
  }, [socket]);

  useEffect(() => {
    if (isSuccess) {
      const { name, code, tutor, description, students, messages } =
        data.classroom;
      dispatch(setName(name));
      dispatch(setTutor(tutor));
      dispatch(setStudents(students));
      dispatch(setCode(code));
      dispatch(setDescription(description));
      dispatch(setMessages(messages));
      dispatch(setClassRoomId(classroomId));
    }
  }, [isSuccess]);
  const { isShowCode, isShowSchedule, isShowScheduleForm } = useSelector(
    (state) => {
      return state.modal;
    }
  );

  return (
    <div
      className="fixed inset-0 z-0 mt-10 ml-20 flex"
      onClick={() => {
        if (isShowSchedule) {
          dispatch(setShowSchedule(false));
        }
      }}
    >
      {isSuccess && <ClassRoomSideBar />}
      <Outlet />
      {isSuccess && isShowCode && <ClassroomCode />}
      {isShowScheduleForm && <ScheduleClassSession />}
    </div>
  );
};

export default ClassRoomPage;
