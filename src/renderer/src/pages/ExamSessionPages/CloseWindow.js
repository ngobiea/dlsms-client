import React from 'react';

const CloseWindow = ({ message }) => {
  return (
    <>
      <div className="relative  w-full  h-full">
        <div className="relative top-56 left-96 bg-gray-200 w-6/12 h-96 rounded-lg shadow dark:bg-gray-700">
          <div className="p-6 text-center">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-5 mt-24 text-lg font-normal text-gray-500 dark:text-gray-400">
              {message}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default CloseWindow;
