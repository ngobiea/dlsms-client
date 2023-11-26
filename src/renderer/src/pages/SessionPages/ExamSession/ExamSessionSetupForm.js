import React, { useContext, useEffect } from 'react';
import { MdOutlineArrowForward, MdArrowForward } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import AccountContext from '../../../context/accountContext';
import Input from '../../../components/App/Input';
import TextArea from '../../../components/App/TextArea';
import DateInput from '../../../components/App/DateInput';
import {
  setStartDate,
  setEndDate,
  usePostScheduleExamSessionMutation,
  setExamSessionIdStep,
} from '../../../store';
import {
  add15MinutesToEndTime,
  add5MinutesToStateTime,
} from '../../../utils/dateTime';

const ExamSessionSetupForm = () => {
  const dispatch = useDispatch();

  const { startDate, endDate, duration, isValidTime } = useSelector((state) => {
    return state.app;
  });
  const { classroomId } = useSelector((state) => {
    return state.classroom;
  });
  const [scheduleExamSession, { isSuccess, data }] =
    usePostScheduleExamSessionMutation();

  const { register, handleSubmit, errors, resetField, reset } =
    useContext(AccountContext);

  const handleStartDateChange = (selected) => {
    if (selected.toDate !== undefined) {
      dispatch(setStartDate(selected.toDate().toISOString()));
    }
  };

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
      dispatch(
        setExamSessionIdStep({
          examSessionId: data.examSessionId,
          step: 'question',
        })
      );
      resetField('title');
      resetField('description');
      reset();
    }
  }, [isSuccess]);

  const handleScheduleExamSession = (schedule) => {
    schedule.startDate = new Date(startDate);
    schedule.endDate = new Date(endDate);
    schedule.classroomId = classroomId;
    scheduleExamSession(schedule);
  };

  return (
    <div className="px-6 py-6 lg:px-8">
      <h3 className="mb-4 text-xl font-medium text-title dark:text-white">
        Schedule Exam session
      </h3>
      <form onSubmit={handleSubmit(handleScheduleExamSession)}>
        <Input
          focus={true}
          reg={register}
          labelText={'Title'}
          inputValue={'title'}
          valid={{ required: true }}
          errorMessage={'Exam session title is required'}
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
          rows={10}
          reg={register}
          labelText={'Schedule Description'}
          inputValue={'description'}
          valid={{ required: true }}
          errorMessage={'Exam session description is required'}
          errors={errors}
          placeholder={'Type details for this new exam session'}
        />

        <div className="flex w-full mt-10 justify-end">
          <button
            disabled={!isValidTime}
            className="text-white flex  bg-sidebar hover:bg-sidebarHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Forward
            <MdArrowForward className=" items-center mt-1 ml-1 align-middle" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExamSessionSetupForm;
