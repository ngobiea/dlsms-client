import React from 'react';
import { Outlet } from 'react-router-dom';
const ClassSessionsPage = () => {
  return (
    <div className=" w-full h-full ">
      <Outlet />
    </div>
  );
};

export default ClassSessionsPage;
