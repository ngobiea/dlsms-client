import React from 'react';
import { faker } from '@faker-js/faker';
import {
  MdStopScreenShare,
  MdPeopleAlt,
  MdOutlineVideocamOff,
  MdWifiOff,
  MdFaceRetouchingOff,
  MdPersonOff,
  MdOutlineTabUnselected,
} from 'react-icons/md';

const MonitorSideBar = () => {
  return (
    <aside className="absolute inset-y-0  left-0 z-10 w-72 h-screen pt-8 pr-6 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0">
      <div className="h-full px-1 py-4 overflow-y-auto border-r-2">
        <div className="space-y-2 font-medium">SESSION VIOLATIONS</div>
        <ul className="pt-4 mt-4 space-y-2 font-medium border-t-2 border-gray-200 dark:border-gray-700">
          <li>
            <div className="text-green-800 flex flex-col border p-1 border-green-300 w-full rounded-lg bg-green-50 ">
              <div className="text-xs">
                {faker.date
                  .between({
                    from: '2020-01-01T00:00:00.000Z',
                    to: '2030-01-01T00:00:00.000Z',
                  })
                  .toUTCString()}
              </div>
              <div className="">{faker.name.fullName()}</div>
              <div className="">{'Disabled WebCam '}</div>
              <div className="flex justify-between">
                <MdOutlineVideocamOff className="text-red-500 text-3xl" />
                <div>
                  <button className="mx-2 px-2 py-1 text-white bg-green-500 rounded-lg">
                    {'Join'}
                  </button>
                  <button className="px-2 py-1 text-white bg-red-500 rounded-lg">
                    {'End'}
                  </button>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="text-green-800 flex flex-col border p-1 border-green-300 w-full rounded-lg bg-green-50 ">
              <div className="text-xs">
                {faker.date
                  .between({
                    from: '2020-01-01T00:00:00.000Z',
                    to: '2030-01-01T00:00:00.000Z',
                  })
                  .toUTCString()}
              </div>
              <div className="">{faker.name.fullName()}</div>
              <div className="">{'Disabled Screen Sharing'}</div>
              <div className="flex justify-between">
                <MdStopScreenShare className="text-red-500 text-3xl" />
                <div>
                  <button className="mx-2 px-2 py-1 text-white bg-green-500 rounded-lg">
                    {'Join'}
                  </button>
                  <button className="px-2 py-1 text-white bg-red-500 rounded-lg">
                    {'End'}
                  </button>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="text-green-800 flex flex-col border p-1 border-green-300 w-full rounded-lg bg-green-50 ">
              <div className="text-xs">
                {faker.date
                  .between({
                    from: '2020-01-01T00:00:00.000Z',
                    to: '2030-01-01T00:00:00.000Z',
                  })
                  .toUTCString()}
              </div>
              <div className="">{faker.name.fullName()}</div>
              <div className="">{'Multiple People Detected'}</div>
              <div className="flex justify-between">
                <MdPeopleAlt className="text-red-500 text-3xl" />
                <div>
                  <button className="mx-2 px-2 py-1 text-white bg-green-500 rounded-lg">
                    {'Join'}
                  </button>
                  <button className="px-2 py-1 text-white bg-red-500 rounded-lg">
                    {'End'}
                  </button>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="text-green-800 flex flex-col border p-1 border-green-300 w-full rounded-lg bg-green-50 ">
              <div className="text-xs">{faker.date.recent().toUTCString()}</div>
              <div className="">{faker.name.fullName()}</div>
              <div className="">{'No Person Detected'}</div>
              <div className="flex justify-between">
                <MdPersonOff className="text-red-500 text-3xl" />
                <div>
                  <button className="mx-2 px-2 py-1 text-white bg-green-500 rounded-lg">
                    {'Join'}
                  </button>
                  <button className="px-2 py-1 text-white bg-red-500 rounded-lg">
                    {'End'}
                  </button>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="text-green-800 flex flex-col border p-1 border-green-300 w-full rounded-lg bg-green-50 ">
              <div className="text-xs">{faker.date.recent().toUTCString()}</div>
              <div className="">{faker.name.fullName()}</div>
              <div className="">{"Can't Recognize Face"}</div>
              <div className="flex justify-between">
                <MdFaceRetouchingOff className="text-red-500 text-3xl" />
                <div>
                  <button className="mx-2 px-2 py-1 text-white bg-green-500 rounded-lg">
                    {'Join'}
                  </button>
                  <button className="px-2 py-1 text-white bg-red-500 rounded-lg">
                    {'End'}
                  </button>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="text-green-800 flex flex-col border p-1 border-green-300 w-full rounded-lg bg-green-50 ">
              <div className="text-xs">{faker.date.recent().toUTCString()}</div>
              <div className="">{faker.name.fullName()}</div>
              <div className="">{'Disable App full screen'}</div>
              <div className="flex justify-between">
                <MdOutlineTabUnselected className="text-red-500 text-3xl" />
                <div>
                  <button className="mx-2 px-2 py-1 text-white bg-green-500 rounded-lg">
                    {'Join'}
                  </button>
                  <button className="px-2 py-1 text-white bg-red-500 rounded-lg">
                    {'End'}
                  </button>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="text-green-800 flex flex-col border p-1 border-green-300 w-full rounded-lg bg-green-50 ">
              <div className="text-xs">
                {faker.date
                  .between({
                    from: '2020-01-01T00:00:00.000Z',
                    to: '2030-01-01T00:00:00.000Z',
                  })
                  .toUTCString()}
              </div>
              <div className="">{faker.name.fullName()}</div>
              <div className="">{'No Network Connection'}</div>
              <div className="flex justify-between">
                <MdWifiOff className="text-red-500 text-3xl" />
                <div>
                  <button className="mx-2 px-2 py-1 text-white bg-green-500 rounded-lg">
                    {'Join'}
                  </button>
                  <button className="px-2 py-1 text-white bg-red-500 rounded-lg">
                    {'End'}
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default MonitorSideBar;
