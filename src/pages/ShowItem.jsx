import React, { useEffect, useRef } from 'react';
import axios from 'axios';

import { BASE_URL } from '../api/endPoints';
import { useClickOutside } from '../hooks/useClickOutside';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectCurrentItem,
  selectShowCurrentItem,
  setCurrentItem,
  setShowCurrentItem,
} from '../redux/slices/cardSlice';
import {
  setDrawerItems,
  addItem,
  increment,
  decrement,
  selectDrawerItems,
} from '../redux/slices/drawerSlice';

import { selectAuthorized, selectToken, selectUserId } from '../redux/slices/authorizationSlice';

function ShowItem() {
  const [isDisabled, setIsDisabled] = React.useState(false);

  const dispatch = useDispatch();
  const { uniqueId, title, price, imageUrl, description } = useSelector(selectCurrentItem);

  const drawerItems = useSelector(selectDrawerItems);
  const showCurrentItem = useSelector(selectShowCurrentItem);
  const authorized = useSelector(selectAuthorized);
  const authUserId = useSelector(selectUserId);
  const token = useSelector(selectToken);
  const findItem = drawerItems.find((obj) => obj.uniqueId === uniqueId);

  let count = 0;
  if (findItem) {
    count = findItem.count;
  }

  const showItemRef = useRef(null);

  useClickOutside(showItemRef, () => {
    if (showCurrentItem) {
      setTimeout(() => {
        dispatch(setShowCurrentItem(false));
      }, 100);
    }
  });

  React.useEffect(() => {
    drawerItems.some((item) => item.uniqueId === uniqueId)
      ? setIsDisabled(true)
      : setIsDisabled(false);
  }, []);

  const onClickBuy = async () => {
    setIsDisabled(true);
    if (authorized) {
      dispatch(addItem({ uniqueId, title, price, imageUrl, description, count: 1 }));
      const isUser = await axios.get(`${BASE_URL}/drawer?user=${authUserId}`);
      if (!isUser.data.length) {
        await axios.post(`${BASE_URL}/drawer`, {
          user: Number(authUserId),
          items: [{ uniqueId, title, price, imageUrl, description, count: 1 }],
        });
      } else {
        const currentId = await axios(`${BASE_URL}/drawer?user=${authUserId}`);
        const drawerUserId = currentId.data[0].id;
        await axios.patch(`${BASE_URL}/drawer/${drawerUserId}`, {
          items: [...drawerItems, { uniqueId, title, price, imageUrl, description, count: 1 }],
        });
      }
    }
  };

  return (
    <div className='overlay'>
      <div className='showItem' ref={showItemRef}>
        <img
          className='showItem-close'
          width={40}
          height={40}
          onClick={() => dispatch(setShowCurrentItem(false))}
          src='./img/close.svg'
          alt='#'
        />

        <img className='showItem-image' src={imageUrl} alt='image-clock' />
        <div className='showItem-description'>
          <div className='showItem-header'>
            <h2>О товаре</h2>
            <div>
              <div className='showItem-info'>
                <span>Название:</span>
                <b>{title}</b>
              </div>
              <div className='showItem-info'>
                <span>Описание:</span>
                <span className='showItem-info-text'>{description}</span>
              </div>
            </div>
          </div>
          <div className='showItem-button'>
            <span className='showItem-price'>{price} руб.</span>
            {isDisabled ? (
              <div className='showItem-counter'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 16 16'
                  fill='none'
                  onClick={() => dispatch(increment(uniqueId))}>
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
                  onClick={() => dispatch(decrement(uniqueId))}>
                  <path
                    d='M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM8.5 4.5C8.5 4.22386 8.27614 4 8 4C7.72386 4 7.5 4.22386 7.5 4.5V7.5H4.5C4.22386 7.5 4 7.72386 4 8C4 8.27614 4.22386 8.5 4.5 8.5H7.5V11.5C7.5 11.7761 7.72386 12 8 12C8.27614 12 8.5 11.7761 8.5 11.5V8.5H11.5C11.7761 8.5 12 8.27614 12 8C12 7.72386 11.7761 7.5 11.5 7.5H8.5V4.5Z'
                    fill='black'
                  />
                </svg>
              </div>
            ) : (
              <button onClick={onClickBuy}>Добавить в корзину</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowItem;
