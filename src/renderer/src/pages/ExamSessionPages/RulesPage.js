import React from 'react';
import { AiOutlineArrowRight, AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const RulesPage = () => {
  return (
    <div className="overflow-y-auto overflow-x-hidden overscroll-contain h-full w-full">
      <div className="p-8">
        <div className="bg-white p-4 rounded-lg shadow-xl py-8 mt-12">
          <h4 className="text-4xl font-bold text-gray-800 tracking-widest uppercase text-center">
            Exam Rules
          </h4>
          <p className="text-center text-gray-600 text-lg mt-2 font-bold">
            To join this classroom you should familiarize yourself with the
            rules of the classroom and give permission to the conditions of the
            software
          </p>
          <div className="grid grid-cols-1  gap-4 xl:gap-12 px-2 xl:px-12 mt-4">
            <div className="flex space-x-8 mt-8">
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
                <h4 className="text-xl font-bold text-gray-700">
                  Respect for other students
                </h4>
                <p className="text-gray-600 my-2">
                  You are to respect other students in the class and not to use
                  any form of abusive language
                </p>
              </div>
            </div>

            <div className="flex space-x-8 mt-8">
              <div>
                <h4 className="text-xl font-bold text-gray-700">
                  Assignment Submission
                </h4>
                <p className="text-gray-600 my-2">
                  You are to submit your assignment before the deadline and not
                  to submit any assignment after the deadline
                </p>
              </div>
            </div>

            <div className="flex space-x-8 mt-8">
              <div>
                <h4 className="text-xl font-bold text-gray-700">
                  Respect for the invigilator
                </h4>
                <p className="text-gray-600 my-2">
                  You are to respect the invigilator and not to use any form of
                  disrespectful language to the invigilator
                </p>
              </div>
            </div>

            <div className="flex space-x-8 mt-8">
              <div></div>
              <div>
                <h4 className="text-xl font-bold text-gray-700">Attendance</h4>
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
                to={`verify`}
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
  );
};
export default RulesPage;
