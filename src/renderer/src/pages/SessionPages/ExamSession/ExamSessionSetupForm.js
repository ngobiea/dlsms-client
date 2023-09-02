import React, { useContext, useEffect } from 'react';
import { MdClose, MdOutlineArrowForward, MdArrowForward } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AccountContext from '../../../context/accountContext';
import Input from '../../../components/App/Input';
import TextArea from '../../../components/App/TextArea';
import DateInput from '../../../components/App/DateInput';
import {
  setShowScheduleForm,
  setStartDate,
  setEndDate,
  addMessage,
} from '../../../store';
import {
  add15MinutesToEndTime,
  add5MinutesToStateTime,
} from '../../../utils/dateTime';
const ExamSessionSetupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { startDate, endDate, duration, isValidTime } = useSelector((state) => {
    return state.app;
  });
  const { classroomId } = useSelector((state) => {
    return state.classroom;
  });

  const { register, handleSubmit, errors, resetField, reset } =
    useContext(AccountContext);
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
  return (
    <div className="relative py-20 w-5/6  px-5 md:px-10 bg-white opacity-100 shadow-md rounded border border-gray-400">
      <button className="absolute top-10 right-10 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-red-500 rounded-lg border border-gray-200 hover:bg-red-600 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-200">
        Cancel
      </button>
      <div className="px-6 py-6 lg:px-8">
        <h3 className="mb-4 text-xl font-medium text-title dark:text-white">
          Schedule Exam session
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
            placeholder={'Type details for this new exam session'}
          />

          <div className=" relative">
            <label className="text-green-800 font-bold">Question Type</label>
            <select
              value={''}
              // onChange={handleAudioInputChange}
              className="block py-2.5 px-0 w-96 text-sm text-green-800 bg-transparent border-0 border-b-2 border-green-500 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            >
              <option>Multiple Choice Questions(MCQs)</option>
              <option>Theory Questions</option>
              <option>Hybrid Questions</option>
            </select>
          </div>
          <div className="flex w-full mt-10 justify-end">
            <button
              onClick={() => navigate('../questions')}
              disabled={!isValidTime}
              className="text-white flex  bg-sidebar hover:bg-sidebarHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Forward
              <MdArrowForward className=" items-center mt-1 ml-1 align-middle" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExamSessionSetupForm;
