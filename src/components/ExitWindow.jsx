import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useClickOutside } from '../hooks/useClickOutside';
import { useDispatch, useSelector } from 'react-redux';
import { setShowModalExit, selectModalExit } from '../redux/slices/modalWindowsSlice';
import { setAuthorized } from '../redux/slices/authorizationSlice';

import { removeLocalStorage } from '../service/localStorage.service';

function ExitWindow() {
  const dispatch = useDispatch();

  const modalExit = useSelector(selectModalExit);

  const showModalExitRef = useRef(null);

  useClickOutside(showModalExitRef, () => {
    if (modalExit) {
      setTimeout(() => {
        dispatch(setShowModalExit(false));
      }, 100);
    }
  });

  const cancelExit = () => {
    dispatch(setShowModalExit(false));
  };
  const confirmExit = () => {
    removeLocalStorage()
    dispatch(setAuthorized(false));
    dispatch(setShowModalExit(false));
  };

  return (
    <div className='overlay'>
      <div className='modalWindow' ref={showModalExitRef}>
        <div className='close'>
          <Link to='/'>
            <img width={30} height={30} src='./img/close.svg' alt='#' onClick={cancelExit} />
          </Link>
        </div>
        <h2>Вы уверены что хотите выйти?</h2>
        <div className='buttonsModalExit'>
          <button onClick={confirmExit}>Да</button>
          <button onClick={cancelExit}>Нет</button>
        </div>
      </div>
    </div>
  );
}
export default ExitWindow;
