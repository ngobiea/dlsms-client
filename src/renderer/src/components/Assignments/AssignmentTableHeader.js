import React from 'react';
const AssignmentTableHeader = () => {
  return (
    <thead className="text-xs text-green-700 uppercase bg-gray-50">
      <tr>
        <th scope="col" className="px-6 py-3">
          Name
        </th>
        <th scope="col" className="px-6 py-3">
          Student ID
        </th>
        <th scope="col" className="px-6 py-3">
          Submitted On
        </th>
        <th scope="col" className="px-6 py-3">
          Points
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
  );
};

export default AssignmentTableHeader;
