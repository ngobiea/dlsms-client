import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ClassroomChatHeader from '../../../components/classrooms/chat/ClassroomChatHeader';
import './classRoomChat.css';
import ChatInput from '../../../components/classrooms/chat/ChatInput';

const ClassroomChatRoot = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex-1 p-2 flex flex-col justify-between h-full">
      <ClassroomChatHeader show={show} setShow={setShow} />
      <Outlet />
      <ChatInput />
    </div>
  );
};

export default ClassroomChatRoot;
