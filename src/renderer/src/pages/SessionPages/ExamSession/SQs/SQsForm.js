import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../../../components/App/Input';
import FileInput from '../../../../components/App/FileInput';
import { useDispatch, useSelector } from 'react-redux';
import {
  addQuestion,
  removeAllFiles,
  usePostExamQuestionMutation,
} from '../../../../store';

const SQsForm = () => {
  const dispatch = useDispatch();
  const { examSessionId } = useSelector((state) => state.examSession);
  const { files } = useSelector((state) => state.app);
  const [postExamQuestion, { isSuccess, data }] = usePostExamQuestionMutation();
  const {
    register,
    handleSubmit,
    resetField,
    reset,
    formState: { errors },
  } = useForm();


  const onSubmit = (formData) => {
    const question = new FormData();
    question.append('question', formData.question);
    question.append('points', formData.points);
    question.append('type', 'sq');
    if (files.length > 0) {
      files.forEach((file) => {
        question.append('files', file);
      });
    }
    postExamQuestion({ question, examSessionId });
  };
  useEffect(() => {
    if (isSuccess) {
      resetField('question');
      resetField('points');
      reset();
      dispatch(removeAllFiles());
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
              focus={true}
              reg={register}
              labelText={'Points'}
              inputValue={'points'}
              valid={{ required: true }}
              errorMessage={'Question Name is required and unique'}
              errors={errors}
            />
          </div>
        </div>
        <FileInput />
        <div>
          <button className="text-white flex  bg-sidebar hover:bg-sidebarHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
            Submit Question
          </button>
        </div>
      </form>
    </div>
  );
};

export default SQsForm;
