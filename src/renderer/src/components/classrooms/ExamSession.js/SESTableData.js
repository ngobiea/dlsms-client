import React from 'react';
import { formatDateTime } from '../../../utils/dateTime';

const SESTableData = ({ student }) => {
  return (
    <tr className="bg-white border-b  hover:bg-gray-50">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-green-700 whitespace-nowrap dark:text-white"
      >
        {student?.firstName} {student?.lastName}
      </th>
      <td className="px-6 py-4 text-green-700">{student?.studentId}</td>
      <td className="px-6 py-4 text-green-700">
        {formatDateTime(student?.startTime)}
      </td>
      <td className="px-6 py-4 text-green-700">
        {formatDateTime(student?.endTime)}
      </td>
      <td className="px-6 py-4 text-green-700">{student?.violations}</td>
      <td className="px-6 py-4 text-green-700">{student?.browserHistory}</td>

      <td className="px-6 py-4 text-green-700">
        {`${student?.points} / ${student?.totalPoint}`}
      </td>
    </tr>
  );
};

export default SESTableData;
