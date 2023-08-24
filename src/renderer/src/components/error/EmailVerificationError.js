import React from 'react';
import { useResendEmailVerificationMutation } from '../../store';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const EmailVerificationError = ({ error, reset }) => {
  const { email } = useSelector((state) => {
    return state.account;
  });
  const [resendEmailVerification, result] =
    useResendEmailVerificationMutation();

  if (result.isSuccess) {
    reset();
  }


  return (
    <div
      id="alert-additional-content-4"
      className="p-4 flex justify-between mb-4 text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800"
      role="alert"
    >
      <div className="flex items-center">
        <span className="sr-only">Info</span>
        <h3 className=" font-medium">{error.data.message}</h3>
      </div>
      <div className="mt-2 mb-4 text-sm"></div>
      <div className="flex">
        <button
          onClick={() => {
            resendEmailVerification({ email });
          }}
          type="button"
          className="text-white bg-yellow-800 hover:bg-yellow-900 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-yellow-300 dark:text-gray-800 dark:hover:bg-yellow-400 dark:focus:ring-yellow-800"
        >
          Resend Verification code
        </button>
        <button
          onClick={() => {
            reset();
            if (result.isError) {
              result.reset();
            }
          }}
          type="button"
          className="text-yellow-800 bg-transparent border border-yellow-800 hover:bg-yellow-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-gray-800 dark:focus:ring-yellow-800"
          data-dismiss-target="#alert-additional-content-4"
          aria-label="Close"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default EmailVerificationError;
