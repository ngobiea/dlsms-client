import React from 'react';
const StudentESTableHeader = () => {
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
          Start Time
        </th>
        <th scope="col" className="px-6 py-3">
          End Time
        </th>
        <th scope="col" className="px-6 py-3">
          Violations
        </th>
        <th scope="col" className="px-6 py-3">
          Marks
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
  );
};

export default StudentESTableHeader;
