import React from 'react';

const Input = ({
  reg,
  labelText,
  inputValue,
  type,
  valid,
  errorMessage,
  errors,
  focus
}) => {
  return (
    <div className="relative z-0 w-full mb-6 group">
      <input
        autoFocus={focus}
        type={type}
        {...reg(inputValue, valid)}
        placeholder=" "
        className="block py-2.5 px-0 w-full text-sm text-title bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-title peer"
      />
      <label className="peer-focus:font-medium font-bold  absolute text-sm text-title dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-title peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
        {labelText} <span className="text-red-500">*</span>
      </label>
      {errors[inputValue] && <div className="text-red-500">{errorMessage}</div>}
    </div>
  );
};

export default Input;
