import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { usePostSubmitAnswersMutation } from '../../../store';
const examSessionId = localStorage.getItem('examSessionId');

const SubmitButtons = () => {
  const { mcqQuestions } = useSelector((state) => state.examSession);
  const [postSubmitExamSession, { isSuccess, data, isError, error }] =
    usePostSubmitAnswersMutation();
  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      window.account.closeExamQuestionWindow();
    }
    if (isError) {
      console.log(error);
    }
  }, [isSuccess, error]);
  const handleSubmit = () => {
    postSubmitExamSession({
      answers: JSON.stringify(mcqQuestions),
      examSessionId,
    });
  };

  return (
    <div className="mx-5 flex justify-between px-44">
      <div className="flex">
        <p className=" text-2xl text-title font-bold self-center">Questions</p>
      </div>
      <div>
        <button
          onClick={handleSubmit}
          className="text-white mx-2 flex bg-sidebar hover:bg-sidebarHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit Questions
        </button>
      </div>
    </div>
  );
};

export default SubmitButtons;
