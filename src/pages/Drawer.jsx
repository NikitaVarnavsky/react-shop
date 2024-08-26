import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { BASE_URL } from '../api/endPoints';

import { Card } from '../components/Card';
import { DrawerCard } from '../components/DrawerCard';
import { removeAllItems } from '../redux/slices/drawerSlice';
import { selectDrawerItems } from '../redux/slices/drawerSlice';
import { selectUserId } from '../redux/slices/authorizationSlice';

function Drawer() {
  const drawerList = useSelector(selectDrawerItems);
  const authUserId = useSelector(selectUserId);

  const dispatch = useDispatch();

  const removeAll = async () => {
    const allItemsDrawer = await axios(`${BASE_URL}/drawer`);
    const { data } = allItemsDrawer;
    const filteredData = data.filter((obj) => obj.user === Number(authUserId));
    console.log(filteredData[0]);
    await axios.delete(`${BASE_URL}/drawer/${filteredData[0].id}`);

    dispatch(removeAllItems(Number(authUserId)));
  };

  return (
    <div className='content-drawer'>
      <div className='content-drawer-header'>
        <h1>{drawerList.length ? 'Корзина' : 'Корзина пуста'}</h1>
      </div>
      {drawerList.length ? <h3 onClick={removeAll}>Очистить корзину</h3> : null}
      <div>
        {drawerList.map((item) => (
          <DrawerCard
            key={item.uniqueId}
            uniqueId={item.uniqueId}
            title={item.title}
            price={item.price}
            imageUrl={item.imageUrl}
            count={item.count}
          />
        ))}
      </div>
    </div>
  );
}
export default Drawer;
