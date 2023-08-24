import React from 'react';
import { faker } from '@faker-js/faker';

const AssignmentCard = () => {
  return (
    <div
      className="p-4 mx-10 text-green-800 border cursor-pointer border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
      role="alert"
    >
      <div className="flex items-center">
        <span className="sr-only">Info</span>
        <h3 className="text-lg font-medium">{faker.word.noun()}</h3>
      </div>
      <div className="mt-2 mb-4 text-sm flex w-full justify-between">
        {'Due September 11, 2023 11:59 PM'}
        <div className="font-bold">
          {faker.number.int({ max: 50, min: 1 })}/ 50 Submitted
        </div>
      </div>
      <div className="flex">
        <button
          type="button"
          className="text-white bg-green-800 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center"
        >
          Update Assignment
        </button>
        <button
          type="button"
          className="text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center"
          data-dismiss-target="#alert-additional-content-3"
          aria-label="Close"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AssignmentCard;
