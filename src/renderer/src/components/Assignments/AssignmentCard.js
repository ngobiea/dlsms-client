import React from 'react';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { formatDateTime } from '../../utils/dateTime';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const accountType = JSON.parse(localStorage.getItem('accountType'));

const AssignmentCard = ({ assignment }) => {
  const navigate = useNavigate();
  const { _id, title, dueDate } = assignment;
  const { classroomId } = useSelector((state) => state.classroom);
  const handleViewAssignments = () => {
    navigate(`/${classroomId}/assignment/${_id.toString()}`);
  };
  const handleEditAssignments = () => {};
  const handleDeleteAssignments = () => {};
  return (
    <div
      id="alert-additional-content-3"
      className="p-4 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
      role="alert"
    >
      <div className="flex items-center">
        <h3 className="text-lg font-medium"> {title}</h3>
      </div>
      <div className="flex border border-green-500 my-2 w-2/12">
        <MdOutlineCalendarMonth className="text-green-800 text-4xl mr-1 py-1" />
        <div className="flex flex-col py-1">
          <p className="font-bold">Due Date</p>
          <p className="text-xs">{formatDateTime(dueDate)}</p>
        </div>
      </div>

      <div className="flex">
        <button
          onClick={handleViewAssignments}
          type="button"
          className="text-white bg-green-800 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center"
        >
          View
        </button>
        {accountType === 'tutor' && (
          <button
            onClick={handleEditAssignments}
            type="button"
            className="text-green-800 bg-transparent border border-green-800 hover:bg-green-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center  me-2"
          >
            Edit
          </button>
        )}
        {accountType === 'tutor' && (
          <button
            onClick={handleDeleteAssignments}
            type="button"
            className="text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default AssignmentCard;
