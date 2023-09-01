import React, { createContext, useEffect } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutHandler } from '../utils/util';
import { joinClassroomHandler } from '../realTimeCommunication/classroom/joinClassroomHandler';
import { classroomScheduleMessageHandle } from '../realTimeCommunication/classroom/classroom/classroomScheduleMessageHandle';
import {
  useFetchClassroomsQuery,
  setClassrooms,
  setStudents,
  store,
  setMessages,
} from '../store';

const userDetails = JSON.parse(localStorage.getItem('user'));
let socket;
if (userDetails) {
  socket = io('http://localhost:6001', {
    auth: {
      token: userDetails.token,
    },
  });
}

const RealtimeContext = createContext();

const RealtimeProvider = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { accountType } = store.getState().account;
  const { data, isSuccess } = useFetchClassroomsQuery(accountType);

  const connectWithSocketServer = () => {
    socket.on('connect', () => {
      console.log('successfully connected with socket.io server');
      console.log(socket.id);
    });
    socket.on('online-users', (value) => {
      console.log(value);
    });
    socket.on('connect_error', (err) => {
      console.log(err instanceof Error);
      console.log(err.message);
      console.log(err.data);
    });
    socket.on('update-classroom-members', (value) => {
      joinClassroomHandler(value, navigate);
    });
    socket.on('send-classroom', (value) => {
      store.dispatch(setStudents(value.students));
      store.dispatch(setMessages(value.messages));
    });
    socket.on('classroom-schedule-message', (value) => {
      console.log('received classroom schedule message event');
      classroomScheduleMessageHandle(value, navigate);
    });
  };

  useEffect(() => {
    if (!userDetails) {
      logoutHandler();
    }
    if (isSuccess) {
      dispatch(setClassrooms(data.classrooms));
    }
    connectWithSocketServer();
  }, [data, isSuccess]);

  const values = {
    socket,
  };

  return (
    <RealtimeContext.Provider value={values}>
      {children}
    </RealtimeContext.Provider>
  );
};

export { RealtimeProvider };
export default RealtimeContext;
