import React from 'react';
import { formatDateTime } from '../../../utils/dateTime';
import { useNavigate } from 'react-router-dom';

const StudentESTableData = ({ student }) => {
  
  const navigate = useNavigate();
  const handleViewStudents = async () => {
    try {
      navigate(`../student/${student?._id.toString()}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <tr className="bg-white border-b  hover:bg-gray-50">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-green-700 whitespace-nowrap dark:text-white"
      >
        {student.firstName} {student.lastName}
      </th>
      <td className="px-6 py-4 text-green-700">{student.studentId}</td>
      <td className="px-6 py-4 text-green-700">
        {formatDateTime(student.startTime)}
      </td>
      <td className="px-6 py-4 text-green-700">
        {formatDateTime(student.endTime)}
      </td>
      <td className="px-6 py-4 text-green-700">{student.violations}</td>
      <td className="px-6 py-4 text-green-700">
        {`${student.points} / ${student.totalPoint}`}
      </td>

      <td className="flex items-center px-6 py-4">
        <button
          onClick={handleViewStudents}
          type="button"
          className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          View
        </button>
      </td>
    </tr>
  );
};

export default StudentESTableData;
