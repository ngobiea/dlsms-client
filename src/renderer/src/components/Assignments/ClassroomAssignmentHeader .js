import React from 'react';
import MiniClassRoomCard from '../classrooms/MiniClassRoomCard';
import { Link, NavLink } from 'react-router-dom';

const ClassroomAssignmentHeader = () => {
  const activeClass = 'text-lg text-green-900 border-b-2 border-green-800';
  const inActiveClass = 'text-lg text-green-900';
  function handleActive(navData) {
    return navData.isActive ? activeClass : inActiveClass;
  }
  return (
    <div className="flex  justify-between px-2 pt-3 pb-2 border-b-2 border-gray-200">
      <div className="relative flex items-center space-x-4">
        <MiniClassRoomCard title={'FC'} classes={'small'} />

        <NavLink to={''} className={handleActive} end>
          Assigned
        </NavLink>
        <NavLink to={'graded'} className={handleActive}>
          Graded
        </NavLink>
      </div>
      <Link to={'create'} className="mr-5 ">
        <div className="flex items-center justify-start">
          <div className="h-9 px-2 border-y border border-green-600  text-green-800 rounded hover:bg-gray-100 ">
            Crate Assignment
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ClassroomAssignmentHeader;
