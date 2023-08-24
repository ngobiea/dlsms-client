import React from 'react';
import { MdOutlinePictureAsPdf } from 'react-icons/md';
const SenderMessage = ({ file, message }) => {
  return (
    <div className="bg-green-800 transition duration-350 ease-in-out ml-96 rounded-lg rounded-br-none">
      <div className="flex items-center pl-3 ">
        <p className="text-base leading-6 font-medium mr-2 text-white">
          Sonata Hiram
        </p>
        <p className="text-xs leading-6 font-medium text-white">
          4/28 8:27 AM
        </p>
      </div>

      {message && (
        <div className="pl-3 pb-1">
          <p className="text-base width-auto font-medium text-white flex-shrink">
            Day 07 of the challenge #100DaysOfCode I was wondering what I can do
            with #tailwindcss , so just started building Twitter UI using
            Tailwind and so far it looks so promising. I will post my code after
            completion. [07/100] #WomenWhoCode #CodeNewbie
          </p>
        </div>
      )}
      {file && (
        <div
          id="alert-additional-content-3"
          className="p-2 rounded-tl-none rounded-tr-none rounded-br-none text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
          role="alert"
        >
          <div className="flex justify-between">
            <div className="flex">
              <MdOutlinePictureAsPdf className="text-green-800 text-4xl mr-5" />
              <p className="font-bold self-center">First Exam Session</p>
            </div>
            <button
              type="button"
              className="text-green-800 bg-transparent border border-green-800 hover:bg-green-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-green-600 dark:border-green-600 dark:text-green-400 dark:hover:text-white dark:focus:ring-green-800"
              data-dismiss-target="#alert-additional-content-3"
              aria-label="Close"
            >
              View
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SenderMessage;
