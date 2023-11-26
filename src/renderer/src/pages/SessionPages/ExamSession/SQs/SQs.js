import React, { useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeQuestion,
  useDeleteExamQuestionMutation,
} from '../../../../store';
const SQs = ({ question, index }) => {
  const dispatch = useDispatch();
  const { examSessionId } = useSelector((state) => state.examSession);
  const [deleteExamQuestion, { isSuccess, data }] =
    useDeleteExamQuestionMutation();
  const handleDeleteQuestion = () => {
    deleteExamQuestion({ examSessionId, id: question.id });
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(removeQuestion(data.id));
    }
  }, [isSuccess]);
  return (
    <div className=" mt-5">
      <div className=" relative w-full">
        <div className=" font-bold w-11/12">
          Q{index + 1}: {question.question} {question.points} points
        </div>
        <div
          onClick={handleDeleteQuestion}
          className="  absolute top-0 right-5 cursor-pointer"
          tabIndex={0} // Add tabIndex attribute to make it focusable
        >
          <MdClose className=" font-bold text-2xl text-red-500" />
        </div>
      </div>
      <div>Reference materials</div>
      {question.files.map((file) => {
        return (
          <div
            key={file.key}
            className="inline-flex p-2 mb-4 mt-3 mr-3 text-green-800 border-t-4 border-green-300 bg-green-50 "
          >
            <div className="ml-3 text-sm font-medium">{file.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default SQs;
