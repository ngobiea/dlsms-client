import React from "react";
import { BsFiletypePdf } from "react-icons/bs";
import { GrDocumentPdf } from "react-icons/gr";
import { VscFilePdf, VscFile } from "react-icons/vsc";
import {faker} from '@faker-js/faker'
const FileTableData = () => { 
    return (
      <tr className="bg-white border-b  hover:bg-gray-50">
        <td className="w-4 p-4">
          <VscFilePdf className="text-2xl text-green-600" />
        </td>
        <th
          scope="row"
          className="px-6 py-4 font-medium text-green-700 whitespace-nowrap dark:text-white"
        >
          {faker.system.commonFileName('pdf')}
        </th>
        <td className="px-6 py-4 text-green-700">{faker.person.firstName()}</td>
        <td className="px-6 py-4 text-green-700">
          {faker.date.recent().toUTCString()}
        </td>
        <td className="px-6 py-4 text-green-700">{faker.string.numeric()}MB</td>
        <td className="px-6 py-4 text-green-700">
          <a
            href="#"
            className="font-medium text-green-600  hover:underline"
          >
            Download
          </a>
        </td>
      </tr>
    );
};

export default FileTableData;