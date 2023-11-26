import React, { useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { useForm, useFieldArray } from 'react-hook-form';
import { generateClassroomCode } from '../../../../utils/util';
import {
  setCorrectOption,
  addQuestion,
  usePostExamQuestionMutation,
} from '../../../../store';
import Input from '../../../../components/App/Input';
import Toggle from 'react-toggle';
import { useSelector, useDispatch } from 'react-redux';

const minOptions = 3;

const MCQsForm = () => {
  const dispatch = useDispatch();
  const [postExamQuestion, { isSuccess, data }] = usePostExamQuestionMutation();
  const { correctOption, examSessionId } = useSelector(
    (state) => state.examSession
  );

  const defaultValues = {
    question: '',
    points: '',
    options: [
      { optionId: correctOption },
      { optionId: generateClassroomCode() },
      { optionId: generateClassroomCode() },
      { optionId: generateClassroomCode() },
    ],
  };

  const {
    register,
    handleSubmit,
    resetField,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
    rules: { required: true },
  });

  const onSubmit = (formData) => {
    const question = new FormData();
    question.append('question', formData.question);
    question.append('points', formData.points);
    question.append('type', 'mcq');
    question.append('correctOption', correctOption);
    question.append('options', JSON.stringify(formData.options));

    postExamQuestion({ question, examSessionId });
  };
  useEffect(() => {
    if (isSuccess) {
      resetField('question');
      resetField('points');
      reset();
      console.log(data);
      dispatch(addQuestion(data));
    }
  }, [isSuccess]);

  return (
    <div className="my-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" w-full flex">
          <div className=" w-10/12 mr-3">
            <Input
              focus={true}
              reg={register}
              labelText={'Question'}
              inputValue={'question'}
              valid={{ required: true }}
              errorMessage={'Question Name is required and unique'}
              errors={errors}
            />
          </div>
          <div className=" w-2/12">
            <Input
              type={'number'}
              reg={register}
              labelText={'Points'}
              inputValue={'points'}
              valid={{ required: true }}
              errorMessage={'Question Name is required and unique'}
              errors={errors}
            />
          </div>
        </div>
        <button
          onClick={() => {
            append({ optionId: generateClassroomCode() });
          }}
          className="text-white cursor-pointer bg-sidebar hover:bg-sidebarHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center"
        >
          Add Option
        </button>
        <div className="flex w-full my-3">
          <p className=" w-1/2">Questions Options</p>
          <div className=" w-1/2 flex justify-around">
            <p>Correct Option</p>
            <p>Delete Option</p>
          </div>
        </div>
        {fields.map((field, index) => {
          return (
            <div key={field.id} className="flex w-full">
              <div className=" w-1/2">
                <Input
                  reg={register}
                  labelText={`Option ${index + 1}`}
                  inputValue={`options.${index}.value`}
                  valid={{ required: true }}
                  errorMessage={`Option ${index + 1} is required and unique`}
                  errors={errors}
                />
              </div>
              <div className=" w-1/2 self-center flex justify-around">
                <Toggle
                  onChange={() => {
                    dispatch(setCorrectOption(field.optionId));
                  }}
                  icons={false}
                  checked={correctOption === field.optionId}
                />
                <MdClose
                  onClick={() => {
                    if (fields.length < minOptions) {
                      return;
                    }
                    remove(index);
                  }}
                  className=" self-center text-2xl font-extrabold text-green-800 cursor-pointer"
                />
              </div>
            </div>
          );
        })}
        <div>
          <button className="text-white flex  bg-sidebar hover:bg-sidebarHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
            Submit Question
          </button>
        </div>
      </form>
    </div>
  );
};

export default MCQsForm;
