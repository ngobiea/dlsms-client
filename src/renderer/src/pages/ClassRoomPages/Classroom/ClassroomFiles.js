import React from 'react';
import FileTableData from '../../../components/classrooms/FileTableData';
import FileTableHeader from '../../../components/classrooms/FileTableHeader';

const ClassroomFiles = () => {
  return (
    <div className="bg-white rounded-md ">
      <div className="-mx-4 px-4  overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <FileTableHeader />
            <tbody>
              <FileTableData />
              <FileTableData />
              <FileTableData />
              <FileTableData />
              <FileTableData />
              <FileTableData />
              <FileTableData />
              <FileTableData />
              <FileTableData />
              <FileTableData />
            </tbody>
          </table>
          <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
            <span className="text-xs xs:text-sm text-gray-900">
              Showing 1 to 4 of 5 Entries
            </span>
            <div className="inline-flex mt-2 xs:mt-0">
              <button className="text-sm text-indigo-50 transition duration-150 hover:bg-green-500 bg-green-600 font-semibold py-2 px-4 rounded-l">
                Prev
              </button>
              &nbsp; &nbsp;
              <button className="text-sm text-indigo-50 transition duration-150 hover:bg-green-500 bg-green-600 font-semibold py-2 px-4 rounded-r">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassroomFiles;
