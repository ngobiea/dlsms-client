import React, { useContext } from 'react';
import Input from '../../../components/App/Input';
import DateInput from '../../../components/App/DateInput';
import RealtimeContext from '../../../context/realtimeContext';
import FileInput from '../../../components/App/FileInput';
import AccountContext from '../../../context/accountContext';

const CreateAssignment = () => {
  const { register, handleSubmit, errors } = useContext(AccountContext);
  const handleCrateAssignment = (data) => {
    
  };

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
              <button
                type="button"
                className="py-2.5 px-7 mr-5 mb-2 text-sm font-medium text-green-500 focus:outline-none bg-white rounded-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
              >
                Cancel
              </button>
              <button
                // disabled={isTimeBeforeDate(time, date)}
                type="submit"
                className="py-2.5 px-7 mr-2 mb-2 text-sm font-medium text-white focus:outline-none rounded-md border bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 "
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

          <FileInput reg={register} />
          <div className="mx-7 my-7 grid sm:grid-cols-2 sm:gap-6 mt-5">
            <DateInput />
            <TimeInput />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAssignment;
