import React from "react";
import { BsFiletypePdf } from "react-icons/bs";
import { GrDocumentPdf } from "react-icons/gr";
import { VscFilePdf, VscFile } from "react-icons/vsc";
const FileTableHeader = () => {
    return (
     
      <thead className="text-xs text-green-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="p-4">
            <VscFile className="text-2xl" />
          </th>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            Owner
          </th>
          <th scope="col" className="px-6 py-3">
            Uploaded at
          </th>
          <th scope="col" className="px-6 py-3">
            Size
          </th>
          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
    );
};

export default FileTableHeader;