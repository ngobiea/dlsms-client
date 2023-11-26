import React from 'react';

import { Outlet } from 'react-router-dom';
const ExamSessionsPage = () => {
  return (
    <div className=" w-full h-full ">
      <Outlet />
    </div>
  );
};

export default ExamSessionsPage;
