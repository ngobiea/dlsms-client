import React from 'react';
import { Outlet } from 'react-router-dom';
import ClassroomAssignmentHeader from '../../../components/Assignments/AssignmentHeader';
const ClassRootAssignment = () => {
  return (
    <div className="flex-1 flex flex-col h-screen mr-20 mb-20">
      <ClassroomAssignmentHeader />
      <Outlet />
    </div>
  );
};

export default ClassRootAssignment;
