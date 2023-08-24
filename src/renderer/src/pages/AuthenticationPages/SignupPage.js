import React, { useContext, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import AccountContext from '../../context/accountContext';
import logo from '../../../public/images/dlsms2.png';
import { useSignupUserMutation } from '../../store';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserCard from '../../components/accountComponents/UserCard';
import Input from '../../components/accountComponents/Input';
import ErrorMessage from '../../components/error/ErrorMessage';
const SignupPage = () => {
  const navigate = useNavigate();
  const [addUser, {isSuccess,isError,error,reset}] = useSignupUserMutation();
  const { accountType } = useSelector((state) => {
    return state.account;
  });
  const { register, handleSubmit, errors, resetField } =
    useContext(AccountContext);
  const handleSignup = (user) => {
    user.accountType = accountType;
    addUser(user);
  };

useEffect(() => {
  if (isSuccess) {
    resetField('firstName');
    resetField('lastName');
    resetField('institution');
    resetField('studentId');
    navigate('/');
  }
}, [isSuccess]);
  const idClass =
    accountType === 'student' ? 'grid sm:grid-cols-2 sm:gap-6' : '';
  return (
    <div>
      <div className="w-10 h-10">
        <img className="max-h-16 max-w-sm" src={logo} />
      </div>
      <div className="close">
        <p className="text-right absolute top-0 right-0 text-2xl font-semibold mr-4">
          <span
            onClick={() => ipcRenderer.send('exitApp')}
            className="cursor-pointer text-green-900"
          >
            X
          </span>
        </p>
      </div>
      <div className="container mx-auto">
        <p className="text-center text-3xl text-white font-bold mb-3">
          Choose Account Type
        </p>
        <UserCard />
        <form onSubmit={handleSubmit(handleSignup)}>
          <div className="grid sm:grid-cols-2 sm:gap-6 mt-5">
            <Input
              focus={true}
              reg={register}
              labelText={'First Name'}
              inputValue={'firstName'}
              type={'text'}
              valid={{ required: true }}
              errorMessage={'First Name is required'}
              errors={errors}
            />
            <Input
              reg={register}
              labelText={'Last Name'}
              inputValue={'lastName'}
              type={'text'}
              valid={{ required: true }}
              errorMessage={'Last Name is required'}
              errors={errors}
            />
          </div>
          <div className={idClass}>
            <Input
              reg={register}
              labelText={'Institution'}
              inputValue={'institution'}
              type={'text'}
              valid={{ required: true }}
              errorMessage={'University is required'}
              errors={errors}
            />
            {accountType === 'student' && (
              <Input
                reg={register}
                labelText={'Student ID'}
                inputValue={'studentId'}
                type={'text'}
                valid={{ required: true }}
                errorMessage={'Student ID is required'}
                errors={errors}
              />
            )}
          </div>
          <Input
            reg={register}
            labelText={'Email'}
            inputValue={'email'}
            type={'text'}
            valid={{ required: true }}
            errorMessage={'Email is required'}
            errors={errors}
          />
          <Input
            reg={register}
            labelText={'Password'}
            inputValue={'password'}
            type={'password'}
            valid={{ required: true }}
            errorMessage={'Password is required'}
            errors={errors}
          />
          {isError && <ErrorMessage error={error} reset={reset} />}
          <div className="flex -mx-3">
            <div className="w-full px-3 mb-1">
              <p className="text-white">
                By clicking Create Account, you agree to our
                <span className="text-green-700 cursor-pointer hover:text-green-900">
                  Terms
                </span>
                and have read and acknowledge our Privacy Statement
              </p>
              <div>
                <p className="w-1/2 inline-block font-bold px-1 text-white">
                  Already Have an Account?{' '}
                  <Link to="/">
                    <span className="text-green-700 cursor-pointer hover:text-green-900">
                      Login
                    </span>
                  </Link>
                </p>
                <button
                  type="submit"
                  className="inline-block w-1/2 max-w-xs mx-auto bg-green-700 shadow-md border border-gray-200   dark:bg-green-700 dark:border-green-800 cursor-pointer hover:bg-green-900 rounded-lg px-3 py-3 font-semibold text-white"
                >
                  CREATE ACCOUNT
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignupPage;
