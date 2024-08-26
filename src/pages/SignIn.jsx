import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { selectAuthorized, setAuthorized } from '../redux/slices/authorizationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../components/Input';
import { BASE_URL } from '../api/endPoints';

function SignIn() {
  const [loginValue, setLoginValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');

  const authorized = useSelector(selectAuthorized);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeLoginValue = (e) => {
    setLoginValue(e.target.value);
  };

  const onChangePasswordValue = (e) => {
    setPasswordValue(e.target.value);
  };

  const onSendAuth = async () => {
    const auth = await fetch(`${BASE_URL}/auth`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: `${loginValue}`,
        password: `${passwordValue}`,
      }),
    }).then((result) => {
      if (result.ok) {
        navigate('/');
        return result.json();
      } else {
        alert('Произошла ошибка!');
        return null;
      }
    });
    if (auth !== null) {
      const { token, data } = auth;
      localStorage.setItem('token', token);
      localStorage.setItem('id', data.id);
      localStorage.setItem('fullName', data.fullName);
      dispatch(setAuthorized(true));
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className='authForm' action=''>
      {/* <div>
        <h2>Вход</h2>
        <Link to='/'>
          <img width={30} height={30} src='./img/close.svg' alt='#' />
        </Link>
      </div> */}
      <Input
        type={'email'}
        name={'email'}
        placeholder={'login'}
        onChange={onChangeLoginValue}
        value={loginValue}
      />
      <Input
        type={'password'}
        name={'password'}
        placeholder={'password'}
        onChange={onChangePasswordValue}
        value={passwordValue}
      />

      <input className='authForm-button' type='submit' onClick={onSendAuth} />
      <Link to='/registration'>
        <h3>Регистрация</h3>
      </Link>
    </form>
  );
}

export default SignIn;
