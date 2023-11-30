import React from 'react';

const StudentCSTableData = ({ student }) => {
  console.log(student);
  return (
    <tr className="bg-white border-b  hover:bg-gray-50">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-green-700 whitespace-nowrap dark:text-white"
      >
        Augustine Ngobie
      </th>
      <td className="px-6 py-4 text-green-700">SP20-BSE-108</td>
      <td className="px-6 py-4 text-green-700">78%</td>
      <td className="px-6 py-4 text-green-700">3</td>
    </tr>
  );
};

export default StudentCSTableData;
