import React from 'react';
import { formatDateTime } from '../../../utils/dateTime';
const accountType = JSON.parse(localStorage.getItem('accountType'));
import { useNavigate } from 'react-router-dom';

const SessionTableData = ({ session, type }) => {
  const navigate = useNavigate();
  const handleDownloadReport = () => {};
  const handleViewStudents = () => {
    if (type === 'class') {
      navigate(`${session._id}`);
    } else if (type === 'exam') {
      navigate(`${session._id}`);
      console.log('view exam students');
    }
  };
  return (
    <tr className="bg-white border-b  hover:bg-gray-50">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-green-700 whitespace-nowrap dark:text-white"
      >
        {session.title}
      </th>
      <td className="px-6 py-4 text-green-700">
        {formatDateTime(session.startDate)}
      </td>
      <td className="px-6 py-4 text-green-700">
        {formatDateTime(session.endDate)}
      </td>
      <td className="flex items-center px-6 py-4">
        {accountType !== 'student' && (
          <button
            onClick={handleViewStudents}
            type="button"
            className="px-4 py-2 text-sm font-medium text-green-900 bg-gray-200 border border-green-900 rounded-s-lg hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:text-green-700"
          >
            View Report
          </button>
        )}

        <button
          onClick={handleDownloadReport}
          type="button"
          className="px-4 py-2 text-sm font-medium text-green-900 bg-gray-200 border border-green-900 rounded-e-lg hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:text-green-700"
        >
          Download Report
        </button>
      </td>
    </tr>
  );
};

export default SessionTableData;
