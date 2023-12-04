import React from 'react';
import GradeExamForm from '../../../pages/SessionPages/ExamSession/GradeExamForm';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ExamSessionsPage = () => {
  const { examSessionId } = useSelector((state) => state.examSession);
  return (
    <div className="w-5/6  h-full ">
      <Outlet />
      {examSessionId && <GradeExamForm />}
    </div>
  );
};

export default ExamSessionsPage;
