import React from 'react';
import { useDispatch } from 'react-redux';
import { setExamSessionId, setDownloadProgress } from '../../../store';
import axios from 'axios';
import { baseUrl, localhost } from '../../../utils/url';
const token = JSON.parse(localStorage.getItem('user')).token;
const accountType = JSON.parse(localStorage.getItem('accountType'));
import { notification } from '../../../utils/notification';
const StudentButtons = ({ student }) => {
  const dispatch = useDispatch();
  const downloadRecording = async () => {
    notification('Downloading Recording', 'Download Started');
    try {
      const response = await axios.get(
        `${baseUrl || localhost}/tutor/exam-session/recording/${student._id}`,
        {
          responseType: 'blob',
          headers: {
            authorization: `Bearer ${token}`,
          },
          onDownloadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;

            const progress = Math.round((loaded / total) * 100);

            console.log(`Download Progress: ${progress}%`);
            dispatch(setDownloadProgress(progress));
            if (progress === 100) {
              notification('Downloading Recording', 'Download Completed');
              dispatch(setDownloadProgress(0));
            }
          },
        }
      );

      console.log(response);
      // if (response.status === 200) {
      //   dispatch(setDownloadProgress(0));
      // }

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
    notification('Downloading Report', 'Download Started');
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
            dispatch(setDownloadProgress(progress));
            if (progress === 100) {
              notification('Downloading Report', 'Download Completed');
              dispatch(setDownloadProgress(0));
            }
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
    <div className="mx-5 flex justify-between">
      <div className="flex">
        <button
          onClick={downloadRecording}
          type="button"
          className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Download Recording
        </button>
        <button
          onClick={handleDownloadReport}
          type="button"
          className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Download Report
        </button>
        <button
          onClick={() => {
            dispatch(setExamSessionId(student?._id));
          }}
          type="button"
          className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Grade Student
        </button>
      </div>
    </div>
  );
};

export default StudentButtons;
