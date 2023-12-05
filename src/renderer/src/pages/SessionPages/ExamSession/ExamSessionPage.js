import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import SubmitButtons from '../../../components/classrooms/ExamSession.js/SubmitButtons';
import MCQsView from './MCQs/MCQsView';
import LQs from './LQs/LQs';
import SQs from './SQs/SQs';
const examSessionId = localStorage.getItem('examSessionId');
console.log(examSessionId);

import { useGetQuestionsQuery, setQuestions } from '../../../store';

const ExamSessionPage = () => {
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.examSession);

  const { data, isSuccess, isError, error } =
    useGetQuestionsQuery(examSessionId);
  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      dispatch(setQuestions(data.questions));
    }
    if (isError) {
      console.log(error);
    }
  }, [data, isSuccess]);
  return (
    <div className="w-full h-full flex flex-col justify-center pt-10 px-48">
      <div className="w-full py-2 fixed top-10 bg-gray-300 left-0 z-40">
        <SubmitButtons />
      </div>
      <div className="px-5 pb-10 relative z-10 mt-10 h-5/6 ">
        {questions.map((question, index) => {
          if (question.type === 'mcq') {
            return (
              <MCQsView key={question._id} question={question} index={index} />
            );
          } else if (question.type === 'sq') {
            return <SQs key={question._id} question={question} index={index} />;
          } else if (question.type === 'lq') {
            return <LQs key={question._id} question={question} index={index} />;
          } else {
            return <div key={question._id}>Question Type Not Found</div>;
          }
        })}
      </div>
    </div>
  );
};

export default ExamSessionPage;
