import React from 'react';
import {
  MdGroups,
  MdArrowBack,
  MdOutlineAssignment,
  MdLink,
  MdOutlineHome,
} from 'react-icons/md';
import { RiChatPollLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setShowCode } from '../../store';
import exam from '../../../public/images/exam.png';
import classSession from '../../../public/images/webinar.png';
import { getCapitalLetters } from '../../utils/util';

import MiniClassRoomCard from './MiniClassRoomCard';

const ClassRoomSideBar = () => {
  const { name, tutor, students } = useSelector((state) => {
    return state.classroom;
  });
  const dispatch = useDispatch();
  return (
    <aside className="w-64" aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto border-r-2">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              to="/"
              className="flex items-center p-2 text-green-800 rounded-lg  hover:bg-gray-100"
            >
              <MdArrowBack />
              <span className="ml-3">All Classrooms</span>
            </Link>
          </li>
          <li>
            <MiniClassRoomCard
              title={getCapitalLetters(name)}
              classes={'medium'}
            />
          </li>

          <li>
            <Link
              to=""
              className="flex items-center p-2 text-green-800 rounded-lg dark:text-white"
            >
              <MdOutlineHome />
              <span className="flex-1 ml-3 whitespace-nowrap">{name}</span>
            </Link>
          </li>
          <li>
            <Link
              to={'assignment'}
              className="flex items-center p-2 text-green-800 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <MdOutlineAssignment className="text-green-800" />
              <span className="flex-1 ml-3 whitespace-nowrap">Assignments</span>
            </Link>
          </li>
          <li>
            <div
              onClick={() => {
                dispatch(setShowCode(true));
              }}
              className="flex items-center p-2 text-green-800 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <MdLink className="text-green-800" />
              <span className="flex-1 ml-3 whitespace-nowrap">
                Classroom Code
              </span>
            </div>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-green-800 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <img src={classSession} alt="classSession" className="w-6 h-6" />
              <span className="flex-1 ml-3 whitespace-nowrap">
                Class Sessions
              </span>
            </a>
          </li>
          <li>
            <div className="flex items-center p-2 text-green-800 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <img src={exam} alt="exam" className="w-6 h-6" />

              <span className="flex-1 ml-3 whitespace-nowrap">
                Exam Sessions
              </span>
            </div>
          </li>
          <li>
            <div
              href="#"
              className="flex items-center p-2 text-green-800 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <RiChatPollLine className="text-green-800" />
              <span className="flex-1 ml-3 whitespace-nowrap">
                Classroom polls
              </span>
            </div>
          </li>
        </ul>
        <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-green-800 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
            >
              <MdGroups className="flex-shrink-0 w-6 h-6 text-green-500 transition duration-75 dark:text-gray-400 group-hover:text-green-800 dark:group-hover:text-white" />
              <span className="ml-4 text-title">Members</span>
            </a>
            <p className="ml-3 py-1 text-title">
              <span className="inline-flex items-center justify-center w-3 h-3 p-3 mr-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                T
              </span>
              {`${tutor.firstName}  ${tutor.lastName}`}
            </p>
            {students.map((student) => {
              return (
                <p
                  key={student._id.toString()}
                  className="ml-3 py-1 text-title"
                >
                  <span className="inline-flex items-center justify-center w-3 h-3 p-3 mr-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    S
                  </span>
                  {`${student.firstName}  ${student.lastName}`}
                </p>
              );
            })}
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default ClassRoomSideBar;
