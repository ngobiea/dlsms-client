import React from 'react';
import { ipcRenderer } from 'electron';
import { SiGoogleclassroom } from 'react-icons/si';
import { TbFileReport, TbLogout } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { logoutHandler } from '../utils/util';
import {
  MdOutlineAssignment,
  MdOutlineMonitor,
  MdOutlineNotificationsNone,
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const SideBar = () => {
  const { accountType } = useSelector((state) => {
    return state.account;
  });
  const activeClass =
    'flex flex-col border-white border-l-4 items-center py-3 px-2 text-white bg-title dark:text-white hover:bg-title hover:text-white dark:hover:bg-gray-700';
  const inActiveClass =
    'flex flex-col items-center py-3 px-2 text-white rounded-lg dark:text-white hover:bg-title hover:text-white dark:hover:bg-gray-700';
  return (
    <aside
      id="logo-sidebar"
      className="fixed h-screen left-0 w-20 z-40 top-0  bg-sidebar"
      aria-label="Sidebar"
    >
      <div className="pt-10">
        <NavLink
          className={(navData) =>
            navData.isActive ? activeClass : inActiveClass
          }
          to="/notification"
        >
          <MdOutlineNotificationsNone className="w-6 h-6 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
          <span className="text-xs font-light">Notifications </span>
        </NavLink>

        <NavLink
          className={(navData) =>
            navData.isActive ? activeClass : inActiveClass
          }
          to="/"
          end
        >
          <SiGoogleclassroom className="w-6 h-6 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
          <span className="text-xs font-light">Classrooms </span>
        </NavLink>
        <NavLink
          className={(navData) =>
            navData.isActive ? activeClass : inActiveClass
          }
          to="/assignment"
        >
          <MdOutlineAssignment className="w-6 h-6 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
          <span className="text-xs font-light">Assignments </span>
        </NavLink>
        {accountType === 'tutor' ? (
          <div
            onClick={() => {
              ipcRenderer.send('openMonitorWindow');
            }}
            className={inActiveClass}
          >
            <MdOutlineMonitor className="w-6 h-6 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            <span className="text-xs font-light">Monitor </span>
          </div>
        ) : (
          ''
        )}
        {accountType === 'tutor' ? (
          <NavLink
            className={(navData) =>
              navData.isActive ? activeClass : inActiveClass
            }
            to="/report"
          >
            <TbFileReport className="w-6 h-6 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            <span className="text-xs font-light">Reports </span>
          </NavLink>
        ) : (
          ''
        )}

        <div onClick={logoutHandler}>
          <div className="flex flex-col items-center py-3 px-2 text-white rounded-lg dark:text-white hover:bg-title hover:text-white dark:hover:bg-gray-700">
            <TbLogout className="w-6 h-6 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            <span className="text-xs font-light">Logout </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
