import React from 'react';
import { useSelector } from 'react-redux';
import { TbWorldWww } from 'react-icons/tb';
import {
  MdCenterFocusStrong,
  MdOutlineTabUnselected,
  MdPeopleAlt,
  MdFaceRetouchingOff,
  MdPersonOff,
  MdVideocam,
  MdOutlineVideocamOff,
  MdScreenShare,
  MdStopScreenShare,
  MdMicOff,
  MdMic,
} from 'react-icons/md';
import { generateUniqueId } from '../../utils/util';
import { FaMaximize, FaMinimize } from 'react-icons/fa6';
import { formatDateTime } from '../../utils/dateTime';
const MonitorSideBar = () => {
  const { sessionViolations } = useSelector((state) => state.session);

  const handleEnd = ({ user }) => {
    console.log(user._id.toString());
  };

  const handleJoin = ({ user }) => {
    console.log(user._id.toString());
  };
  return (
    <aside className=" w-1/4  h-full pt-10 bg-white border-r border-gray-200 overflow-y-hidden">
      <div className="h-full px-2  border-r-2">
        <div className="space-y-2 font-medium">SESSION VIOLATIONS</div>
        <ul className="pt-4 h-monitor mt-4 overflow-y-auto space-y-2 font-medium border-t-2 border-gray-200 dark:border-gray-700">
          {sessionViolations.map((violation) => {
            if (violation.kind === 'violation') {
              return (
                <li className="" key={violation._id.toString()}>
                  <div className="text-green-800 relative h-36  flex flex-col border p-1 border-green-300 w-full rounded-lg bg-green-50 ">
                    <div className="text-sm">
                      {formatDateTime(violation.time)}
                    </div>
                    <div className=" text-sm">
                      {violation.user.firstName}@{violation.user.studentId}
                    </div>
                    <ViolationIcons violation={violation} />
                    <div
                      onClick={() => {
                        handleJoin({ user: violation.user });
                      }}
                      className=" absolute top-2 right-2"
                    >
                      <button className="mx-2 px-2 py-1 text-white bg-green-500 rounded-lg">
                        Join
                      </button>
                      <button
                        onClick={() => {
                          handleEnd({ user: violation.user });
                        }}
                        className="px-2 py-1 text-white bg-red-500 rounded-lg"
                      >
                        End
                      </button>
                    </div>
                    <div className="">
                      <div className=" break-words truncate">
                        {violation.description}
                      </div>
                    </div>
                  </div>
                </li>
              );
            } else if (violation.kind === 'history') {
              return (
                <li className="" key={violation._id.toString()}>
                  <div className="text-green-800 relative h-36  flex flex-col border p-1 border-green-300 w-full rounded-lg bg-green-50 ">
                    <div className="text-sm">{violation.utc_time}</div>
                    <div className=" text-sm">
                      {violation.firstName} {violation.lastName}
                    </div>
                    <div className="flex">
                      <TbWorldWww className="text-red-500 text-3xl" />
                      <div className=" self-center">{'Visit Website'}</div>
                    </div>
                    <div className=" absolute top-2 right-2">
                      <button
                        onClick={() => {
                          handleJoin();
                        }}
                        className="mx-2 px-2 py-1 text-white bg-green-500 rounded-lg"
                      >
                        Join
                      </button>
                      <button
                        onClick={() => {
                          handleEnd();
                        }}
                        className="px-2 py-1 text-white bg-red-500 rounded-lg"
                      >
                        End
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
            } else {
              return <div key={generateUniqueId()}></div>;
            }
          })}
        </ul>
      </div>
    </aside>
  );
};

const ViolationIcons = ({ violation }) => {
  return (
    <div className="flex">
      <Window violation={violation} />
      <Face violation={violation} />
      <Device violation={violation} />
      <div className=" self-center">{violation.title}</div>
    </div>
  );
};
const Window = ({ violation }) => {
  return (
    <>
      {violation.type === 'blur' && (
        <MdOutlineTabUnselected className="text-red-500 text-3xl" />
      )}

      {violation.type === 'minimize' && (
        <FaMinimize className="text-red-500 text-3xl" />
      )}
      {violation.type === 'maximize' && (
        <FaMaximize className="text-red-500 text-3xl" />
      )}
      {violation.type === 'focus' && (
        <MdCenterFocusStrong className="text-red-500 text-3xl" />
      )}
    </>
  );
};
const Face = ({ violation }) => {
  return (
    <>
      {violation.type === 'moreFaces' && (
        <MdPeopleAlt className="text-red-500 text-3xl" />
      )}
      {violation.type === 'unknown' && (
        <MdFaceRetouchingOff className="text-red-500 text-3xl" />
      )}
      {violation.type === 'empty' && (
        <MdPersonOff className="text-red-500 text-3xl" />
      )}
    </>
  );
};
const Device = ({ violation }) => {
  return (
    <>
      {violation.type === 'video' && (
        <MdVideocam className="text-red-500 text-3xl" />
      )}
      {violation.type === 'mic' && <MdMic className="text-red-500 text-3xl" />}
      {violation.type === 'screen' && (
        <MdScreenShare className="text-red-500 text-3xl" />
      )}
      {violation.type === 'dVideo' && (
        <MdOutlineVideocamOff className="text-red-500 text-3xl" />
      )}
      {violation.type === 'dMic' && (
        <MdMicOff className="text-red-500 text-3xl" />
      )}
      {violation.type === 'dScreen' && (
        <MdStopScreenShare className="text-red-500 text-3xl" />
      )}
    </>
  );
};

export default MonitorSideBar;
