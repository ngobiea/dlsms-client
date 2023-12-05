import React, { useEffect } from 'react';
import { MdDownload } from 'react-icons/md';
import FileInput from '../../../components/App/FileInput';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeAllFiles,
  usePostSubmitAssignmentMutation,
  useGetAssignmentQuery,
  setDownloadProgress,
} from '../../../store';
import { notification } from '../../../utils/notification';
import { formatDateTime } from '../../../utils/dateTime';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl, localhost } from '../../../utils/url';
const token = JSON.parse(localStorage.getItem('user')).token;

const Assignment = () => {
  const dispatch = useDispatch();
  const { assignmentId } = useParams();
  const { files } = useSelector((state) => state.app);
  const { data, error, isError, isSuccess } = useGetAssignmentQuery({
    assignmentId,
  });

  const [submitAssignment, result] = usePostSubmitAssignmentMutation();

  const handleSubmitAssignment = () => {
    const submission = new FormData();

    if (files.length > 0) {
      files.forEach((file) => {
        submission.append('files', file);
      });
    }
    submitAssignment({ submission, assignmentId });
  };
  const handleReferenceDownload = async ({ _id, name }) => {
    notification('Downloading Reference', 'Download Started');
    try {
      const response = await axios.get(
        `${baseUrl || localhost}/download/${assignmentId}/file/${_id}`,
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
      link.setAttribute('download', `${name}`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.log('Error downloading report');
      console.log(error);
    }
  };
  const handleDownloadSubmission = async ({ name }) => {
    const submissionId = data?.submissions[0]?._id;
    try {
      const response = await axios.get(
        `${
          baseUrl || localhost
        }/tutor/download/${assignmentId}/submission/${submissionId}`,
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
  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      dispatch(removeAllFiles());
    } else if (isError) {
      console.log(error);
    }
  }, [isSuccess, isError]);
  useEffect(() => {
    if (result.data) {
      console.log(result.data);
    }
  }, [result.data]);
  return (
    <div className="bg-white-full h-full">
      <div className="flex flex-col h-full">
        <div className="mr-16 h-full">
          <div className="flex justify-between px-2 pt-3 pb-2 mt-4 mx-5 border-b-2 border-gray-200">
            <p className="text-4xl font-normal text-green-800 dark:text-white">
              {data?.title}
            </p>
            <div>
              <span className=" font-bold text-green-800">
                {data?.submissions?.length > 0 ? (
                  `Submitted on ${formatDateTime(data?.submissions[0].date)}`
                ) : (
                  <button
                    onClick={handleSubmitAssignment}
                    type="submit"
                    className="py-2.5 px-7 mr-2 mb-2 text-sm font-medium text-white focus:outline-none rounded-md border bg-green-700 hover:bg-green-800"
                  >
                    Submit Assignment
                  </button>
                )}
              </span>
            </div>
          </div>
          <div className="ml-7 my-7 grid sm:grid-cols-2 sm:gap-6 mt-5">
            <div>
              <p>
                <span className="font-bold text-green-800">Due Date :</span>{' '}
                <span className=" text-green-800">
                  {data?.dueDate && formatDateTime(data?.dueDate)}
                </span>
              </p>
            </div>
            <div>
              <p>
                <span className="font-bold text-green-800">Total Points :</span>{' '}
                <span className=" text-green-800">{data?.points}</span>
              </p>
              <p>
                <span className="font-bold text-green-800">
                  Attain Points :
                </span>{' '}
                <span className=" text-green-800">
                  {data?.submissions[0]?.graded
                    ? data?.submissions[0]?.points
                    : 'nill'}
                </span>
              </p>
            </div>
          </div>
          <div className="mx-7 my-7">
            <div className="font-bold text-green-800">Instructions</div>

            <p className="text-left rtl:text-right text-green-800">
              {data?.instruction}
            </p>
          </div>
          <div className="mx-7 my-7">
            <div className="font-bold text-green-800">Reference materials</div>
            {data?.files?.map((file) => {
              return (
                <div
                  key={file.location}
                  id="alert-border-3"
                  className="inline-flex p-4 mb-4 mr-3 text-green-800 border-t-4 border-green-300 bg-green-50 "
                  role="alert"
                >
                  <div className="ml-3 text-sm font-medium">{file.name}</div>
                  <button
                    type="button"
                    className="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8"
                  >
                    <span className="sr-only">Dismiss</span>
                    <MdDownload
                      title="Download File"
                      onClick={() => {
                        handleReferenceDownload({
                          _id: file._id,
                          name: file.name,
                        });
                      }}
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              );
            })}
          </div>
          <hr className="h-0.5 h ml-7 my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <div className="mx-7 my-7">
            <div className="font-bold text-green-800">My Work</div>
            {data?.submissions[0]?.files.map((file) => {
              return (
                <div
                  key={file.location}
                  id="alert-border-3"
                  className="inline-flex p-4 mb-4 mr-3 text-green-800 border-t-4 border-green-300 bg-green-50 "
                  role="alert"
                >
                  <div className="ml-3 text-sm font-medium">{file.name}</div>
                  <button
                    type="button"
                    className="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8"
                  >
                    <span className="sr-only">Dismiss</span>
                    <MdDownload
                      title="Download File"
                      onClick={() =>
                        handleDownloadSubmission({
                          key: file.key,
                          name: file.name,
                        })
                      }
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              );
            })}
          </div>
          {data?.submissions.length === 0 && <FileInput />}
        </div>
      </div>
    </div>
  );
};

export default Assignment;
