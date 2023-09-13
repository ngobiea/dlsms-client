import React, { useEffect } from 'react';
import { MdClose, MdOutlineCheckCircleOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeQuestion,
  useDeleteExamQuestionMutation,
} from '../../../../store';
const ascii = 97;
const MCQs = ({ question, index }) => {
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
    <div className=" text-green-600 mt-3">
      <div className=" relative w-full">
        <div className=" font-bold w-11/12">
          Q{index + 1}: {question.question} {question.points} points
        </div>
        <div
          onClick={handleDeleteQuestion}
          className="  absolute top-0 right-5 cursor-pointer"
        >
          <MdClose className=" font-bold text-2xl text-red-500" />
        </div>
      </div>

      <div className="ml-5">
        {question.options.map((option, pos) => {
          return (
            <div key={option.optionId} className="ml-5">
              {String.fromCharCode(ascii + pos)}) {option.value}
              {option.optionId === question.correctOption && (
                <MdOutlineCheckCircleOutline className="inline-block ml-2 text-green-500" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MCQs;
