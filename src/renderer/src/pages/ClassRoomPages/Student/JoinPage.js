import React from 'react';
import { AiOutlineArrowRight, AiOutlineClose } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';
import { usePostJoinMutation } from '../../../store';

const JoinPage = () => {
  const params = useParams();
  const { classroomId } = params;

  const [postJoin, { isSuccess, data }] = usePostJoinMutation();
  const handlePostJoin = () => {
    const value = {
      classroomId,
    };

    postJoin(value);
  };
  return (
    <div className='relative w-screen h-screen'>
      <div className="overflow-y-auto overscroll-contain h-full w-full">
        <div className="p-8 ml-20">
          <div className="bg-white p-4 rounded-lg shadow-xl py-8 mt-12">
            <h4 className="text-4xl font-bold text-gray-800 tracking-widest uppercase text-center">
              Classroom Rules
            </h4>
            <p className="text-center text-gray-600 text-lg mt-2 font-bold">
              To join this classroom you should familiarize yourself with the
              rules of the classroom and give permission to the conditions of
              the software
            </p>
            <div className="grid grid-cols-1  gap-4 xl:gap-12 px-2 xl:px-12 mt-4">
              <div className="flex space-x-8 mt-8">
                <div>
                  {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  ></path>
                </svg> */}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-700">
                    Provide Image
                  </h4>
                  <p className="text-gray-600 my-2">
                    You are to provide three images of yourself, Which will be
                    used by to identify you in any class or exam session
                  </p>
                </div>
              </div>

              <div className="flex space-x-8 mt-8">
                <div>
                  {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg> */}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-700">
                    WebCam and Microphone Access
                  </h4>
                  <p className="text-gray-600 my-2">
                    You give your consent to the audio and video recording and
                    subsequent storage of any class or exam session;
                  </p>
                </div>
              </div>

              <div className="flex space-x-8 mt-8">
                <div>
                  {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                  ></path>
                </svg> */}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-700">
                    Respect for other students
                  </h4>
                  <p className="text-gray-600 my-2">
                    You are to respect other students in the class and not to
                    use any form of abusive language
                  </p>
                </div>
              </div>

              <div className="flex space-x-8 mt-8">
                <div>
                  {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  ></path>
                </svg> */}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-700">
                    Assignment Submission
                  </h4>
                  <p className="text-gray-600 my-2">
                    You are to submit your assignment before the deadline and
                    not to submit any assignment after the deadline
                  </p>
                </div>
              </div>

              <div className="flex space-x-8 mt-8">
                <div>
                  {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                  ></path>
                </svg> */}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-700">
                    Respect for the invigilator
                  </h4>
                  <p className="text-gray-600 my-2">
                    You are to respect the invigilator and not to use any form
                    of disrespectful language to the invigilator
                  </p>
                </div>
              </div>

              <div className="flex space-x-8 mt-8">
                <div></div>
                <div>
                  <h4 className="text-xl font-bold text-gray-700">
                    Attendance
                  </h4>
                  <p className="text-gray-600 my-2">
                    You are to attend all scheduled classes and examinations
                    sessions at the stipulated time
                  </p>
                </div>
              </div>

              <div className="flex justify-between">
                <Link
                  to="/"
                  type="button"
                  className="text-green-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-4 focus:ring-gray-200   font-medium text-sm px-5 py-2.5 text-center inline-flex items-center"
                >
                  CANCEL
                  <AiOutlineClose className="w-5 h-5 ml-2 -mr-1" />
                </Link>
                <Link
                  onClick={handlePostJoin}
                  to={`/${classroomId}`}
                  // to={`../${classroomId}/image`}
                  type="button"
                  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  ACCEPT
                  <AiOutlineArrowRight className="w-5 h-5 ml-2 -mr-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default JoinPage;
