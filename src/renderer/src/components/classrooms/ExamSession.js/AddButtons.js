import React, { useEffect } from 'react';
import { generateUniqueId } from '../../../utils/util';
import { useDispatch, useSelector } from 'react-redux';
import {
  addQuestion,
  setShowExamSession,
  usePostSaveExamSessionMutation,
  setExamSessionIdStep,
  setIsShowExamConfirm,
} from '../../../store';

const AddButtons = () => {
  const dispatch = useDispatch();
  const { examSessionId } = useSelector((state) => state.examSession);
  console.log(examSessionId);
  const [postSaveExamSession, { isSuccess, data }] =
    usePostSaveExamSessionMutation();
  useEffect(() => {
    if (isSuccess) {
      dispatch(setIsShowExamConfirm(false));
      dispatch(setShowExamSession(false));
      dispatch(setExamSessionIdStep({ examSessionId: '', step: 'setup' }));
    }
  }, [isSuccess]);
  return (
    <div className="mx-5 flex justify-between">
      <div className="flex">
        <p className=" text-2xl text-title font-bold self-center">Add:</p>
        <button
          onClick={() => {
            dispatch(addQuestion({ type: 'mcqForm', id: generateUniqueId() }));
          }}
          className="text-white mx-2 flex bg-sidebar hover:bg-sidebarHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          MCQs
        </button>
        <button
          onClick={() => {
            dispatch(addQuestion({ type: 'sqForm', id: generateUniqueId() }));
          }}
          className="text-white mx-2 flex bg-sidebar hover:bg-sidebarHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Short Qs
        </button>

        <button
          onClick={() => {
            dispatch(addQuestion({ type: 'lqForm', id: generateUniqueId() }));
          }}
          className="text-white mx-2 flex bg-sidebar hover:bg-sidebarHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Long Qs
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            postSaveExamSession({ examSessionId });
          }}
          className="text-white mx-2 flex bg-sidebar hover:bg-sidebarHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Post Exam Session
        </button>
      </div>
    </div>
  );
};

export default AddButtons;
