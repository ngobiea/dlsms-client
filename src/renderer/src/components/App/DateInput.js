import React from 'react';
import DateTime from 'react-datetime';
import { validDate, timeConstraints } from '../../utils/dateTime';

const DateInput = ({ handleDateTimeChange, label,value }) => {

  return (
    <div className="flex flex-col">
      <label className="">
        {label} <span className="text-red-500">*</span>
      </label>

      <DateTime
        isValidDate={validDate}
        onChange={handleDateTimeChange}
        timeConstraints={timeConstraints}
        value={value}
      />
    </div>
  );
};

export default DateInput;
