import React from 'react';
import MiniClassRoomCard from '../classrooms/MiniClassRoomCard';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCapitalLetters } from '../../utils/util';
const accountType = JSON.parse(localStorage.getItem('accountType'));

const ClassroomAssignmentHeader = () => {
  const { name } = useSelector((state) => {
    return state.classroom;
  });
  const activeClass = 'text-lg text-green-900 border-b-2 border-green-800';
  const inActiveClass = 'text-lg text-green-900';
  function handleActive(navData) {
    return navData.isActive ? activeClass : inActiveClass;
  }
  return (
    <div className="flex  justify-between px-2 pt-3 pb-2 border-b-2 border-gray-200">
      <div className="relative flex items-center space-x-4">
        <MiniClassRoomCard title={getCapitalLetters(name)} classes={'small'} />

        <NavLink to={''} className={handleActive} end>
          Assigned
        </NavLink>
        {accountType === 'tutor' && (
          <NavLink to={'graded'} className={handleActive}>
            Graded
          </NavLink>
        )}

        {accountType === 'student' && (
          <NavLink to={'submitted'} className={handleActive}>
            Submitted
          </NavLink>
        )}
      </div>
      {accountType === 'tutor' && (
        <Link to={'create'} className="mr-5 ">
          <div className="flex items-center justify-start">
            <button
              type="button"
              className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              New Assignment
            </button>
          </div>
        </Link>
      )}
    </div>
  );
};

export default ClassroomAssignmentHeader;
