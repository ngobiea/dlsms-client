import React from 'react';

const Skeleton = () => {
  return (
    <div className=" px-4 pt-10">
      <div role="status" className="max-w-sm animate-pulse">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        <span className="sr-only">Loading...</span>
      </div>
      <div className="bg-white rounded-lg shadow-md  animate-pulse">
        <div className="w-2/3 h-4 bg-gray-300 rounded mb-2"></div>
        <div className="w-full h-8 bg-gray-300 rounded mb-2"></div>
        <div className="w-full h-8 bg-gray-300 rounded mb-2"></div>
        <div className="w-1/2 h-8 bg-gray-300 rounded"></div>
      </div>

      <div role="status" className="max-w-sm animate-pulse">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        <span className="sr-only">Loading...</span>
      </div>
      <div className="bg-white rounded-lg shadow-md  animate-pulse">
        <div className="w-2/3 h-4 bg-gray-300 rounded mb-2"></div>
        <div className="w-full h-8 bg-gray-300 rounded mb-2"></div>
        <div className="w-full h-8 bg-gray-300 rounded mb-2"></div>
        <div className="w-1/2 h-8 bg-gray-300 rounded"></div>
      </div>
      <div role="status" className="max-w-sm animate-pulse">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        <span className="sr-only">Loading...</span>
      </div>
      <div className="bg-white rounded-lg shadow-md  animate-pulse">
        <div className="w-2/3 h-4 bg-gray-300 rounded mb-2"></div>
        <div className="w-full h-8 bg-gray-300 rounded mb-2"></div>
        <div className="w-full h-8 bg-gray-300 rounded mb-2"></div>
        <div className="w-1/2 h-8 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default Skeleton;
