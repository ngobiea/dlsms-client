import React from 'react';

const TextArea = ({
  reg,
  labelText,
  inputValue,
  valid,
  errorMessage,
  errors,
  placeholder,
}) => {
  return (
    <div className="relative z-0 w-full mb-6 group">
      <label className="block mb-2 text-sm font-medium text-title ">
        {labelText}
      </label>
      <textarea
        rows="4"
        {...reg(inputValue, valid)}
        className="block p-2.5 w-full text-sm text-title bg-gray-50 rounded-lg border border-gray-300 focus:ring-title focus:border-title"
        placeholder={placeholder}
      ></textarea>
      {errors[inputValue] && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">{errorMessage}</span>
        </p>
      )}
    </div>
  );
};

export default TextArea;
