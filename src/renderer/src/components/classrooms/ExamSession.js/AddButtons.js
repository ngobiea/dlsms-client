import React from 'react';

const AddButtons = () => {
  return (
    <div className="mx-5 flex">
      <p className=" text-2xl text-title font-bold self-center">Add:</p>
      <button
        onClick={() => {}}
        className="text-white mx-2 flex bg-sidebar hover:bg-sidebarHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Short Qs
      </button>
      <button
        onClick={() => {}}
        className="text-white mx-2 flex bg-sidebar hover:bg-sidebarHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        MCQs
      </button>
      <button
        onClick={() => {}}
        className="text-white mx-2 flex bg-sidebar hover:bg-sidebarHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Long Qs
      </button>
      <button
        onClick={() => {}}
        className="text-white mx-2 flex bg-sidebar hover:bg-sidebarHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        File Qs
      </button>
    </div>
  );
};

export default AddButtons;
