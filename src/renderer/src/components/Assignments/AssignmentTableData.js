import React from 'react';
import { formatDateTime } from '../../utils/dateTime';
const accountType = JSON.parse(localStorage.getItem('accountType'));
import axios from 'axios';
import { baseUrl, localhost } from '../../utils/url';
import { setSubmissionId, setDownloadProgress } from '../../store';
import { useDispatch } from 'react-redux';
import { notification } from '../../utils/notification';
const token = JSON.parse(localStorage.getItem('user')).token;

const AssignmentTableData = ({ submission, assignmentId }) => {
  const dispatch = useDispatch();
  const { date, student, graded, points, _id } = submission;
  const { firstName, lastName, studentId } = student;
  const showSubmitForm = async () => {
    dispatch(
      setSubmissionId({
        submissionId: _id.toString(),
        assignmentId,
      })
    );
  };

  const handleDownloadSubmission = async () => {
    notification('Downloading Submission', 'Download Started');
    try {
      const response = await axios.get(
        `${
          baseUrl || localhost
        }/tutor/download/${assignmentId}/submission/${_id}`,
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
              notification('Downloading Submission', 'Download Completed');
              dispatch(setDownloadProgress(0));
            }
            // Update UI with the download progress (e.g., set state for a progress bar)
          },
        }
      );
      console.log(response);
      const fileName = response.headers['content-disposition'];
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${fileName}`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.log('Error downloading report');
      console.log(error);
    }
  };
    const handleDownloadPlagiarism = async () => {
      notification('Downloading Submission', 'Download Started');
      try {
        const response = await axios.get(
          `${
            baseUrl || localhost
          }/tutor/plagiarism/${assignmentId}/submission/${_id}`,
          {
            // responseType: 'blob',
            headers: {
              authorization: `Bearer ${token}`,
            },
            // onDownloadProgress: (progressEvent) => {
            //   const { loaded, total } = progressEvent;
            //   const progress = Math.round((loaded / total) * 100);
            //   console.log(`Download Progress: ${progress}%`);
            //   dispatch(setDownloadProgress(progress));
            //   if (progress === 100) {
            //     notification('Downloading Submission', 'Download Completed');
            //     dispatch(setDownloadProgress(0));
            //   }
            //   // Update UI with the download progress (e.g., set state for a progress bar)
            // },
          }
        );
        console.log(response);
        // const fileName = response.headers['content-disposition'];
        // const url = window.URL.createObjectURL(new Blob([response.data]));
        // const link = document.createElement('a');
        // link.href = url;
        // link.setAttribute('download', `${fileName}`);
        // document.body.appendChild(link);
        // link.click();
        // link.parentNode.removeChild(link);
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
        {`${firstName} ${lastName}`}
      </th>
      <td className="px-6 py-4 text-green-700">{studentId}</td>
      <td className="px-6 py-4 text-green-700">{formatDateTime(date)}</td>
      <td className="px-6 py-4 text-green-700">{graded ? points : 'nill'}</td>

      <td className="flex items-center px-6 py-4">
        <button
          onClick={showSubmitForm}
          type="button"
          className="px-4 py-2 text-sm font-medium text-green-900 bg-gray-200 border border-green-900 rounded-s-lg hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:text-green-700"
        >
          Grade
        </button>
        <button
          type="button"
          onClick={handleDownloadPlagiarism}
          className="px-4 py-2 text-sm font-medium text-green-900 bg-gray-200 border-t border-b border-green-900 hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:text-green-700 "
        >
          Plagiarism
        </button>
        <button
          onClick={handleDownloadSubmission}
          type="button"
          className="px-4 py-2 text-sm font-medium text-green-900 bg-gray-200 border border-green-900 rounded-e-lg hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:text-green-700"
        >
          Download
        </button>
      </td>
    </tr>
  );
};

export default AssignmentTableData;
