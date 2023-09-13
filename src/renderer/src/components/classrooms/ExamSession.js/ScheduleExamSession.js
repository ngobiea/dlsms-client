import React from 'react';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import ExamSessionSetupForm from '../../../pages/SessionPages/ExamSession/ExamSessionSetupForm';
import ExamQuestions from '../../../pages/SessionPages/ExamSession/ExamQuestions';
import { setIsShowExamConfirm } from '../../../store';

const ScheduleExamSession = () => {
  const dispatch = useDispatch();
  const { step } = useSelector((state) => state.examSession);

  return (
    <div className="fixed top-0 left-0 right-0 z-40 w-full py-12 overflow-x-hidden  overflow-y-hidden  bg-black bg-opacity-50 backdrop-filter  md:inset-0 h-full max-h-full">
      <div className="container mx-auto max-w-7xl h-full">
        <div className="relative py-8 px-5 md:px-10 bg-white h-full opacity-100 shadow-md rounded border border-gray-400">
          <button
            onClick={() => {
              dispatch(setIsShowExamConfirm(true));
            }}
            type="button"
            className="absolute top-3 right-2.5 text-red-700  bg-transparent hover:bg-gray-200 hover:text-red-900 rounded-lg text-2xl font-bold p-1.5 ml-auto inline-flex items-center"
            data-modal-hide="authentication-modal"
          >
            <MdClose className="text-lg text-title" />
          </button>
          {step === 'setup' && <ExamSessionSetupForm />}
          {step === 'question' && <ExamQuestions />}
        </div>
      </div>
    </div>
  );
};

export default ScheduleExamSession;
