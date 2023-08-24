import React from 'react';
import { Outlet } from 'react-router-dom';
import ClassroomAssignmentHeader from '../../../components/Assignments/ClassroomAssignmentHeader ';
const ClassroomAssignmentRoot = () => {
  return (
    <div className="flex-1 flex flex-col h-screen mr-20 mb-20">
      <ClassroomAssignmentHeader />
      <Outlet />
    </div>
  );
};

export default ClassroomAssignmentRoot;
