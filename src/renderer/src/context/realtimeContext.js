import React, { createContext, useEffect } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutHandler } from '../utils/util';
import { joinClassroomHandler } from '../realTimeCommunication/classroom/joinClassroomHandler';
import { classroomScheduleMessageHandle } from '../realTimeCommunication/classroom/classroomScheduleMessageHandle';
import { examScheduleMessage } from '../realTimeCommunication/classroom/examScheduleMessageHandler';
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
socket.on('connect', () => {
  console.log('successfully connected with socket.io server');
});
const RealtimeContext = createContext();

const RealtimeProvider = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { accountType } = store.getState().account;
  const { data, isSuccess } = useFetchClassroomsQuery(accountType);
  const connectWithSocketServer = () => {
    socket.on('online-users', (value) => {});
    socket.on('connect_error', (err) => {
      console.log(err instanceof Error);
      console.log(err.message);
      console.log(err.data);
    });
    socket.on('update-classroom-members', (value) => {
      joinClassroomHandler(value, navigate);
    });
    socket.on('send-classroom', (value) => {
      console.log(value);
      store.dispatch(setStudents(value.students));
      store.dispatch(setMessages(value.messages));
    });
    socket.on('classroom-schedule-message', (value) => {
      console.log('received class schedule message event');

      classroomScheduleMessageHandle(value, navigate);
    });
    socket.on('exam-schedule-message', (value) => {
      console.log('received exam schedule message event');
      examScheduleMessage(value, navigate);
    });
  };

  useEffect(() => {
    if (!userDetails) {
      logoutHandler();
    }
    if (isSuccess) {
      dispatch(setClassrooms(data.classrooms));
    }
  }, [data, isSuccess]);

  useEffect(() => {
    connectWithSocketServer();
  }, []);

  
  const values = {
    socket,
  };

  return (
    <RealtimeContext.Provider value={values}>
      {children}
    </RealtimeContext.Provider>
  );
};

export { RealtimeProvider, socket };
export default RealtimeContext;
