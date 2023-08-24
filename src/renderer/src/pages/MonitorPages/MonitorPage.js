import React, { useContext } from 'react';

import SessionCard from '../../components/Monitor/SessionCard';
import MonitorSideBar from '../../components/Monitor/MonitorSideBar';
// import "./Video.css";
const MonitorPage = ({ setShowCode }) => {
  // create 10 session card
  const sessionCards = Array.from(Array(25).keys()).map((i) => (
    <SessionCard key={i} />
  ));

  return (
    <>
      <MonitorSideBar />
      <div className="relative w-screen h-screen">
        <div className="overflow-y-auto overscroll-contain h-full w-full">
          <div className="ml-72">
            <div className="p-4 border-gray-200  rounded-lg dark:border-gray-700 mt-14">
              <div className="grid grid-cols-4 gap-1 h-0">{sessionCards}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MonitorPage;
