import React, { useEffect, useRef } from 'react';

import ClassSessionScheduleMessage from './ClassSessionScheduleMessage';
import ExamSessionScheduleMessage from './ExamSessionScheduleMessage';
import GeneralMessage from './GeneralMessage';
import SenderMessage from './SenderMessage';
import WelcomeMessage from './WelcomeMessage';
import { useSelector } from 'react-redux';
const ClassroomChatMessage = () => {
  const { messages } = useSelector((state) => state.chat);
  const messagesRef = useRef(null);
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, []);
  return (
    <>
      <div
        ref={messagesRef}
        className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
      >
        <WelcomeMessage />
        {messages.map((message) => {
          if (message.type === 'classSession') {
            return (
              <ClassSessionScheduleMessage
                key={message._id.toString()}
                message={message}
              />
            );
          } else if (message.type === 'examSessionSchedule') {
            return <ExamSessionScheduleMessage key={message._id.toString()} />;
          } else if (
            message.type === 'general' &&
            message.sender._id.toString() ===
              JSON.parse(localStorage.getItem('user'))._id.toString()
          ) {
            return (
              <SenderMessage message={message} key={message._id.toString()} />
            );
          } else if (message.type === 'general') {
            return (
              <GeneralMessage message={message} key={message._id.toString()} />
            );
          }
          return null;
        })}
      </div>
    </>
  );
};

export default ClassroomChatMessage;
