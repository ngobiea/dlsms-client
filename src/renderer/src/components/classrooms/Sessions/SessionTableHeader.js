import React from 'react';
const SessionTableHeader = () => {
  return (
    <thead className="text-xs text-green-700 uppercase bg-gray-50">
      <tr>
        <th scope="col" className="px-6 py-3">
          Title
        </th>
        <th scope="col" className="px-6 py-3">
          Start Date
        </th>
        <th scope="col" className="px-6 py-3">
          End Date
        </th>
        <th scope="col" className="px-6 py-3">
          Actions
        </th>
      </tr>
    </thead>
  );
};

export default SessionTableHeader;
