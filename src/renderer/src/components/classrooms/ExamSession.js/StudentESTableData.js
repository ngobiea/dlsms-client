import React from 'react';
import { formatDateTime } from '../../../utils/dateTime';
const accountType = JSON.parse(localStorage.getItem('accountType'));
import axios from 'axios';
import { baseUrl, localhost } from '../../../utils/url';

const token = JSON.parse(localStorage.getItem('user')).token;

const StudentESTableData = ({ student }) => {
  const handleViewStudents = async () => {
    try {
      console.log('view exam students');
    } catch (error) {
      console.log(error);
    }
  };
  const downloadRecording = async () => {
    try {
      const response = await axios.get(
        `${baseUrl || localhost}/tutor/exam-session/recording/${student._id}`,
        {
          responseType: 'blob', // important
          headers: {
            authorization: `Bearer ${token}`,
          },
          onDownloadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const progress = Math.round((loaded / total) * 100);

            console.log(`Download Progress: ${progress}%`);
            // Update UI with the download progress (e.g., set state for a progress bar)
          },
        }
      );

      console.log(response);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'vid-1701010735585.webm');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.log('Error downloading report');
      console.log(error);
    }
  };
  const handleDownloadReport = async () => {
    try {
      const response = await axios.get(
        `${baseUrl || localhost}/tutor/exam-session/report/${student._id}`,
        {
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
        }
      );
      console.log(response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${student.studentId}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.log('Error downloading report');
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
        {accountType !== 'student' && (
          <button
            onClick={handleViewStudents}
            type="button"
            className="px-4 py-2 text-sm font-medium text-green-900 bg-gray-200 border border-green-900 rounded-s-lg hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:text-green-700"
          >
            Review Student
          </button>
        )}
        <button
          onClick={downloadRecording}
          type="button"
          className="px-4 py-2 text-sm font-medium text-green-900 bg-gray-200 border-t border-b border-green-900 hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:text-green-700"
        >
          Download Recording
        </button>
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

export default StudentESTableData;
