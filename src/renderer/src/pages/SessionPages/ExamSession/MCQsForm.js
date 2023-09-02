import React, { useContext } from 'react';
import AccountContext from '../../../context/accountContext';
import Input from '../../../components/App/Input';
import Toggle from 'react-toggle';
const MCQsForm = () => {
  const { register, handleSubmit, errors, resetField, reset } =
    useContext(AccountContext);
  return (
    <div className="my-5">
      <form onSubmit={handleSubmit}>
        <Input
          focus={true}
          reg={register}
          labelText={'Question'}
          inputValue={'question'}
          valid={{ required: true }}
          errorMessage={'Class Room Name is required and unique'}
          errors={errors}
        />
        <div className="flex w-full">
          <p className=" w-1/2">Questions Options</p>
          <p className=" w-1/2"> Correct Option</p>
        </div>
        <div className=" w-1/2">
          <Input
            focus={true}
            reg={register}
            labelText={'Question'}
            inputValue={'question'}
            valid={{ required: true }}
            errorMessage={'Class Room Name is required and unique'}
            errors={errors}
          />
        </div>
      </form>
    </div>
  );
};

export default MCQsForm;
