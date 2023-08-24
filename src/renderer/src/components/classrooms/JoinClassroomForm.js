import React, { useContext, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import Input from '../App/Input';
import { setJoinClassroom, useVerifyClassroomCodeMutation } from '../../store';
import { useDispatch } from 'react-redux';
import ErrorMessage from '../error/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import AccountContext from '../../context/accountContext';
const JoinClassroomForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, errors, resetField, reset } =
    useContext(AccountContext);
  const dispatch = useDispatch();
  const [verifyClassroomCode, { isSuccess, data, isError, error }] =
    useVerifyClassroomCodeMutation();
  useEffect(() => {
    if (isSuccess) {
      const classroomId = data.classroomId._id;
      dispatch(setJoinClassroom(false));
      resetField('code');
      navigate(classroomId + '/join');
    }
  }, [isSuccess]);

  const handleJoinClassroom = (code) => {
    verifyClassroomCode(code);
  };
  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full py-12 overflow-x-hidden  bg-black bg-opacity-50 backdrop-filter overflow-y-auto md:inset-0 h-full max-h-full">
      <div className="container mx-auto mt-24 w-11/12 md:w-2/3 max-w-lg">
        <div className="relative py-8 px-5 md:px-10 bg-white opacity-100 shadow-md rounded border border-gray-400">
          <button
            onClick={() => {
              reset();

              dispatch(setJoinClassroom(false));
            }}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400  bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="authentication-modal"
          >
            <MdClose className="text-lg text-title" />
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-title dark:text-white">
              Join a classroom with a code
            </h3>
            <form onSubmit={handleSubmit(handleJoinClassroom)}>
              <Input
                reg={register}
                labelText={'Classroom Code'}
                inputValue={'code'}
                valid={{ required: true }}
                errorMessage={'Classroom code is required'}
                errors={errors}
                focus={true}
              />
              {isError && <ErrorMessage error={error} reset={reset} />}
              <div className="flex w-full justify-center">
                <button
                  type="submit"
                  className="text-white  bg-sidebar hover:bg-sidebarHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Join Classroom
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default JoinClassroomForm;
