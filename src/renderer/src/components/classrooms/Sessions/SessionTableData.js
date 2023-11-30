import React from 'react';
import { formatDateTime } from '../../../utils/dateTime';
const accountType = JSON.parse(localStorage.getItem('accountType'));
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const token = JSON.parse(localStorage.getItem('user')).token;
import { baseUrl, localhost } from '../../../utils/url';
const SessionTableData = ({ session, type }) => {
  const navigate = useNavigate();
  const handleDownloadReport = async () => {
    let host = '';
    if (type === 'class') {
      host = `${baseUrl || localhost}/tutor/class-session/reports/${session._id}`;
    } else if (type === 'exam') {
      host = `${baseUrl || localhost}/tutor/exam-session/reports/${session._id}`;
    } else {
      console.log('invalid type');
      return;
    }
    try {
      const response = await axios.get(host, {
        responseType: 'blob',
        headers: {
          authorization: `Bearer ${token}`,
        },
        onDownloadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const progress = Math.round((loaded / total) * 100);

          console.log(`Download Progress: ${progress}%`);
          // Update UI with the download progress (e.g., set state for a progress bar)
        },
      });
      console.log(response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${session.title}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.log('Error downloading report');
      console.log(error);
    }
  };

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
