import React from 'react';
import { useSelector } from 'react-redux';
import SessionCard from '../../components/Monitor/SessionCard';
import MonitorSideBar from '../../components/Monitor/MonitorSideBar';
const MonitorPage = () => {
  const { studentStreams } = useSelector((state) => state.session);
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
              <div className="grid grid-cols-4 gap-1 h-0">
                {studentStreams.map((studentStream) => {
                  return (
                    <SessionCard
                      key={studentStream.user.id}
                      studentStream={studentStream}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MonitorPage;
