import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setJoinClassroom, setCreateClassroom } from '../../store';
import { MdOutlineGroupAdd } from 'react-icons/md';
const ClassroomNav = () => {
  const dispatch = useDispatch();
  const { accountType } = useSelector((state) => {
    return state.account;
  });

  return (
    <nav className="bg-gray-100 absolute w-full mr-20 border-b border-gray-200">
      <div className="flex flex-wrap items-center justify-between  p-4">
        <span className="self-center text-2xl font-semibold whitespace-nowrap ">
          ClassRooms
        </span>
        <div
          onClick={() => {
            if (accountType === 'tutor') {
              dispatch(setCreateClassroom(true));
            } else if (accountType === 'student') {
              dispatch(setJoinClassroom(true));
            }
          }}
          className="flex pr-20 cursor-pointer mr-3 box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);"
        >
          <button
            type="button"
            className="text-gray-900  bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 mr-2 mb-2"
          >
            <MdOutlineGroupAdd className="text-2xl mr-1" />
            {accountType === 'tutor' ? 'Create Classroom' : 'Join Classroom'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default ClassroomNav;
