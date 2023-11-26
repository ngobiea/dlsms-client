import React from 'react';
import { formatDateTime } from '../../../utils/dateTime';
const accountType = JSON.parse(localStorage.getItem('accountType'));
import { useNavigate } from 'react-router-dom';

const StudentCSTableData = ({ student }) => {
  const navigate = useNavigate();
  const handleDownloadReport = () => {};

  return (
    <tr className="bg-white border-b  hover:bg-gray-50">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-green-700 whitespace-nowrap dark:text-white"
      >
        Augustine Ngobie
      </th>
      <td className="px-6 py-4 text-green-700">SP20-BSE-108</td>
      <td className="px-6 py-4 text-green-700">78%</td>
      <td className="px-6 py-4 text-green-700">3</td>
      <td className="flex items-center px-6 py-4">
        <button
          type="button"
          onClick={handleDownloadReport}
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-green-900 focus:outline-none bg-gray-200 rounded-lg border border-green-200 hover:bg-gray-400 hover:text-green-700 focus:z-10"
        >
          Download Report
        </button>
      </td>
    </tr>
  );
};

export default StudentCSTableData;
