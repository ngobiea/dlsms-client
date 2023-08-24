import React, { useContext, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import logo from '../../../public/images/dlsms2.png';
import AccountContext from '../../context/accountContext';
import { Link } from 'react-router-dom';
import UserCard from '../../components/accountComponents/UserCard';
import Input from '../../components/accountComponents/Input';
import { useLoginUserMutation, changeEmail } from '../../store';
import ErrorMessage from '../../components/error/ErrorMessage';
import { useSelector, useDispatch } from 'react-redux';
import EmailVerificationError from '../../components/error/EmailVerificationError';

const LoginPage = () => {
  const { accountType } = useSelector((state) => {
    return state.account;
  });
  const { register, handleSubmit, errors, setValue } =
    useContext(AccountContext);
  const [loginUser, { isError, isSuccess, reset, data, error }] =
    useLoginUserMutation();
  const dispatch = useDispatch();
  const handleLogin = (user) => {
    user.accountType = accountType;
    dispatch(changeEmail(user.email));
    loginUser(user);
  };
  useEffect(() => {
    setValue('email', JSON.parse(localStorage.getItem('email')));
  }, []);
  if (isSuccess) {
    const expirationDate = 1713117329.737435;
    const isLogin = {
      url: 'https://dlsms.com',
      name: 'isLogin',
      value: true,
      expirationDate,
    };
    localStorage.setItem('user', JSON.stringify(data.userDetails));
    localStorage.setItem('email', JSON.stringify(data.userDetails.email));
    ipcRenderer.send('login', isLogin);
  }

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
      <div className="container mx-auto mt-14">
        <p className="text-center text-3xl text-white font-bold mb-3">
          Choose Account Type
        </p>
        <UserCard />
        <form onSubmit={handleSubmit(handleLogin)} className="mt-5">
          <Input
            focus={true}
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
          {isError && error.data.type === 'verify' && (
            <EmailVerificationError error={error} reset={reset} />
          )}
          {isError && error.data.type !== 'verify' && (
            <ErrorMessage error={error} reset={reset} />
          )}

          <div className="flex -mx-3">
            <div className="w-full px-3 mb-1">
              <div>
                <p className="w-1/2 inline-block font-bold px-1 text-white">
                  Don't Have an Account?{' '}
                  <Link to="/signup">
                    <span className="text-green-700 cursor-pointer hover:text-green-900">
                      Create Account
                    </span>
                  </Link>
                </p>
                <button className="inline-block w-1/2 max-w-xs mx-auto bg-green-700 shadow-md border border-gray-200   dark:bg-green-700 dark:border-green-800 cursor-pointer hover:bg-green-900 rounded-lg px-3 py-3 font-semibold text-white">
                  Login
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
