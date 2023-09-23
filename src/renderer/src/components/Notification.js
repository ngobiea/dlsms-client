import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setNotification } from '../store';

const Notification = ({ type }) => {
  const dispatch = useDispatch();
  const { notification } = useSelector((state) => state.app);

  useEffect(() => {
    setTimeout(() => {
      dispatch(
        setNotification({
          isActive: false,
          type: 'success',
          title: 'Success',
          message: '',
        })
      );
    }, 5000);
  }, []);
  const successClass =
    'fixed bottom-0 right-0 z-40 p-4 w-1/2  text-green-800 border border-green-300 rounded-lg bg-green-100';
  const errorClass =
    'fixed bottom-0 right-0 z-40 p-4 w-1/2  text-red-800 border border-red-300 rounded-lg bg-red-100';
  const warningClass =
    'fixed bottom-0 right-0 z-40 p-4 w-1/2  text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-100';
  const successButtonClass =
    'text-white bg-green-800 hover:bg-green-900 focus:outline-none font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center';
  const errorButtonClass =
    'text-white bg-red-800 hover:bg-red-900  focus:outline-none font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center';
  const warningButtonClass =
    'text-white bg-yellow-800 hover:bg-yellow-900 focus:outline-none font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center';
  const successDismissButtonClass =
    'text-green-800 bg-transparent border border-green-800 hover:bg-green-900 hover:text-white focus:outline-none font-medium rounded-lg text-xs px-3 py-1.5 text-center';
  const errorDismissButtonClass =
    'text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:outline-none font-medium rounded-lg text-xs px-3 py-1.5 text-center';
  const warningDismissButtonClass =
    'text-yellow-800 bg-transparent border border-yellow-800 hover:bg-yellow-900 hover:text-white focus:outline-none font-medium rounded-lg text-xs px-3 py-1.5 text-center';

  return (
    <div
      className={
        notification.type === 'success'
          ? successClass
          : notification.type === 'error'
          ? errorClass
          : warningClass
      }
    >
      <div className="flex items-center">
        <svg
          className="flex-shrink-0 w-4 h-4 mr-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <h3 className="text-lg font-medium">{notification.title}</h3>
      </div>
      <div className="mt-2 mb-4 text-sm">{notification.message}</div>
      <div className="flex">
        <button
          type="button"
          className={
            notification.type === 'success'
              ? successButtonClass
              : notification.type === 'error'
              ? errorButtonClass
              : warningButtonClass
          }
        >
          <svg
            className="-ml-0.5 mr-2 h-3 w-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 14"
          >
            <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
          </svg>
          View more
        </button>
        <button
          type="button"
          className={
            type === 'success'
              ? successDismissButtonClass
              : type === 'error'
              ? errorDismissButtonClass
              : warningDismissButtonClass
          }
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default Notification;
