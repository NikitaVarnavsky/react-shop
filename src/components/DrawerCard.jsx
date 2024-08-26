import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';

import { BASE_URL } from '../api/endPoints';

import drawerSlice, {
  increment,
  decrement,
  removeItem,
  addItem,
} from '../redux/slices/drawerSlice';
import axios from 'axios';
import { selectUserId } from '../redux/slices/authorizationSlice';

export function DrawerCard({ uniqueId, title, price, imageUrl, count }) {
  const dispatch = useDispatch();
  const authUserId = useSelector(selectUserId);
  const store = useStore();

  const removeProduct = async (uniqueId) => {
    dispatch(removeItem(uniqueId));
    const updatedStore = store.getState();
    const { drawerItems } = updatedStore.drawer;
    const { data } = await axios(`${BASE_URL}/drawer?user=${authUserId}`);
    const { id } = data[0];

    await axios.patch(`${BASE_URL}/drawer/${id}`, {
      items: drawerItems,
    });
  };

  const incrementCount = async (uniqueId) => {
    dispatch(increment(uniqueId));
    const updatedStore = store.getState();
    const { drawerItems } = updatedStore.drawer;
    const { data } = await axios(`${BASE_URL}/drawer?user=${authUserId}`);
    const { id } = data[0];

    await axios.patch(`${BASE_URL}/drawer/${id}`, {
      items: drawerItems,
    });
  };
  const decrementCount = async (uniqueId) => {
    dispatch(decrement(uniqueId));
    const updatedStore = store.getState();
    const { drawerItems } = updatedStore.drawer;
    const { data } = await axios(`${BASE_URL}/drawer?user=${authUserId}`);
    const { id } = data[0];

    await axios.patch(`${BASE_URL}/drawer/${id}`, {
      items: drawerItems,
    });
  };

  return (
    <div className='card-drawer'>
      <div className='card-drawer-title'>
        <img className='img-drawer' src={imageUrl} alt='' />
        <p>{title}</p>
      </div>
      <div className='card-drawer-counter'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 16 16'
          fill='none'
          onClick={() => incrementCount(uniqueId)}>
          <path
            d='M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM4.5 7.5C4.22386 7.5 4 7.72386 4 8C4 8.27614 4.22386 8.5 4.5 8.5H11.5C11.7761 8.5 12 8.27614 12 8C12 7.72386 11.7761 7.5 11.5 7.5H4.5Z'
            fill='black'
          />
        </svg>
        <b>{count}</b>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 16 16'
          fill='none'
          onClick={() => decrementCount(uniqueId)}>
          <path
            d='M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM8.5 4.5C8.5 4.22386 8.27614 4 8 4C7.72386 4 7.5 4.22386 7.5 4.5V7.5H4.5C4.22386 7.5 4 7.72386 4 8C4 8.27614 4.22386 8.5 4.5 8.5H7.5V11.5C7.5 11.7761 7.72386 12 8 12C8.27614 12 8.5 11.7761 8.5 11.5V8.5H11.5C11.7761 8.5 12 8.27614 12 8C12 7.72386 11.7761 7.5 11.5 7.5H8.5V4.5Z'
            fill='black'
          />
        </svg>
      </div>
      <div className='card-drawer-price'>
        <span>{price * count} руб.</span>
        <svg
          width='24'
          height='24'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          onClick={() => removeProduct(uniqueId)}>
          <path
            d='M11 1.5V2.5H14.5C14.7761 2.5 15 2.72386 15 3C15 3.27614 14.7761 3.5 14.5 3.5H13.9616L13.1088 14.1595C13.0257 15.1989 12.1579 16 11.1152 16H4.88479C3.84207 16 2.97431 15.1989 2.89116 14.1595L2.0384 3.5H1.5C1.22386 3.5 1 3.27614 1 3C1 2.72386 1.22386 2.5 1.5 2.5H5V1.5C5 0.671573 5.67157 0 6.5 0H9.5C10.3284 0 11 0.671573 11 1.5ZM6 1.5V2.5H10V1.5C10 1.22386 9.77614 1 9.5 1H6.5C6.22386 1 6 1.22386 6 1.5ZM4.49999 5.0285L4.99999 13.5285C5.0162 13.8042 5.25282 14.0145 5.52849 13.9983C5.80415 13.9821 6.01448 13.7454 5.99826 13.4698L5.49826 4.96978C5.48205 4.69411 5.24543 4.48379 4.96976 4.5C4.6941 4.51622 4.48377 4.75283 4.49999 5.0285ZM11.0302 4.50086C10.7546 4.48465 10.5179 4.69497 10.5017 4.97064L10.0017 13.4706C9.98552 13.7463 10.1958 13.9829 10.4715 13.9991C10.7472 14.0154 10.9838 13.805 11 13.5294L11.5 5.02936C11.5162 4.75369 11.3059 4.51708 11.0302 4.50086ZM8 4.5C7.72386 4.5 7.5 4.72386 7.5 5V13.5C7.5 13.7761 7.72386 14 8 14C8.27615 14 8.5 13.7761 8.5 13.5V5C8.5 4.72386 8.27615 4.5 8 4.5Z'
            fill='black'
          />
        </svg>
      </div>
    </div>
  );
}
