import React from 'react';
import MiniClassRoomCard from '../../classrooms/MiniClassRoomCard';
import { useDispatch,useSelector } from 'react-redux';
import { setShowScheduleForm, setShowExamSession } from '../../../store';
import { getCapitalLetters } from '../../../utils/util';
const SessionHeader = ({ title,buttonText }) => {
  const dispatch = useDispatch();
   const { name, } = useSelector((state) => {
     return state.classroom;
   });
  const handleScheduleSession = () => {
    if (title === 'Exam Session') {
      dispatch(setShowExamSession(true));
    } else if (title === 'Class Session') {
      dispatch(setShowScheduleForm(true));
    }
  };

  return (
    <div className="flex  justify-between px-2 pt-3 pb-2 border-b-2 border-gray-200">
      <div className="relative flex items-center space-x-4">
        <MiniClassRoomCard title={getCapitalLetters(name)} classes={'small'} />

        <h3 className="text-lg text-green-900">{title}</h3>
      </div>
      <button
        onClick={handleScheduleSession}
        type="button"
        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-green-900 focus:outline-none bg-gray-200 rounded-lg border border-green-200 hover:bg-gray-400 hover:text-green-700 focus:z-10"
      >
        {`Schedule ${buttonText}`}
      </button>
    </div>
  );
};

export default SessionHeader;
