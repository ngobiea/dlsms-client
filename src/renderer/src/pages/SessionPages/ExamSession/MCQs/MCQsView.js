import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setStudentCorrectOption,
} from '../../../../store';
import Toggle from 'react-toggle';

const ascii = 97;
const MCQsView = ({ question, index }) => {
  const dispatch = useDispatch();
  const { examSessionId } = useSelector((state) => state.examSession);

  return (
    <div className=" text-green-600 mt-3">
      <div className=" relative w-full">
        <div className=" font-bold w-11/12">
          Q{index + 1}: {question.question} {question.points} points
        </div>
      </div>

      <div className="pt-2">
        {question.options.map((option, pos) => {
          return (
            <div key={option.optionId} className="flex w-full ">
              <div className=" w-1/12 self-center">
                <Toggle
                  onChange={() => {
                    dispatch(
                      setStudentCorrectOption({
                        questionId: question._id,
                        optionId: option.optionId,
                      })
                    );
                  }}
                  icons={false}
                  checked={question.correctOption === option.optionId}
                />
              </div>
              <div className="w-11/12">
                {String.fromCharCode(ascii + pos)}) {option.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MCQsView;
