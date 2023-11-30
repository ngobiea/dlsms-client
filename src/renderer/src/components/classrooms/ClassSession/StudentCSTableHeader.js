import React from 'react';
const StudentCSTableHeader = () => {
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
          Attendance
        </th>
        <th scope="col" className="px-6 py-3">
          Join Time
        </th>
        <th scope="col" className="px-6 py-3">
          Leave Time
        </th>
        <th scope="col" className="px-6 py-3">
          No of Times Left
        </th>
      </tr>
    </thead>
  );
};

export default StudentCSTableHeader;
