import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '../redux/slices/authorizationSlice';

export function Card({
  uniqueId,
  title,
  price,
  imageUrl,
  description,
  onChangeFavorite,
  activeFavorited,
  onChangeCurrentItem,
}) {
  const dispatch = useDispatch();

  const userId = useSelector(selectUserId);

  const [showFavorite, setShowFavorite] = useState(activeFavorited);

  const imgLikeRef = useRef(null);

  const onClickCard = (event) => {
    if (event.target !== imgLikeRef.current) {
      onChangeCurrentItem(uniqueId, title, price, imageUrl, description);
    }
  };

  const isShowFavorite = () => {
    onChangeFavorite({ uniqueId, title, price, imageUrl, description });
    setShowFavorite(!showFavorite);
  };

  return (
    <div className='card' onClick={(event) => onClickCard(event)}>
      <img
        onClick={isShowFavorite}
        ref={imgLikeRef}
        className='card-like'
        height={25}
        width={25}
        src={showFavorite ? './img/like.svg' : './img/unlike.svg'}
        alt=''
      />
      <img src={imageUrl} alt='' />
      <h3>{title}</h3>
      <div className='card-price'>
        <div>
          <span>Цена: </span>
          <b>{price} руб.</b>
        </div>
      </div>
    </div>
  );
}
