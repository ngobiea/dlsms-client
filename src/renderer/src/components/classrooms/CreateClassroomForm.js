import React, { useContext,useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { setCreateClassroom, useCreateClassroomMutation } from '../../store';
import Input from '../App/Input';
import TextArea from '../App/TextArea';
import AccountContext from '../../context/accountContext';


const CreateClassroomForm = () => {
  const { accountType } = useSelector((state) => {
    return state.account;
  });
  const { register, handleSubmit, errors, resetField } =
    useContext(AccountContext);
  const [addClassroom, { isSuccess }] = useCreateClassroomMutation();

  const dispatch = useDispatch();


  const handleCrateClassroom = (classroom) => {
    addClassroom({ classroom, accountType });
  };
  useEffect(() => { 
      if (isSuccess) {
        dispatch(setCreateClassroom(false));
        resetField('name', { keepValue: false });
        resetField('description', { keepValue: false });
      }
  }, [isSuccess]);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full py-12 overflow-x-hidden  bg-black bg-opacity-50 backdrop-filter overflow-y-auto md:inset-0 h-full max-h-full">
      <div className="container mx-auto mt-24 w-11/12 md:w-2/3 max-w-lg">
        <div className="relative py-8 px-5 md:px-10 bg-white opacity-100 shadow-md rounded border border-gray-400">
          <button
            onClick={() => {
              dispatch(setCreateClassroom(false));
            }}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400  bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="authentication-modal"
          >
            <MdClose className="text-lg text-title" />
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-title dark:text-white">
              Create your classroom
            </h3>
            <form onSubmit={handleSubmit(handleCrateClassroom)}>
              <Input
                focus={true}
                reg={register}
                labelText={'Classroom Name'}
                inputValue={'name'}
                valid={{ required: true }}
                errorMessage={'Class Room Name is required and unique'}
                errors={errors}
              />
              <TextArea
                reg={register}
                labelText={'Classroom Description'}
                inputValue={'description'}
                valid={{ required: true }}
                errorMessage={'Class Room Name is required and unique'}
                errors={errors}
                placeholder={
                  'Let your students know what this classroom is all about'
                }
              />
              <div className="flex w-full justify-center">
                <button
                  type="submit"
                  className="text-white  bg-sidebar hover:bg-sidebarHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Create Classroom
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateClassroomForm;
