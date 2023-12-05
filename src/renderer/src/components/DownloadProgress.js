import React from 'react';
import { useSelector } from 'react-redux';

const DownloadProgress = () => {
  const { downloadProgress } = useSelector((state) => state.app);

  return (
    <div className="fixed top-11 right-0 z-50 p-4 w-1/2  text-green-800 border border-green-300 rounded-lg bg-green-200">
      <p className=" font-bold text-center">Downloading......</p>
      <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
        <div
          className="bg-green-800 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
          style={{ width: `${downloadProgress}%` }}
        >
          {' '}
          {downloadProgress}%
        </div>
      </div>
    </div>
  );
};

export default DownloadProgress;
