import React, { useEffect } from 'react';
import AssignmentCard from '../../../components/Assignments/AssignmentCard';

import { useLocation } from 'react-router-dom';
import {
  useGetAssignedAssignmentQuery,
  setAssignedAssignment,
} from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { getClassroomId } from '../../../utils/getClassroomId';
const Assigned = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { assigned } = useSelector((state) => state.assignment);
  const classroomId = getClassroomId(location.pathname);
  const { data, error, isError, isSuccess } = useGetAssignedAssignmentQuery({
    classroomId,
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAssignedAssignment(data));
    } else if (isError) {
      console.log(error);
    }
  }, [data, isError, isSuccess]);

  return (
    <div className="flex flex-col space-y-8 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
      {assigned.map((assignment) => {
        return (
          <AssignmentCard
            key={assignment._id.toString()}
            assignment={assignment}
          />
        );
      })}
    </div>
  );
};

export default Assigned;
