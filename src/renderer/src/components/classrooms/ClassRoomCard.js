import React from 'react';
import { getCapitalLetters } from '../../utils/util';
const ClassRoomCard = ({ title }) => {
  return (
    <div className="h-44 flex flex-col justify-center items-center text-title max-w-full rounded-sm  bg-gray-300 text-center cursor-pointer hover:bg-gray-400 box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);">
      <div className="h-20 flex justify-center items-center text-white w-20 rounded-md bg-green-300 text-center">
        {getCapitalLetters(title)}
      </div>

      {title}
    </div>
  );
};

export default ClassRoomCard;
