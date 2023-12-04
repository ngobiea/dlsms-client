import React from 'react';
import { Outlet } from 'react-router-dom';
import ClassroomAssignmentHeader from '../../../components/Assignments/ClassroomAssignmentHeader ';
import { useSelector } from 'react-redux';
import GradeAssignmentForm from '../../../components/Assignments/GradeAssignmentForm';
const ClassroomAssignmentRoot = () => {
  const { submissionId } = useSelector((state) => {
    return state.assignment;
  });

  return (
    <div className="flex-1 flex flex-col h-screen w-5/6  mb-20">
      <ClassroomAssignmentHeader />
      <Outlet />
      {submissionId && <GradeAssignmentForm />}
    </div>
  );
};

export default ClassroomAssignmentRoot;
