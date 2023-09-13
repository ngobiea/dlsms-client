import React from 'react';
import AddButtons from '../../../components/classrooms/ExamSession.js/AddButtons';
import MCQsForm from './MCQs/MCQsForm';
import MCQs from './MCQs/MCQs';
import LQsForm from './LQs/LQsForm';
import { useSelector } from 'react-redux';
import SQsForm from './SQs/SQsForm';
import LQs from './LQs/LQs';
import SQs from './SQs/SQs';

const ExamQuestions = () => {
  const { questions } = useSelector((state) => state.examSession);

  return (
    <div className="h-full pb-20 relative">
      <div className=" h-1/6 relative z-40">
        <h1 className="my-4 text-xl text-center font-semibold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          Add Questions
        </h1>
        <AddButtons />
      </div>
      <div className="px-5 relative z-10 mt-10 h-5/6 overflow-scroll overflow-x-hidden">
        {questions.map((question, index) => {
          if (question.type === 'mcqForm') {
            return <MCQsForm key={question.id} />;
          } else if (question.type === 'sqForm') {
            return <SQsForm key={question.id} />;
          } else if (question.type === 'lqForm') {
            return <LQsForm key={question.id} />;
          } else if (question.type === 'mcq') {
            return <MCQs key={question.id} question={question} index={index} />;
          } else if (question.type === 'sq') {
            return <SQs key={question.id} question={question} index={index} />;
          } else if (question.type === 'lq') {
            return <LQs key={question.id} question={question} index={index} />;
          } else {
            return <div key={question.id}>Question Type Not Found</div>;
          }
        })}
      </div>
    </div>
  );
};

export default ExamQuestions;
