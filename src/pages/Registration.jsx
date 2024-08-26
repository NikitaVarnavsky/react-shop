import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { BASE_URL } from '../api/endPoints';
import { Input } from '../components/Input';
import { setAuthorized } from '../redux/slices/authorizationSlice';

function Registration() {
  const [nameValue, setNameValue] = React.useState('');
  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeNameValue = (e) => {
    setNameValue(e.target.value);
  };
  const onChangeEmailValue = (e) => {
    setEmailValue(e.target.value);
  };

  const onChangePasswordValue = (e) => {
    setPasswordValue(e.target.value);
  };

  const onSendRegister = async () => {
    const auth = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: `${nameValue}`,
        email: `${emailValue}`,
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
      <Input
        type={'text'}
        name={'text'}
        placeholder={'name'}
        onChange={onChangeNameValue}
        value={nameValue}
      />
      <Input
        type={'email'}
        name={'email'}
        placeholder={'email'}
        onChange={onChangeEmailValue}
        value={emailValue}
      />
      <Input
        type={'password'}
        name={'password'}
        placeholder={'password'}
        onChange={onChangePasswordValue}
        value={onChangePasswordValue}
      />
      <input className='authForm-button' type='submit' onClick={onSendRegister} />
      <Link to='/signIn'>
        <h3>Вы уже зарегистрированы</h3>
      </Link>
    </form>
  );
}

export default Registration;
