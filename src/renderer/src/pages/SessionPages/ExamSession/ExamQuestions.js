import React from 'react';
import AddButtons from '../../../components/classrooms/ExamSession.js/AddButtons';
import MCQsForm from './MCQsForm';
const ExamQuestions = () => {
  const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Fig', 'Grape'];

  return (
    <div className=" w-5/6">
      <h1 className="my-4 text-xl text-center font-semibold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        Add Questions
      </h1>
      <AddButtons />
      <div className="mx-5 my-3">
        <MCQsForm />
        <p>1. Which of the following are the advantages of React.js?</p>
        <ol type="A">
      
        </ol>
      </div>
    </div>
  );
};

export default ExamQuestions;
