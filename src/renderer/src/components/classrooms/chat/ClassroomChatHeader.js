import React from 'react';
import MiniClassRoomCard from '../MiniClassRoomCard';
import { RiArrowDownSLine } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setShowSchedule,setShowScheduleForm } from '../../../store';

const ClassroomChatHeader = ({ show }) => {
  const dispatch = useDispatch();
  const { isShowSchedule } = useSelector((state) => {
    return state.modal;
  });
  const { accountType} = useSelector((state) => {
    return state.account;
  });

  const showClass =
    'z-10 fixed top-20 right-7 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44';
  const hideClass =
    'z-10 fixed hidden top-20 right-7 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44';
  const activeClass =
    'text-lg text-green-900 border-b-2 border-green-800  cursor-pointer';
  const inActiveClass = 'text-lg text-green-900  cursor-pointer';
  return (
    <div className="flex justify-between px-2 pt-3 pb-2 border-b-2 border-gray-200">
      <div className="relative flex items-center space-x-4">
        <MiniClassRoomCard title={'FC'} classes={'small'} />
        <NavLink
          to={''}
          className={(navData) =>
            navData.isActive ? activeClass : inActiveClass
          }
          end
        >
          Chat
        </NavLink>
        <NavLink
          to={'file'}
          className={(navData) =>
            navData.isActive ? activeClass : inActiveClass
          }
        >
          Files
        </NavLink>
        <NavLink
          to={''}
          className={(navData) =>
            navData.isActive ? activeClass : inActiveClass
          }
        >
          Recordings
        </NavLink>
      </div>
      { accountType === 'tutor' && <div className="mr-5">
        <div className="flex items-center justify-start">
          <button className="h-9 px-2 border-y border-l border-green-600  text-green-800 rounded-l hover:bg-gray-100 ">
            Session
          </button>
          <RiArrowDownSLine
            onClick={() => {
              dispatch(setShowSchedule(!isShowSchedule));
            }}
            className="border-y-2 border-x border-green-600 h-9 w-8 rounded-r text-green-600"
          />
        </div>

        <div className={isShowSchedule ? showClass : hideClass}>
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
            <li>
              <div  className="block px-4 py-2 hover:bg-gray-100">
                Class Session Now
              </div>
            </li>
            <li onClick={() => {
              dispatch(setShowScheduleForm(true));
            }}>
              <div className="block px-4 py-2 hover:bg-gray-100">
                Schedule Class Session
              </div>
            </li>
            <li>
              <div className="block px-4 py-2 hover:bg-gray-100">
                Schedule Exam Session
              </div>
            </li>
          </ul>
        </div>
      </div>}
    </div>
  );
};

export default ClassroomChatHeader;
