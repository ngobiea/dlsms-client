import React from 'react';

const WelcomeMessage = () => {
  return (
    <>
      <div className="w-full h-welcome p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          Welcome to the Classroom
        </h5>
        <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
          Stay up to date with class activities and notifications
        </p>
 
      </div>
    </>
  );
};

export default WelcomeMessage;
