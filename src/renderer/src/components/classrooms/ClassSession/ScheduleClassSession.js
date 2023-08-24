import React, { useContext, useEffect } from 'react';
import { MdClose, MdOutlineArrowForward } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {
  setShowScheduleForm,
  setStartDate,
  setEndDate,
  usePostScheduleClassSessionMutation,
  addMessage,
} from '../../../store';
import AccountContext from '../../../context/accountContext';
import Input from '../../App/Input';
import TextArea from '../../App/TextArea';
import DateInput from '../../App/DateInput';
import {
  add15MinutesToEndTime,
  add5MinutesToStateTime,
} from '../../../utils/dateTime';

const ScheduleClassSession = () => {
  const { startDate, endDate, duration, isValidTime } = useSelector((state) => {
    return state.app;
  });
  const { classroomId } = useSelector((state) => {
    return state.classroom;
  });
  const [scheduleClassroom, { isSuccess, data }] =
    usePostScheduleClassSessionMutation();
  const { register, handleSubmit, errors, resetField, reset } =
    useContext(AccountContext);
  const dispatch = useDispatch();

  const handleScheduleClassSession = (schedule) => {
    console.log(schedule);
    schedule.startDate = new Date(startDate);
    schedule.endDate = new Date(endDate);
    schedule.classroomId = classroomId;
    scheduleClassroom(schedule);
  };
  const handleStartDateChange = (selected) => {
    if (selected.toDate !== undefined) {
      dispatch(setStartDate(selected.toDate().toISOString()));
    }
  };

  // Function to handle end date selection
  const handleEndDateChange = (selected) => {
    if (selected.toDate !== undefined) {
      dispatch(setEndDate(selected.toDate().toISOString()));
    }
  };
  useEffect(() => {
    dispatch(setStartDate(add5MinutesToStateTime(new Date()).toISOString()));
    dispatch(
      setEndDate(
        add15MinutesToEndTime(add5MinutesToStateTime(new Date())).toISOString()
      )
    );
  }, []);
  useEffect(() => {
    if (isSuccess) {
      dispatch(setShowScheduleForm(false));
      dispatch(addMessage(data.savedSessionMessage.message));
      resetField('title');
      resetField('description');
      const notification = new Notification('Success', {
        body: 'Class Session Scheduled Successfully',
      });
      notification.onclick = () => {
        console.log('first');
      };
    }
  }, [isSuccess]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full py-12 overflow-x-hidden  bg-black bg-opacity-50 backdrop-filter overflow-y-auto md:inset-0 h-full max-h-full">
      <div className="container mx-auto mt-24 max-w-3xl">
        <div className="relative py-8 px-5 md:px-10 bg-white opacity-100 shadow-md rounded border border-gray-400">
          <button
            onClick={() => {
              dispatch(setShowScheduleForm(false));
              reset();
            }}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400  bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="authentication-modal"
          >
            <MdClose className="text-lg text-title" />
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-title dark:text-white">
              Schedule class session
            </h3>
            <form onSubmit={handleSubmit(handleScheduleClassSession)}>
              <Input
                focus={true}
                reg={register}
                labelText={'Title'}
                inputValue={'title'}
                valid={{ required: true }}
                errorMessage={'Class Room Name is required and unique'}
                errors={errors}
              />
              <div className="mb-5">
                <div className="flex justify-between">
                  <DateInput
                    handleDateTimeChange={handleStartDateChange}
                    label={'Start Date'}
                    initial={new Date(startDate)}
                    value={new Date(startDate)}
                  />
                  <MdOutlineArrowForward className="text-green-500 mx-1 mt-5 text-2xl font-bold self-center" />
                  <DateInput
                    handleDateTimeChange={handleEndDateChange}
                    label={'End Date'}
                    value={new Date(endDate)}
                  />
                  <p className="text-green-500 mx-1 mt-5 text-2xl font-bold self-center">
                    {duration}
                  </p>
                </div>

                {!isValidTime && (
                  <div className="text-red-500">Invalid Schedule Time </div>
                )}
              </div>

              <TextArea
                reg={register}
                labelText={'Schedule Description'}
                inputValue={'description'}
                valid={{ required: true }}
                errorMessage={'Class Room Name is required and unique'}
                errors={errors}
                placeholder={'Type details for this new class session'}
              />
              <div className="flex w-full justify-center">
                <button
                  disabled={!isValidTime}
                  // type="submit"
                  className="text-white  bg-sidebar hover:bg-sidebarHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  Send new Class Session
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleClassSession;
