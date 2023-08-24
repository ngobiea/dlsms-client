import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { IoDocumentAttachOutline } from 'react-icons/io5';
import { generateUniqueId } from '../../utils/util';
const FileInput = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    newFiles.forEach((file) => {
      file.id = generateUniqueId();
    });
    setFiles([...files, ...newFiles]);
  };
  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return (
    <div className="mx-7 my-7 w-auto">
      <label
        className="flex w-auto cursor-pointer text-title"
        htmlFor="file-input"
      >
        <IoDocumentAttachOutline className="align-middle mt-1" />{' '}
        <span className="ml-2 align-middle">Attach Files</span>
      </label>
      {files.map((file, index) => {
        return (
          <div
            key={file.id}
            id="alert-border-3"
            className="inline-flex p-4 mb-4 mr-3 text-green-800 border-t-4 border-green-300 bg-green-50 "
            role="alert"
          >
            <div className="ml-3 text-sm font-medium">{file.name}</div>
            <button
              type="button"
              className="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8"
            >
              <span className="sr-only">Dismiss</span>
              <MdClose
                onClick={() => {
                  removeFile(index);
                }}
                className="h-6 w-6"
                aria-hidden="true"
              />
            </button>
          </div>
        );
      })}

      <input
        className="hidden"
        multiple
        onChange={handleFileChange}
        id="file-input"
        type="file"
      />
    </div>
  );
};

export default FileInput;
