import React from 'react';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { formatCustomDateTime, formatDateTime } from '../../../utils/dateTime';
import { useSelector } from 'react-redux';

const ExamSessionScheduleMessage = ({ message }) => {
  const { accountType } = useSelector((state) => state.account);
  const beginExam = () => {
    const sessionId = message.examSession._id;
    localStorage.setItem('examSessionId', sessionId);
    window.account.openExamSessionWindow('openExamSessionWindow');
  };
  const monitorStudents = () => {
    const sessionId = message.examSession._id;
    localStorage.setItem('examSessionId', sessionId);
    window.account.openMonitorWindow('openMonitorWindow');
  };
  return (
    <div className="bg-gray-300 transition duration-350 ease-in-out mx-2 rounded-lg rounded-bl-none">
      <div className="flex items-center pl-3 ">
        <p className="text-base leading-6 font-medium mr-2 text-green-800">
          {message.sender.firstName} {message.sender.lastName}
        </p>

        <p className="text-xs leading-6 font-medium text-green-800">
          {formatDateTime(message.timestamp)}
        </p>
      </div>

      <div className="pl-3 pb-1">
        <p className="text-base width-auto font-medium text-green-800 flex-shrink">
          {message.examSession.description}
        </p>
      </div>
      <div
        id="alert-additional-content-3"
        className="p-2 rounded-s-none rounded-tr-none text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
        role="alert"
      >
        <div className="flex justify-between">
          <div className="flex">
            <MdOutlineCalendarMonth className="text-green-800 text-4xl mr-5" />
            <div className="flex flex-col">
              <p className="font-bold">{message.examSession.title}</p>
              <p className="text-xs">
                {formatCustomDateTime(message.examSession.startDate)}
              </p>
            </div>
          </div>
          {accountType === 'student' ? (
            <button
              type="button"
              onClick={beginExam}
              className="text-green-800 bg-transparent border border-green-800 hover:bg-green-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-green-600 dark:border-green-600 dark:text-green-400 dark:hover:text-white dark:focus:ring-green-800"
            >
              Start Exam
            </button>
          ) : (
            ''
          )}
          {accountType === 'tutor' ? (
            <button
              type="button"
              onClick={monitorStudents}
              className="text-green-800 bg-transparent border border-green-800 hover:bg-green-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-green-600 dark:border-green-600 dark:text-green-400 dark:hover:text-white dark:focus:ring-green-800"
            >
              Monitor Exam
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamSessionScheduleMessage;
