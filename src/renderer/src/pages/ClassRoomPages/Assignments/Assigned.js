import React from 'react';
import AssignmentCard from '../../../components/Assignments/AssignmentCard';

const Assigned = () => {
  const assignmentCards = Array.from(Array(5).keys()).map((i) => (
    <AssignmentCard key={i} />
  ));

  return (
    <div className="flex flex-col space-y-8 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
      {assignmentCards}
    </div>
  );
};

export default Assigned;
