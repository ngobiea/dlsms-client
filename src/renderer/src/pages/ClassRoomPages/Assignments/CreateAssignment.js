import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../../components/App/Input';
import FileInput from '../../../components/App/FileInput';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeAllFiles,
  setEndDate,
  usePostAssignmentMutation,
} from '../../../store';
import DateInput from '../../../components/App/DateInput';
import { useNavigate } from 'react-router-dom';
const CreateAssignment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { files, endDate } = useSelector((state) => state.app);
  const { classroomId } = useSelector((state) => state.classroom);
  const {
    register,
    handleSubmit,
    resetField,
    reset,
    formState: { errors },
  } = useForm();
  const [postAssignment, { isSuccess, data, isError, error }] =
    usePostAssignmentMutation();
  
  const handleCrateAssignment = (formData) => {
    console.log('create assignment');
    console.log(formData);
    console.log(files);
    console.log(endDate);
    const assignment = new FormData();
    assignment.append('title', formData.title);
    assignment.append('points', formData.points);
    assignment.append('instruction', formData.instruction);
    assignment.append('dueDate', endDate);
    if (files.length > 0) {
      files.forEach((file) => {
        assignment.append('files', file);
      });
    }
    postAssignment({ assignment, classroomId });
  };
  const handleEndDateChange = (selected) => {
    if (selected.toDate !== undefined) {
      dispatch(setEndDate(selected.toDate().toISOString()));
    }
  };
  useEffect(() => {
    if (isSuccess) {
      resetField('title');
      resetField('points');
      resetField('instruction');
      reset();
      dispatch(removeAllFiles());
      console.log(data);
      navigate('/' + classroomId);
    } else if (isError) {
      console.log(error);
    }
  }, [isSuccess, isError]);

  return (
    <div className="bg-white-full h-full">
      <div className="flex flex-col h-full">
        <form
          onSubmit={handleSubmit(handleCrateAssignment)}
          className="mr-16 h-full"
        >
          <div className="flex justify-between px-2 pt-3 pb-2 mt-4 mx-5 border-b-2 border-gray-200">
            <p className="text-4xl font-normal text-green-800 dark:text-white">
              New Assignment
            </p>
            <div>
              <span className="py-2.5 px-7 mr-5 mb-2 text-sm font-medium text-green-500 focus:outline-none bg-white rounded-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700">
                Cancel
              </span>
              <button
                type="submit"
                className="py-2.5 px-7 mr-2 mb-2 text-sm font-medium text-white focus:outline-none rounded-md border bg-green-700 hover:bg-green-800"
              >
                Assign
              </button>
            </div>
          </div>
          <div className="ml-7 my-7 grid sm:grid-cols-2 sm:gap-6 mt-5">
            <Input
              reg={register}
              labelText={'Title'}
              inputValue={'title'}
              type={'text'}
              valid={{ required: true }}
              errorMessage={'Title is required'}
              errors={errors}
            />
            <Input
              reg={register}
              labelText={'Points'}
              inputValue={'points'}
              type={'number'}
              valid={{ required: true }}
              errorMessage={'Points is required'}
              errors={errors}
            />
          </div>
          <div className="mx-7 my-7">
            <Input
              reg={register}
              labelText={'Instruction'}
              inputValue={'instruction'}
              type={'text'}
              valid={{ required: true }}
              errorMessage={'Instructions is required'}
              errors={errors}
            />
          </div>
          <div className="mx-7 my-7">
            <DateInput
              handleDateTimeChange={handleEndDateChange}
              label={'Due Date'}
              value={new Date(endDate)}
            />
          </div>

          <FileInput />
        </form>
      </div>
    </div>
  );
};

export default CreateAssignment;
