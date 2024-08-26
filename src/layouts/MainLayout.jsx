import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ShowItem from '../pages/ShowItem';

import { selectShowCurrentItem } from '../redux/slices/cardSlice';
import { selectModalExit } from '../redux/slices/modalWindowsSlice';

import ExitWindow from '../components/ExitWindow';
import { Header } from '../components/Header';

const MainLayout = () => {
  const showCurrentItem = useSelector(selectShowCurrentItem);
  const modalExit = useSelector(selectModalExit);

  return (
    <div className='wrapper'>
      <Header />
      <main className='main'>
        <div className='container'>
          <Outlet />
        </div>
      </main>
      {showCurrentItem ? <ShowItem /> : null}
      {modalExit ? <ExitWindow /> : null}
    </div>
  );
};
export default MainLayout;
