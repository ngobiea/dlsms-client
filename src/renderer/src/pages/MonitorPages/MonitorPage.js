import React from 'react';
import { useSelector } from 'react-redux';
import SessionCard from '../../components/Monitor/SessionCard';
import MonitorSideBar from '../../components/Monitor/MonitorSideBar';
const MonitorPage = () => {
  const { activeStudentsInExamSession } = useSelector((state) => state.session);

  return (
    <div className="flex container">
      <MonitorSideBar />
      <div className="relative w-3/4  h-screen">
        <div className="overflow-y-auto overscroll-contain h-monitorView w-full">
          <div className="">
            <div className="p-4 border-gray-200  rounded-lg dark:border-gray-700 mt-14">
              <div className="grid grid-cols-4 gap-1 h-0">
                {activeStudentsInExamSession.map((student) => {
                  return (
                    <SessionCard
                      key={student._id.toString()}
                      student={student}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitorPage;
