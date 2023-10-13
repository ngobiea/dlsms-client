import React from 'react';
import { useSelector } from 'react-redux';
import { TbWorldWww } from 'react-icons/tb';
import {
  MdStopScreenShare,
  MdPeopleAlt,
  MdOutlineVideocamOff,
  MdWifiOff,
  MdFaceRetouchingOff,
  MdPersonOff,
  MdOutlineTabUnselected,
} from 'react-icons/md';

const MonitorSideBar = () => {
  const { sessionViolations } = useSelector((state) => state.session);
  return (
    <aside className="absolute inset-y-0 w-1/4  left-0 z-10 h-screen pt-8 pr-6 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0">
      <div className="h-full px-1 py-4 overflow-y-auto border-r-2">
        <div className="space-y-2 font-medium">SESSION VIOLATIONS</div>
        <ul className="pt-4 mt-4 space-y-2 font-medium border-t-2 border-gray-200 dark:border-gray-700">
          {sessionViolations.map((violation) => {
            if (violation.type === 'violation') {
              return (
                <li className="" key={violation._id.toString()}>
                  <div className="text-green-800 relative h-36  flex flex-col border p-1 border-green-300 w-full rounded-lg bg-green-50 ">
                    <div className="text-sm">
                      {violation.time.toUTCString()}
                    </div>
                    <div className=" text-sm">
                      {violation.firstName}@{violation.studentId}
                    </div>
                    <div className="flex">
                      <MdOutlineVideocamOff className="text-red-500 text-3xl" />
                      <div className=" self-center">{'Disabled WebCam '}</div>
                    </div>
                    <div className=" absolute top-2 right-2">
                      <button className="mx-2 px-2 py-1 text-white bg-green-500 rounded-lg">
                        {'Join'}
                      </button>
                      <button className="px-2 py-1 text-white bg-red-500 rounded-lg">
                        {'End'}
                      </button>
                    </div>
                    <div className="">
                      <div className="break-words truncate">
                        Title: {violation.title}
                      </div>
                      <div className=" break-words truncate">
                        {violation.description}
                      </div>
                    </div>
                  </div>
                </li>
              );
            } else if (violation.type === 'history') {
              return (
                <li className="" key={violation._id.toString()}>
                  <div className="text-green-800 relative h-36  flex flex-col border p-1 border-green-300 w-full rounded-lg bg-green-50 ">
                    <div className="text-sm">{violation.utc_time}</div>
                    <div className=" text-sm">
                      {violation.firstName} {violation.lastName}
                    </div>
                    <div className="flex">
                      <TbWorldWww className="text-red-500 text-3xl" />
                      <div className=" self-center">{'Disabled WebCam '}</div>
                    </div>
                    <div className=" absolute top-2 right-2">
                      <button className="mx-2 px-2 py-1 text-white bg-green-500 rounded-lg">
                        {'Join'}
                      </button>
                      <button className="px-2 py-1 text-white bg-red-500 rounded-lg">
                        {'End'}
                      </button>
                    </div>
                    <div className="">
                      <div className="break-words truncate">
                        Title: {violation.title}
                      </div>
                      <div className=" break-words truncate">
                        URL: {violation.url}
                      </div>
                    </div>
                  </div>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </aside>
  );
};

export default MonitorSideBar;
