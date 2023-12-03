import React, { useEffect } from 'react';
import AssignmentTableHeader from '../../../components/Assignments/AssignmentTableHeader';
import AssignmentTableData from '../../../components/Assignments/AssignmentTableData';
import { useParams } from 'react-router-dom';
import { useGetAssignmentQuery, setSubmittedAssignment } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
const StudentSubmission = () => {
  const { assignmentId } = useParams();
  const { submitted } = useSelector((state) => state.assignment);

  const dispatch = useDispatch();
  const { data, error, isError, isSuccess } = useGetAssignmentQuery({
    assignmentId,
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setSubmittedAssignment(data));
    } else if (isError) {
      console.log(error);
    }
  }, [data, isError, isSuccess]);

  return (
    <div className="bg-white rounded-md ">
      <div className="-mx-4 px-4  overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <AssignmentTableHeader />
            <tbody>
              {submitted?.map((submission) => {
                return (
                  <AssignmentTableData
                    key={submission._id.toString()}
                    submission={submission}
                    assignmentId={assignmentId}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentSubmission;
