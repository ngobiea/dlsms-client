import React, { useEffect } from 'react';
import AssignmentCard from '../../../components/Assignments/AssignmentCard';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getClassroomId } from '../../../utils/getClassroomId';
import {
  useGetGradedAssignmentQuery,
  setGradedAssignment,
} from '../../../store';
const GradedAssignment = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { graded } = useSelector((state) => state.assignment);
  const classroomId = getClassroomId(location.pathname);
  const { data, error, isError, isSuccess } = useGetGradedAssignmentQuery({
    classroomId,
  });
  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      dispatch(setGradedAssignment(data));
    } else if (isError) {
      console.log(error);
    }
  }, [data, isError, isSuccess]);
  return (
    <div className="w-full h-full flex justify-center items-center">
      {graded?.map((assignment) => {
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

export default GradedAssignment;
