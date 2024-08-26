import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { selectSearchValue, setSearchValue } from '../redux/slices/filterSlice';
import { selectAuthorized, setAuthorized } from '../redux/slices/authorizationSlice';
import { setShowModalExit } from '../redux/slices/modalWindowsSlice';

export function Header() {
  const searchValue = useSelector(selectSearchValue);
  const authorized = useSelector(selectAuthorized);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const onAuthorized = () => {
    // localStorage.removeItem('id');
    // localStorage.removeItem('token');
    // localStorage.removeItem('fullName');
    // dispatch(setAuthorized(false));
    dispatch(setShowModalExit(true));
  };

  return (
    <header className='header'>
      <div className='container'>
        <div className='header-items'>
          <div className='logo'>
            <Link to='/'>
              <img src='./img/logo.svg' width={40} height={40} alt='logo' />
            </Link>
          </div>
          {pathname === '/signIn' ? (
            <h1>Вход</h1>
          ) : pathname !== '/registration' ? (
            <div>
              <input
                className='search'
                onChange={(e) => dispatch(setSearchValue(e.target.value))}
                value={searchValue}
                type='search'
                placeholder='Поиск...'
              />
            </div>
          ) : (
            <h1>Регистрация</h1>
          )}

          <nav className='navigation'>
            <ul className='menu'>
              <li className='menu-item'>
                <Link to={authorized ? '/favorites' : '/signIn'}>
                  <img src='./img/like.svg' width={18} height={18} alt='' />
                </Link>
              </li>
              <li className='menu-item'>
                <Link to={authorized ? '/drawer' : '/signIn'}>
                  <img src='./img/basket.svg' width={18} height={18} alt='' />
                </Link>
              </li>
              <li className='menu-item'>
                {authorized ? (
                  <>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='18'
                      height='18'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      onClick={onAuthorized}>
                      <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'></path>
                      <polyline points='16 17 21 12 16 7'></polyline>
                      <line x1='21' x2='9' y1='12' y2='12'></line>
                    </svg>
                  </>
                ) : (
                  <Link to='/signIn'>
                    <img src='./img/profile.svg' width={18} height={18} alt='' />
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
