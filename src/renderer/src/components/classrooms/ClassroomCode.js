import React, { useEffect, useRef, useState } from 'react';
import { ipcRenderer } from 'electron';
import { MdClose, MdContentCopy } from 'react-icons/md';
import { setShowCode } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
const ClassroomCode = () => {
  const dispatch = useDispatch();
  const { code } = useSelector((state) => {
    return state.classroom;
  });
  const [copy, setCopy] = useState('Copy');
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.select();
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full py-12 overflow-x-hidden  bg-black bg-opacity-50 backdrop-filter overflow-y-auto md:inset-0 h-full max-h-full">
      <div className="container mx-auto mt-24 w-11/12 md:w-2/3 max-w-lg">
        <div className="relative py-8 px-5 md:px-10 bg-white opacity-100 shadow-md rounded border border-gray-400">
          <button
            onClick={() => {
              setCopy('Copy');
              dispatch(setShowCode(false));
            }}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400  bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <MdClose className="text-lg text-title" />
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-title dark:text-white">
              Get a code to the classroom
            </h3>

            <div className="flex">
              <input
                type="text"
                ref={inputRef}
                value={code}
                readOnly
                className="block p-2.5 w-full text-sm text-center text-green-900 bg-green-50 rounded-l-lg border-r-green-50 border-l-2  border-green-300 focus:ring-title focus:border-title focus:border-0"
              />
              <button
                onClick={() => {
                  setCopy('Copied');
                  ipcRenderer.send('copyCode');
                }}
                type="submit"
                className="flex items-center justify-center p-2.5 text-sm font-medium text-white bg-green-700 rounded-r-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300"
              >
                <MdContentCopy className="w-5 h-5 align-middle mr-2" />
                <p className="">{copy}</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClassroomCode;
