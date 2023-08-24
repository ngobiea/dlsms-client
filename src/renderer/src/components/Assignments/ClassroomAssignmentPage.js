import React from 'react';
import ClassroomAssignmentHeader from './ClassroomAssignmentHeader ';
import CreateAssignment from './CreateAssignment';
import Assigned from './Assigned';
import GradedAssignment from './GradedAssignment';
import { useSelector } from 'react-redux';
const ClassroomAssignmentPage = () => {
  const { assignmentView } = useSelector((state) => {
    return state.classroom;
  });
  return (
    <div className="flex-1 flex flex-col h-screen mr-20 mb-20">
      <ClassroomAssignmentHeader />
      {assignmentView === 'assigned' && <Assigned />}
      {assignmentView === 'graded' && <GradedAssignment />}
      {assignmentView === 'create' && <CreateAssignment />}
      {/* <Routes>
          <Route path="" element={<Navigate to={'/classroom/:id/assignment/assign'} />} />
          <Route path="/assign" element={<Assigned />} />
          <Route path="create" element={<CreateAssignment />} />
          <Route path="graded/*" element={<GradedAssignment />} />
        </Routes> */}
    </div>
  );
};

export default ClassroomAssignmentPage;
