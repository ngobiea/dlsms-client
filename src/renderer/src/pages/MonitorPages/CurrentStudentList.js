import React from 'react';
import {
  MdVideocam,
  MdVideocamOff,
  MdOutlineMic,
  MdOutlineMicOff,
  MdScreenShare,
  MdStopScreenShare,
} from 'react-icons/md';
import MonitorSideBar from '../../components/Monitor/MonitorSideBar';
import MonitorHeader from '../../components/Monitor/MonitorHeader';
const CurrentStudentList = () => {
  const students = [
    {
      studentId: 'SP20-BSE-108',
      name: 'Augustine Ngobie',
      mic: true,
      screen: false,
      video: true,
    },
  ];
  return (
    <>
      <MonitorSideBar />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-10 ml-72 h-full">
        <MonitorHeader />
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Student ID
              </th>
              <th scope="col" className="px-6 py-3">
                NAME
              </th>
              <th scope="col" className="px-6 py-3">
                DEVICE STATUS
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-green-800 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-green-800 whitespace-nowrap dark:text-white"
              >
                Microsoft Surface Pro
              </th>
              <td className="px-6 py-4">White</td>
              <td className="px-6 py-4">Laptop PC</td>
            </tr>
            {students.map((student) => {
              return (
                <tr key={student.studentId} className="bg-white">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-green-800 whitespace-nowrap "
                  >
                    {student.studentId}
                  </th>
                  <td className="px-6 py-4 font-medium text-green-800 whitespace-nowrap ">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 font-medium text-green-800 whitespace-nowrap flex ">
                    {student.mic ? (
                      <MdOutlineMic className=" mx-1 text-lg" />
                    ) : (
                      <MdOutlineMicOff className="mx-1 text-lg" />
                    )}
                    {student.screen ? (
                      <MdScreenShare className="mx-1 text-lg" />
                    ) : (
                      <MdStopScreenShare className="mx-1 text-lg" />
                    )}
                    {student.video ? (
                      <MdVideocam className="mx-1 text-lg" />
                    ) : (
                      <MdVideocamOff className=" mx-1  text-lg" />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CurrentStudentList;
