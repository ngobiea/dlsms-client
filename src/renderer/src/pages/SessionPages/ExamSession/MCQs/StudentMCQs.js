import React from 'react';
import { MdOutlineCheckCircleOutline, MdClose } from 'react-icons/md';

const ascii = 97;
const StudentMCQs = ({ question, index }) => {
  return (
    <div className=" text-green-600 mt-3">
      <div className=" relative w-full">
        <div className=" font-bold w-11/12">
          Q{index + 1}: {question.question} {question.points} points
        </div>
      </div>

      <div className="ml-5">
        {question.options.map((option, pos) => {
          return (
            <div key={option.optionId} className="ml-5">
              {String.fromCharCode(ascii + pos)}) {option.value}
              {option.optionId === question.correctOption && (
                <span>
                  {question.isCorrect ? (
                    <MdOutlineCheckCircleOutline className="inline-block ml-2 text-green-500" />
                  ) : (
                    <MdClose className="inline-block ml-2 text-red-500" />
                  )}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentMCQs;
