import React, { createContext, useEffect } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutHandler } from '../utils/util';
import { joinClassroomHandler } from '../realTimeCommunication/classroom/joinClassroomHandler';
import { classroomScheduleMessageHandle } from '../realTimeCommunication/classroom/classroomScheduleMessageHandle';
import { examScheduleMessage } from '../realTimeCommunication/classroom/examScheduleMessageHandler';
import { postAssignmentMessageHandler } from '../realTimeCommunication/classroom/postAssignmentHandler';
import { baseUrl, localhost } from '../utils/url';
import {
  useFetchClassroomsQuery,
  setClassrooms,
  store,
  setOnlineStatus,
} from '../store';

const userDetails = JSON.parse(localStorage.getItem('user'));
let socket;
if (userDetails) {
  socket = io(baseUrl || localhost, {
    auth: {
      token: userDetails.token,
    },
  });
}
socket.on('connect', () => {
  console.log('successfully connected with socket.io server');
});
socket.on('connect_error', (err) => {
  console.log(err instanceof Error);
  console.log(err.message);
  console.log(err.data);
});

const RealtimeContext = createContext();

const RealtimeProvider = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { accountType } = store.getState().account;

  window.addEventListener('offline', () => {
    store.dispatch(setOnlineStatus(false));
    console.log('offline');
  });

  window.addEventListener('online', () => {
    store.dispatch(setOnlineStatus(true));
    console.log('online');
  });

  const { data, isSuccess } = useFetchClassroomsQuery(accountType);
  const connectWithSocketServer = () => {
    socket.on('update-classroom-members', (value) => {
      joinClassroomHandler(value, navigate);
    });

    socket.on('classroom-schedule-message', (value) => {
      console.log('received class schedule message event');
      classroomScheduleMessageHandle(value, navigate);
    });

    socket.on('exam-schedule-message', (value) => {
      console.log('received exam schedule message event');
      examScheduleMessage(value, navigate);
    });

    socket.on('assignment-post-message', (value) => {
      console.log('received assignment post message event');
      postAssignmentMessageHandler(value, navigate);
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
